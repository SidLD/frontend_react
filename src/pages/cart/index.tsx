import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import CartItemList from "./_components/cart-item-list"
import CartSummary from "./_components/cart-summary"
import ShippingSelector from "./_components/cart-shipping-selector"
import PaymentOptions from "./_components/cart-payment-option"
import { getSavedCart } from "@/api/cart.api"
import { ShoppingBag } from "lucide-react"
import { useStore } from "@/store/app.store"
import { Button } from "@/components/components/ui/button"
import { CartData } from "@/types/acount.type"
import Loading from "@/components/loading"

export default function CartPage() {
  const { addToCart, initializeStore } = useStore()
  const { data, isLoading, error } = useQuery<CartData, Error>({
    queryKey: ["cartData"],
    queryFn: () => getSavedCart(),
  })

  useEffect(() => {
    if (data) {
      initializeStore({
        products: data.products || [],
        discounts: data.discounts || [],
        coupons: data.coupons || [],
        shipping: data.shipping || [],
      })
    }
  }, [data, initializeStore])

  const addRandomProduct = () => {
    if (!data || !data.products || data.products.length === 0) return
    const randomIndex = Math.floor(Math.random() * data.products.length)
    const randomProduct = data.products[randomIndex]
    addToCart(randomProduct, 1, true)
  }

  if (isLoading) return <Loading />
  if (error) return <div className="container mx-auto p-4">Error loading cart data: {error.message}</div>

  return (
    <div className="container mx-auto p-4 max-w-6xl ">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">CART</h1>
        <Button onClick={addRandomProduct} className="bg-green-600 hover:bg-green-700 text-white">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add Random Item
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CartItemList />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ShippingSelector />
          <CartSummary />
          <PaymentOptions />
        </div>
      </div>
    </div>
  )
}

