# Campaign Scheduler SaaS - Database Schema

The system is designed for multi-tenancy (workspaces) and agent traceability.

```prisma
// --- User & Workspace ---
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  workspaces WorkspaceMember[]
  createdAt DateTime @default(now())
}

model Workspace {
  id        String       @id @default(uuid())
  name      String
  members   WorkspaceMember[]
  brands    Brand[]
  campaigns Campaign[]
  channels  ChannelAccount[]
  createdAt DateTime     @default(now())
}

model WorkspaceMember {
  id          String    @id @default(uuid())
  userId      String
  workspaceId String
  role        String    @default("member") // admin, owner, editor
  user        User      @relation(fields: [userId], references: [id])
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
}

// --- Brand & Product DNA ---
model Brand {
  id              String   @id @default(uuid())
  workspaceId     String
  name            String
  websiteUrl      String?
  dna             Json     // BrandDNA Typed Object
  products        Product[]
  campaigns       Campaign[]
  workspace       Workspace @relation(fields: [workspaceId], references: [id])
  updatedAt       DateTime @updatedAt
}

model Product {
  id          String   @id @default(uuid())
  brandId     String
  name        String
  dna         Json     // ProductDNA Typed Object
  brand       Brand    @relation(fields: [brandId], references: [id])
  updatedAt   DateTime @updatedAt
}

// --- Campaigns & Content ---
model Campaign {
  id              String   @id @default(uuid())
  workspaceId     String
  brandId         String
  title           String
  objective       String
  audience        String
  durationStart   DateTime
  durationEnd     DateTime
  channels        String[] // ["instagram", "twitter"]
  status          String   @default("draft")
  strategy        Json?    // CampaignStrategy Object
  briefs          ContentBrief[]
  agentLogs       AgentLog[]
  workspace       Workspace @relation(fields: [workspaceId], references: [id])
  brand           Brand     @relation(fields: [brandId], references: [id])
  createdAt       DateTime @default(now())
}

model ContentBrief {
  id              String   @id @default(uuid())
  campaignId      String
  channel         String
  brief           String
  requirements    String[]
  variants        ContentVariant[]
  campaign        Campaign @relation(fields: [campaignId], references: [id])
}

model ContentVariant {
  id              String   @id @default(uuid())
  briefId         String
  copy            String   @db.Text
  visualPrompts   String[]
  assetUrls       String[]
  status          String   @default("draft") // draft, approved, rejected
  feedback        String?
  approvals       Approval[]
  scheduleSlots   ScheduleSlot[]
  brief           ContentBrief @relation(fields: [briefId], references: [id])
}

model Approval {
  id              String   @id @default(uuid())
  variantId       String
  reviewerId      String
  status          String   // approved, rejected
  feedback        String?
  variant         ContentVariant @relation(fields: [variantId], references: [id])
  reviewer        User           @relation(fields: [reviewerId], references: [id])
}

model ScheduleSlot {
  id              String   @id @default(uuid())
  variantId       String
  scheduledAt     DateTime
  channel         String
  status          String   @default("pending") // pending, published, failed
  publishJobId    String?  // ID for background workers
  variant         ContentVariant @relation(fields: [variantId], references: [id])
}

// --- Platform & Logs ---
model ChannelAccount {
  id              String   @id @default(uuid())
  workspaceId     String
  platform        String   // instagram, x, linkedin
  accessToken     String
  refreshToken    String?
  metadata        Json?    // account name, brand connection
  workspace       Workspace @relation(fields: [workspaceId], references: [id])
}

model AgentLog {
  id              String   @id @default(uuid())
  campaignId      String?
  agentName       String
  action          String
  input           Json
  output          Json
  reasoning       String?  @db.Text
  timestamp       DateTime @default(now())
  campaign        Campaign? @relation(fields: [campaignId], references: [id])
}

model AnalyticsSnapshot {
  id              String   @id @default(uuid())
  campaignId      String
  channel         String
  metrics         Json     // impressions, clicks, etc.
  date            DateTime @default(now())
}
```
