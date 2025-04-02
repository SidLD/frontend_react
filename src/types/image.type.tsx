import { z } from "zod";

export type ImageType = {
    url: string;        
    alt?: string;       
    width?: number;    
    height?: number;     
};
export const ImageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
});