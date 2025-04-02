import { z } from 'zod';
import { ImageSchema, ImageType } from './image.type';
import { CategoryType } from './category.type';

export type ProductType = {
    image: ImageType; 
    id?: string;
    name: string;
    size: ['SMALL', 'MEDIUM', 'LARGE'];
    amount: number;  
    tags: ['FREE_SHIPPING', 'LAST_STOCK', 'DISCOUNT'];
    stock: number;
    category?: CategoryType;          

}

export const ProductTypeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    image: z.optional(ImageSchema),
    amount: z.number().positive("Amount must be greater than zero"),
    tags: z.array(z.enum(['FREE_SHIPPING', 'LAST_STOCK', 'DISCOUNT'])),
    stock: z.number().int().nonnegative("Stock cannot be negative"),
});

export type ValidatedProductType = z.infer<typeof ProductTypeSchema>;
