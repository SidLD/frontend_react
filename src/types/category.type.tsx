import { z } from 'zod';

// Define the possible category types
export const CategoryTypeEnum = z.enum(['physical', 'digital', 'service', 'other']);

// Category Schema
export const CategorySchema = z.object({
    id: z.string(),               
    name: z.string().min(1, "Category name is required"),  // Name of the category
    description: z.string().optional(), // Optional description for the category
    type: CategoryTypeEnum,          // Category type: 'physical', 'digital', 'service', or 'other'
});

// Type definitions based on the Category Schema
export type CategoryType = z.infer<typeof CategorySchema>;
