"use client"

import { Button } from "@/components/components/ui/button"
import { Input } from "@/components/components/ui/input"
import { useStore } from "@/store/app.store"
import { useState } from "react"

export default function CartSummary() {
  const { cart, applyCoupon } = useStore()
  const [discountCode, setDiscountCode] = useState("")

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      applyCoupon(discountCode)
      setDiscountCode("")
    }
  }
  const subtotal = cart.subTotal
  const shippingFee = 0 
  const discount = cart.coupon?.amount || 0
  const discountType = cart.coupon?.type || "FLAT"
  const discountAmount = discountType === "PERCENT" ? subtotal * (discount / 100) : discount
  const total = subtotal + shippingFee - discountAmount

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold mb-4">ORDER SUMMARY</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm mb-1 block">Discount:</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter discount code or gift card"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleApplyDiscount} className="bg-black text-white hover:bg-gray-800">
              Apply
            </Button>
          </div>
        </div>

        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-2">
          <span>Shipping Fee</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between py-2 text-green-600">
            <span>Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">ESTIMATED TOTAL</h3>
          <div className="text-xl font-bold">${total.toFixed(2)}</div>
        </div>

        <Button className="w-full bg-black text-white hover:bg-gray-800">Checkout Now</Button>

        <p className="text-xs text-center text-gray-500">OR CHECKOUT WITH</p>
      </div>
    </div>
  )
}

