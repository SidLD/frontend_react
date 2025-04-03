import type { CartType } from "@/types/cart.type"
import jsonData from "@/lib/data"
import { CartData } from "@/types/acount.type"


export const getSavedCart = async (): Promise<CartData> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    products: jsonData.products as any,
    discounts: jsonData.discounts as any,
    coupons: jsonData.coupons as any,
    shipping: jsonData.shipping,
    user: {
        id: '1'
    }
  }
}

// Additional API functions can be added here
export const saveCart = async (cart: CartType): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would send the cart to the server
  console.log("Cart saved:", cart)

  return { success: true }
}

