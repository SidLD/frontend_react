import type React from "react"
import { useState } from "react"
import { X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/components/ui/button"
import { Input } from "@/components/components/ui/input"
import { useStore } from "@/store/app.store"
import { motion, AnimatePresence } from "framer-motion"
import paypalLogo from '@/assets/payments/paypal.png';

export default function CartSummary() {
  const { cart, applyCoupon, removeCoupon, } = useStore()
  const [discountCode, setDiscountCode] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const subtotal = cart.subTotal
  const shippingFee = cart.totalPrice > 500 ? 0 : (cart.shipping?.price  || 0)
  const total = cart.totalPrice + shippingFee

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setCouponError("Please enter a valid code")
      return
    }

    setIsApplying(true)
    setCouponError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const validCoupons = ["BBSWIMPH2025", "WELCOME10", "FREESHIP"]
      const isValidCoupon = validCoupons.includes(discountCode.toUpperCase())

      if (isValidCoupon) {
        applyCoupon(discountCode)
        setDiscountCode("")
        setShowCouponInput(false)
      } else {
        setCouponError("Sorry, but this coupon doesn't exist")
      }
    } finally {
      setIsApplying(false)
    }
  }

  // Handle Enter key in input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyDiscount()
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold mb-4">ORDER SUMMARY</h2>

      <div className="space-y-4">
        <div>
          <AnimatePresence mode="wait">
            {!showCouponInput && !cart.coupon ? (
              <motion.div
                key="coupon-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-dashed text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
                  onClick={() => setShowCouponInput(true)}
                >
                  Add coupon code
                </Button>
              </motion.div>
            ) : null}

            {showCouponInput && !cart.coupon ? (
              <motion.div
                key="coupon-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <label className="text-sm mb-1 block">Discount code:</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Enter discount code"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value)
                        if (couponError) setCouponError(null)
                      }}
                      onKeyDown={handleKeyDown}
                      className={`w-full pr-8 ${couponError ? "border-red-500 focus:ring-red-500" : ""}`}
                      disabled={isApplying}
                      autoFocus
                    />
                    {discountCode && (
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setDiscountCode("")}
                        aria-label="Clear input"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    onClick={handleApplyDiscount}
                    className="bg-black text-white hover:bg-gray-800"
                    disabled={isApplying || !discountCode.trim()}
                  >
                    {isApplying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {couponError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-red-500 text-xs mt-1"
                    >
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {couponError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto"
                    onClick={() => {
                      setShowCouponInput(false)
                      setDiscountCode("")
                      setCouponError(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            ) : null}

            {cart.coupon && (
              <motion.div
                key="applied-coupon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2"
              >
                <div className="flex items-center">
                  <motion.div
                    className="bg-green-50 text-green-700 text-sm py-1 px-3 rounded-full flex items-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    <span className="mr-1">{cart.coupon.code}</span>
                    <button
                      onClick={() => removeCoupon()}
                      className="ml-1 text-green-700 hover:text-green-900 focus:outline-none"
                      aria-label="Remove coupon"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                  <span className="text-xs text-green-600 ml-2">
                    {cart.coupon.type === "PERCENT" ? `${cart.coupon.amount}% off` : `$${cart.coupon.amount} off`}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <motion.span
            key={subtotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ${subtotal.toFixed(2)}
          </motion.span>
        </div>

        <div className="flex justify-between py-2">
          <span>Shipping Fee</span>
          <span>${shippingFee?.toFixed(2) || 0}</span>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">ESTIMATED TOTAL</h3>
          <motion.div
            className="text-xl font-bold"
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ${total.toFixed(2)}
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-black text-white hover:bg-gray-800" disabled={!cart.termsAndAgreement}>Checkout Now</Button>
        </motion.div>

        <p className="text-xs text-center text-gray-500 flex items-center">
          <span className="flex-1 border-t border-black"></span>
          <span className="mx-2">OR CHECKOUT WITH</span>
          <span className="flex-1 border-t border-black"></span>
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full bg-[#ffc439] hover:bg-[#f0b82d] text-blue-900 font-semibold h-12" disabled={!cart.termsAndAgreement}>
            <motion.div 
              className="mx-auto font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img src={paypalLogo} width={80} className="object-contain"  alt="PayPal"/>
            </motion.div>
        </Button>
      </motion.div>
      </div>
    </div>
  )
}

