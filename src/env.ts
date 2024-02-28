import { z } from 'zod';

const envSchema = z.object({
	MODE: z.enum(['production', 'development', 'test']),
	VITE_MSW_ACTIVATED: z.string(),
	VITE_API_URL: z.string(),
	VITE_MAP_KEY: z.string(),
	VITE_API_KEY: z.string(),
	VITE_AUTH_DOMAIN: z.string(),
	VITE_DATABASE_URL: z.string(),
	VITE_PROJECT_ID: z.string(),
	VITE_STORAGE_BUCKET: z.string(),
	VITE_MESSAGING_SENDER_ID: z.string()
});

export const env = envSchema.parse(import.meta.env);
