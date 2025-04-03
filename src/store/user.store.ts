import type { StateCreator } from "zustand"
import type { ProductType } from "src/types/product.type"
import type { DiscountType } from "src/types/discount.type"
import type { CouponType } from "src/types/coupon.type"
import type { CartItem, CartType } from "src/types/cart.type"
import { toZonedTime } from 'date-fns-tz';
const timeZone = 'America/New_York';
export interface CartSlice {
  cart: CartType
  discount: DiscountType[]
  coupons: CouponType[]
  addToCart: (product: ProductType, count: number, isChecked: boolean) => void
  removeFromCart: (productId: string) => void
  updateProductCheck: (productId: string) => void
  updateProductCount: (productId: string, count: number) => void
  checkAllItem: (check: boolean) => void
  applyDiscount: (code: string) => void
  applyCoupon: (code: string) => void
  clearCart: () => void
  availableProducts: ProductType[],
  shippingOptions: any
  initializeStore: (data: {
    products: ProductType[]
    discounts: DiscountType[]
    coupons: CouponType[]
    shipping: any[]
  }) => void
}

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
    cart: {
        userId: "",
        items: [],
        shipping: { shippingChoice: "", shippingPercentageDiscount: 0 },
        subTotal: 0,
        totalPrice: 0,
        coupon: undefined, 
    },
    discount: [],
    coupons: [], 
    availableProducts: [],
    shippingOptions: [],

    initializeStore: (data) =>
        set((state) => {
          return {
            availableProducts: data.products,
            discount: data.discounts,
            coupons: data.coupons,
            shippingOptions: data.shipping,
            cart:
              state.cart.items.length > 0
                ? state.cart
                : {
                    ...state.cart,
                  },
          }
    }),
    addToCart: (product: ProductType, count: number, isChecked = true) =>
        set((state) => {
            let updatedItems: CartItem[] = [];
            const existingItem = state.cart.items.find((item) => item.product.id === product.id);
            const currentDate = new Date();
            const addedDateTime = toZonedTime(currentDate, timeZone);
    
            if (existingItem) {
                updatedItems = state.cart.items.map((item) => {
                    const availableDiscount = state.discount.find((d) =>
                        item.product.discountCodes === d.code
                    );
    
                    if (item.product.id === product.id) {
                        const total = item.product.amount * (item.count + count);
                        return {
                            ...item,
                            count: item.count + count,
                            total: total,
                            discountedTotal: total - (availableDiscount
                                ? availableDiscount.type === "FLAT"
                                    ? availableDiscount.amount
                                    : total * (availableDiscount.amount / 100)
                                : 0),
                            isChecked,
                            discount: availableDiscount,
                            addedDateTime: addedDateTime,
                        };
                    } else {
                        return item;
                    }
                });
            } else {
                const availableDiscount = state.discount.find((d) =>
                    product.discountCodes === d.code
                );
    
                updatedItems = [
                    ...state.cart.items,
                    {
                        product: product,
                        count: count,
                        total: product.amount * count,
                        discountedTotal: product.amount * count - (availableDiscount
                            ? availableDiscount.type === "FLAT"
                                ? availableDiscount.amount
                                : product.amount * count * (availableDiscount.amount / 100)
                            : 0),
                        isChecked,
                        discount: availableDiscount,
                        addedDateTime: addedDateTime,
                    },
                ];
            }

            updatedItems.sort((a, b) => new Date(b.addedDateTime).getTime() - new Date(a.addedDateTime).getTime());
    
            return {
                cart: {
                    ...state.cart,
                    items: updatedItems,
                    totalPrice: calculateTotalPrice(updatedItems, state.cart.shipping, state.cart.coupon),
                    subTotal: calculateSubTotal(updatedItems),
                },
            };
        }),
    
    updateProductCount: (productId: string, count: number) =>
        set((state) => {
            let updatedItems: CartItem[] = state.cart.items.map((item) => {
                const availableDiscount = state.discount.find((d) =>
                    item.product.discountCodes == d.code
                );
    
                if (item.product.id === productId) {
                    const total = item.product.amount * count;
                    return {
                        ...item,
                        count,
                        total: total,
                        discountedTotal: total - (availableDiscount
                            ? availableDiscount.type === "FLAT"
                                ? availableDiscount.amount
                                : total * (availableDiscount.amount / 100)
                            : 0),
                        discount: availableDiscount,
                    };
                } else {
                    return item;
                }
            });
        
            return {
                cart: {
                    ...state.cart,
                    items: updatedItems,
                    totalPrice: calculateTotalPrice(updatedItems, state.cart.shipping, state.cart.coupon),
                    subTotal: calculateSubTotal(updatedItems),
                },
            };
        }),    

    removeFromCart: (productId: string) =>
        set((state) => {
        const updatedItems = state.cart.items.filter((item) => item.product.id !== productId)
        return {
            cart: {
                ...state.cart,
                items: updatedItems,
                totalPrice: calculateTotalPrice(updatedItems, state.cart.shipping, state.cart.coupon),
                subTotal: calculateSubTotal(updatedItems),
            },
        }
    }),

    applyDiscount: (code: string) =>
        set((state) => {
        // Find if any product has this discount code
        const isValidDiscount = state.cart.items.some((item) => {
            const discountCodes = item.product.discountCodes
            return Array.isArray(discountCodes) && discountCodes.includes(code)
        })

        // Create a new discount if valid
        const newDiscount: DiscountType = isValidDiscount
            ? { code, amount: 20, type: "PERCENT" as const, available: true }
            : { code, amount: 0, type: "PERCENT" as const, available: false }

        // Add to discounts array
        const updatedDiscounts = [...state.discount, newDiscount]

        // Apply discount to cart items
        const updatedItems = state.cart.items.map((item) => {
            const discountCodes = item.product.discountCodes
            if (Array.isArray(discountCodes) && discountCodes.includes(code)) {
            const discountedPrice = item.product.amount * (1 - newDiscount.amount / 100)
            return {
                ...item,
                discount: newDiscount,
                discountedTotal: discountedPrice * item.count,
            }
            }
            return item
        })

        return {
            discount: updatedDiscounts,
            cart: {
            ...state.cart,
            items: updatedItems,
            totalPrice: calculateTotalPrice(updatedItems, state.cart.shipping, state.cart.coupon),
            },
        }
    }),

    applyCoupon: (code: string) =>
        set((state) => {
        // Find coupon in available coupons
        const coupon = state.coupons.find((c) => c.code === code && c.available)

        return {
            cart: {
            ...state.cart,
            coupon: coupon,
            totalPrice: calculateTotalPrice(state.cart.items, state.cart.shipping, coupon),
            },
        }
    }),

    clearCart: () =>
        set({
        cart: {
            userId: "",
            items: [],
            shipping: { shippingChoice: "", shippingPercentageDiscount: 0 },
            subTotal: 0,
            totalPrice: 0,
            coupon: undefined,
        },
        discount: [],
        coupons: [],
    }),

    updateProductCheck: (productId: string) =>
        set((state) => {
          const updatedItems = state.cart.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  isChecked: !item.isChecked,
                }
              : item
          );
      
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              totalPrice: calculateTotalPrice(updatedItems, state.cart.shipping, state.cart.coupon),
              subTotal: calculateSubTotal(updatedItems),
            },
          };
        }),        
        
        checkAllItem: (check:boolean) =>
            set((state) => {
              const updatedItems = state.cart.items.map((item) => {
                return {...item, isChecked: check}
              });
          
              return {
                cart: {
                  ...state.cart,
                  items: updatedItems,
                  totalPrice: calculateTotalPrice(updatedItems, state.cart.shipping, state.cart.coupon),
                  subTotal: calculateSubTotal(updatedItems),
                },
              };
        }),    
})

const calculateTotalPrice = (items: CartItem[], shipping: CartType["shipping"], coupon?: CouponType): number => {
  let subTotal = items.filter(item => item.isChecked).reduce((sum, item) => sum + item.discountedTotal, 0)

  // Apply shipping discount if eligible, this should be verified in the backend too
  const shippingDiscount = subTotal >= 500 ? shipping.shippingPercentageDiscount : 0
  subTotal -= shippingDiscount

  // Apply coupon discount
  if (coupon && coupon.available) {
    subTotal = coupon.type === "PERCENT" ? subTotal * (1 - coupon.amount / 100) : subTotal - coupon.amount
  }

  return Math.max(subTotal, 0) 
}

const calculateSubTotal = (items: CartItem[]): number => {
  return items.filter((item) => item.isChecked).reduce((sum, item) => sum + item.total, 0)
}

