import { StateCreator } from 'zustand';
import { DiscountType } from 'src/types/discount.type';
import { ProductType } from 'src/types/product.type';

export interface CartSlice {
    cart: ProductType[];
    discount: DiscountType | null;
    totalPrice: number;
    shippingChoice: string | null;

    addToCart: (product: ProductType) => void;
    removeFromCart: (productId: string) => void;
    applyDiscount: (code: string) => void;
    clearCart: () => void;
}
export const createCartSlice: StateCreator<CartSlice> = (set) => ({
    cart: [],
    discount: null,
    totalPrice: 0,
    shippingChoice: null,

    addToCart: (product) => set((state) => {
        const updatedCart = [...state.cart, product];
        return {
            cart: updatedCart,
            totalPrice: calculateTotalPrice(updatedCart, state.discount),
        };
    }),

    removeFromCart: (productId) => set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== productId);
        return {
            cart: updatedCart,
            totalPrice: calculateTotalPrice(updatedCart, state.discount),
        };
    }),

    applyDiscount: (code) => set((state) => {
        if (code === 'BBSWIMPH2025') {
            const discount: DiscountType = {
                code: 'BBSWIMPH2025',
                amount: 20,
                type: 'PERCENT',
                available: true,
            };
            return {
                discount,
                totalPrice: calculateTotalPrice(state.cart, discount),
            };
        }
        return { discount: null };
    }),

    clearCart: () => set({ cart: [], discount: null, totalPrice: 0 }),
});

const calculateTotalPrice = (cart: ProductType[], discount: DiscountType | null): number => {
    let total = cart.reduce((sum, product) => sum + product.amount, 0);

    if (discount?.available) {
        total = discount.type === 'PERCENT'
            ? total * (1 - discount.amount / 100)
            : total - discount.amount;
    }

    return total >= 0 ? total : 0; 
};
