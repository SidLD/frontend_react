import { ProductType } from '@/types/product.type';
import { DiscountType } from '@/types/discount.type';

// 🏷 Dummy Products with Images & Categories
export const dummyProducts: ProductType[] = [
    {
        id: 'p1',
        name: 'T-Shirt',
        amount: 25,
        image: 'https://example.com/images/tshirt.jpg',
        category: 'Clothing',
        discount: {
            code: 'SUMMER10',
            amount: 10,
            type: 'PERCENT',
            available: true,
        },
    },
    {
        id: 'p2',
        name: 'Sneakers',
        amount: 80,
        image: 'https://example.com/images/sneakers.jpg',
        category: 'Footwear',
        discount: {
            code: 'FLAT20',
            amount: 20,
            type: 'FLAT',
            available: true,
        },
    },
    {
        id: 'p3',
        name: 'Smartwatch',
        price: 150,
        image: 'https://example.com/images/smartwatch.jpg',
        category: 'Electronics',
        discount: null, // No discount
    },
];

// 🎟️ Dummy Discounts
export const dummyDiscounts: DiscountType[] = [
    {
        code: 'BBSWIMPH2025',
        amount: 20,
        type: 'PERCENT',
        available: true,
    },
    {
        code: 'WELCOME50',
        amount: 50,
        type: 'FLAT',
        available: true,
    },
];

// 🛒 Dummy Cart
export const dummyCart = {
    userId: 'user_123',
    products: dummyProducts,
    discountCode: 'BBSWIMPH2025',
    shippingChoice: 'DHL',
    totalPrice: 135, // Dynamically calculated
    discount: dummyDiscounts[0],
    isPaid: false,
};
