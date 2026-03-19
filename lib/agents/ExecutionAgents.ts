import { z } from 'genkit';
import { ai, EXTRACTION_MODEL, STRATEGIST_MODEL } from '../genkit';
import { 
  PlatformReadyVariantSchema, 
  PostScheduleSchema, 
  PublishedPostSchema 
} from './definitions';

/**
 * 9. Scheduler Agent
 * Determines the high-probability timing for each post.
 */
export const schedulerAgentFlow = ai.defineFlow(
  {
    name: 'schedulerAgentFlow',
    inputSchema: z.object({
      adapted_variants: z.array(PlatformReadyVariantSchema),
      campaign_duration_days: z.number(),
      target_audience_timezone: z.string().default('UTC'),
    }),
    outputSchema: z.array(PostScheduleSchema),
  },
  async (input) => {
    const response = await ai.generate({
      model: STRATEGIST_MODEL, // Requires reasoning for calendar mapping
      prompt: `
        You are the **Scheduler Agent**.
        We have ${input.adapted_variants.length} adapted variants ready to be published.
        Campaign Duration: ${input.campaign_duration_days} days.
        Audience Timezone: ${input.target_audience_timezone}

        VARIANTS TO SCHEDULE:
        ${JSON.stringify(input.adapted_variants, null, 2)}
        
        TASK:
        1. Distribute these variants across the campaign duration to maximize reach and avoid audience fatigue.
        2. Assign a specific optimal target_date_iso (YYYY-MM-DDTHH:MM:SSZ) and optimal_time_slot for each variant based on best practices for its specific platform (e.g., LinkedIn operates best during business hours, Twitter_X has multiple peaks).
        3. Provide the reasoning for your chosen timeframe.
        
        Return an array of PostSchedule JSON objects.
      `,
      output: { format: 'json', schema: z.array(PostScheduleSchema) },
    });

    if (!response.output) throw new Error('Scheduling failed');
    return response.output;
  }
);

/**
 * 10. Publisher Agent
 * Handles the technical API handshakes to push content live (Mocked for Prototype).
 */
export const publisherAgentFlow = ai.defineFlow(
  {
    name: 'publisherAgentFlow',
    inputSchema: z.object({
      schedule: PostScheduleSchema,
    }),
    outputSchema: PublishedPostSchema,
  },
  async (input) => {
    // In a real-world scenario, this flow would use MCP tools or REST calls to hit Meta/LinkedIn APIs.
    // Here we simulate the logic using an AI decision or mock execution.
    console.log(`[Publisher Agent] Mocking API publish via OAuth for ${input.schedule.platform_variant.platform}...`);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For the prototype, we assume success.
    const isSuccess = Math.random() > 0.05; // 95% success rate simulation

    return {
      post_id: `POST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      schedule_id: input.schedule.schedule_id,
      platform: input.schedule.platform_variant.platform,
      status: (isSuccess ? 'LIVE' : 'FAILED') as 'LIVE' | 'FAILED',
      live_url: isSuccess ? `https://${input.schedule.platform_variant.platform.toLowerCase()}.com/post/${Date.now()}` : undefined,
      error_log: isSuccess ? undefined : 'API Rate Limit Exceeded (Simulated)',
    };
  }
);

/**
 * 11. Analytics Feedback Agent
 * Closes the loop. Ingests raw metrics and "Teaches" the brain.
 */
export const analyticsFeedbackFlow = ai.defineFlow(
  {
    name: 'analyticsFeedbackFlow',
    inputSchema: z.object({
      post_metrics: z.array(z.object({
        post_id: z.string(),
        impressions: z.number(),
        clicks: z.number(),
        conversions: z.number(),
      })),
    }),
    outputSchema: z.object({
      insights: z.array(z.string()),
      recommended_action: z.string(),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are the **Analytics Feedback Agent**.
        METRICS INGESTED:
        ${JSON.stringify(input.post_metrics, null, 2)}
        
        TASK:
        1. Analyze the performance of these recent posts.
        2. Identify what worked well and what fell flat.
        3. Extract 3 core insights to teach the "Brain" for the next campaign wave.
        4. Provide one recommended action to optimize ongoing spend or attention.
        
        Return the structured JSON feedback.
      `,
      output: { 
        format: 'json', 
        schema: z.object({
          insights: z.array(z.string()),
          recommended_action: z.string()
        }) 
      },
    });

    if (!response.output) throw new Error('Analytics processing failed');
    return response.output;
  }
);
