import { z } from 'zod';

/**
 * 1. Brand & Identity Schema
 */
export const BrandIdentitySchema = z.object({
  name: z.string(),
  website: z.string().url().optional(),
  vision: z.string().optional(),
  voice_traits: z.array(z.string()),
  visual_style: z.object({
    palette: z.array(z.string()),
    aesthetic: z.string(),
  }),
});

export type BrandIdentity = z.infer<typeof BrandIdentitySchema>;

/**
 * 2. Product DNA Schema
 */
export const ProductDNASchema = z.object({
  feature_benefit_map: z.array(z.object({
    feature: z.string(),
    benefit: z.string(),
  })),
  killer_claims: z.array(z.string()),
  technical_specs: z.record(z.string()).optional(),
});

export type ProductDNA = z.infer<typeof ProductDNASchema>;

/**
 * 3. Campaign Strategist Blueprint
 */
export const CampaignBlueprintSchema = z.object({
  campaign_id: z.string(),
  meta_strategy: z.string(),
  target_personas_count: z.number(),
  tasks: z.array(z.object({
    agent: z.string(),
    instruction: z.string(),
    priority: z.number(),
    dependency: z.string().optional(),
  })),
});

export type CampaignBlueprint = z.infer<typeof CampaignBlueprintSchema>;

/**
 * 4. Audience Persona Schema
 */
export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string(),
  demographics: z.string(),
  psychographics: z.string(),
  pain_points: z.array(z.string()),
  triggers: z.array(z.string()),
  objections: z.array(z.string()),
});
export type Persona = z.infer<typeof PersonaSchema>;

/**
 * 5. Copy Variant Schema
 */
export const CopyVariantSchema = z.object({
  id: z.string(),
  copy_variant_name: z.string(),
  headline: z.string(),
  body_copy: z.string(),
  cta: z.string(),
});
export type CopyVariant = z.infer<typeof CopyVariantSchema>;

/**
 * 6. Visual Direction Schema
 */
export const VisualDirectionSchema = z.object({
  prompt_image: z.string().describe("Descriptive prompt for image generation engines"),
  prompt_video: z.string().describe("Cinematic prompt for video generation models (like VEO 3)"),
  style_reference: z.string().optional(),
  composition_notes: z.string(),
});
export type VisualDirection = z.infer<typeof VisualDirectionSchema>;

/**
 * 7. Combined Creative Output for QA
 */
export const CreativeVariantSchema = z.object({
  id: z.string(),
  persona_id: z.string(),
  copy: CopyVariantSchema,
  visual_direction: VisualDirectionSchema,
  qa_feedback: z.object({
    passed: z.boolean(),
    score: z.number(),
    notes: z.string(),
  }).optional(),
});

export type CreativeVariant = z.infer<typeof CreativeVariantSchema>;

/**
 * 8. Validation & Adaptation
 */
export const PlatformReadyVariantSchema = z.object({
  creative_id: z.string(),
  platform: z.enum(['Twitter_X', 'LinkedIn', 'Meta', 'TikTok', 'GoogleDisplay']),
  adapted_copy: z.string(),
  hashtags: z.array(z.string()),
  visual_spec: z.string().describe("Specifies dimension e.g. '1080x1080' or '16:9 HD'"),
});

export type PlatformReadyVariant = z.infer<typeof PlatformReadyVariantSchema>;

/**
 * 9. Scheduling
 */
export const PostScheduleSchema = z.object({
  schedule_id: z.string(),
  platform_variant: PlatformReadyVariantSchema,
  target_date_iso: z.string(),
  optimal_time_slot: z.string(),
  reasoning: z.string(),
});

export type PostSchedule = z.infer<typeof PostScheduleSchema>;

/**
 * 10. Publishing
 */
export const PublishedPostSchema = z.object({
  post_id: z.string(),
  schedule_id: z.string(),
  platform: z.string(),
  status: z.enum(['LIVE', 'FAILED', 'QUEUED']),
  live_url: z.string().url().optional(),
  error_log: z.string().optional(),
});

export type PublishedPost = z.infer<typeof PublishedPostSchema>;
