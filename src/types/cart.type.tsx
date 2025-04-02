import { z } from 'zod';
import { ProductType } from './product.type';
import { DiscountType } from './discount.type';

// Define CartType
export type CartType = {
    id?: string;                       // Cart identifier (optional)
    userId: string;                    // User associated with the cart (required)
    products: ProductType[];           // Array of products in the cart
    discountCode?: string;             // Discount code applied to the cart (optional)
    shippingChoice?: string;           // Shipping choice (e.g., 'DHL', 'FedEX')
    totalPrice: number;                // Total price of the cart, calculated with or without discount
    discount?: DiscountType;           // Discount applied to the cart (optional)
    isPaid?: boolean;                  // Payment status (optional)
};

// Cart validation schema using Zod
export const CartTypeSchema = z.object({
    id: z.string().optional(),
    userId: z.string().min(1, "User ID is required"),
    products: z.array(z.string()),    // Array of ProductTypes
    discountCode: z.string().optional(), // Discount code applied (optional)
    shippingChoice: z.string().optional(), // Shipping method (optional)
    totalPrice: z.number().min(0, "Total price cannot be negative"), // Total price validation
    discount: z
        .object({
            code: z.string().min(1, "Discount code is required"),
            amount: z.number().min(0, "Discount amount must be positive"),
            type: z.enum(['PERCENT', 'FLAT']),
            available: z.boolean(),
            startDate: z.date().optional(),
            endDate: z.date().optional(),
            minimumPurchase: z.number().min(0).optional(),
            conditions: z.string().optional(),
        })
        .optional(),
    isPaid: z.boolean().optional(), // Optional payment status
});

// Type validation of the CartType
export type ValidatedCartType = z.infer<typeof CartTypeSchema>;

