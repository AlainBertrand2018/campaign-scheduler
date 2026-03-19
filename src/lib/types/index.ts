import { z } from 'zod';

// --- Shared Base Schemas ---

export const TimestampSchema = z.string().datetime();

// --- Brand & Product DNA ---

export const BrandDNASchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  websiteUrl: z.string().url().optional(),
  mission: z.string(),
  voice: z.object({
    tone: z.string(),
    keywords: z.array(z.string()),
    tabooTerms: z.array(z.string()),
  }),
  visualStyle: z.object({
    colors: z.array(z.string()),
    vibe: z.string(),
    elements: z.array(z.string()),
  }),
  targetAudienceCues: z.array(z.string()),
  claims: z.array(z.string()),
  rules: z.array(z.string()),
  updatedAt: TimestampSchema.optional(),
});

export type BrandDNA = z.infer<typeof BrandDNASchema>;

export const ProductDNASchema = z.object({
  id: z.string().uuid().optional(),
  brandId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  benefits: z.array(z.string()),
  pricing: z.string().optional(),
  useCases: z.array(z.string()),
  competitors: z.array(z.string()),
  updatedAt: TimestampSchema.optional(),
});

export type ProductDNA = z.infer<typeof ProductDNASchema>;

// --- Campaign & Planning ---

export enum CampaignStatus {
  DRAFT = 'draft',
  PLANNING = 'planning',
  GENERATING = 'generating',
  REVIEW = 'review',
  APPROVED = 'approved',
  SCHEDULED = 'scheduled',
  PUBLISHING = 'publishing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export const CampaignSchema = z.object({
  id: z.string().uuid().optional(),
  workspaceId: z.string().uuid(),
  title: z.string(),
  objective: z.string(),
  targetAudience: z.string(),
  duration: z.object({
    start: TimestampSchema,
    end: TimestampSchema,
  }),
  channels: z.array(z.enum(['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok'])),
  offer: z.string().optional(),
  cta: z.string(),
  tone: z.string().optional(),
  status: z.nativeEnum(CampaignStatus),
  createdAt: TimestampSchema.optional(),
});

export type Campaign = z.infer<typeof CampaignSchema>;

// --- Agent Result Schemas ---

export const CampaignStrategySchema = z.object({
  campaignId: z.string().uuid(),
  narrative: z.string(),
  keyMessages: z.array(z.string()),
  channelStrategies: z.record(z.string(), z.string()),
  reasoning: z.string(),
});

export type CampaignStrategy = z.infer<typeof CampaignStrategySchema>;

export const ContentBriefSchema = z.object({
  id: z.string().uuid().optional(),
  campaignId: z.string().uuid(),
  channel: z.string(),
  brief: z.string(),
  requirements: z.array(z.string()),
});

export type ContentBrief = z.infer<typeof ContentBriefSchema>;

export const ContentVariantSchema = z.object({
  id: z.string().uuid().optional(),
  briefId: z.string().uuid(),
  copy: z.string(),
  visualPrompts: z.array(z.string()),
  assets: z.array(z.string()), // URLs to storage
  status: z.enum(['draft', 'approved', 'rejected']).default('draft'),
  feedback: z.string().optional(),
});

export type ContentVariant = z.infer<typeof ContentVariantSchema>;

// --- Scheduling & Logs ---

export const ScheduleSlotSchema = z.object({
  id: z.string().uuid().optional(),
  variantId: z.string().uuid(),
  scheduledAt: TimestampSchema,
  channel: z.string(),
  status: z.enum(['pending', 'published', 'failed']),
  retryCount: z.number().default(0),
  lastError: z.string().optional(),
});

export type ScheduleSlot = z.infer<typeof ScheduleSlotSchema>;

export const AgentLogSchema = z.object({
  id: z.string().uuid().optional(),
  campaignId: z.string().uuid().optional(),
  agentName: z.string(),
  action: z.string(),
  input: z.any(),
  output: z.any(),
  reasoning: z.string().optional(),
  timestamp: TimestampSchema,
});

export type AgentLog = z.infer<typeof AgentLogSchema>;
