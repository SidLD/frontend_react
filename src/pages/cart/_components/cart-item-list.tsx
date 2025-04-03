import { useState } from "react"
import { Minus, Plus, Heart, Trash2, ShoppingCart } from "lucide-react"
import { useStore } from "@/store/app.store"
import { Checkbox } from "@/components/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"

export default function CartItemList() {
  const { cart, updateProductCount, removeFromCart, updateProductCheck, checkAllItem } = useStore()
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    checkAllItem(!selectAll)
  }

  const handleCheckItem = (productId: string) => {
    updateProductCheck(productId)
  }

  const handleQuantityChange = (productId: string, newCount: number) => {
    if (newCount > 0) {
      updateProductCount(productId, newCount)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  }

  // Check if cart is empty
  const isCartEmpty = !cart.items || cart.items.length === 0

  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isCartEmpty ? (
        <>
          <motion.div className="flex items-center mb-4" whileHover={{ scale: 1.01 }}>
            <Checkbox id="selectAll" checked={selectAll} onCheckedChange={handleSelectAll} />
            <label htmlFor="selectAll" className="ml-2 text-sm font-medium">
              ALL ITEMS ({cart.items.length})
            </label>
          </motion.div>

          <AnimatePresence>
            <motion.div className="divide-y" variants={containerVariants} initial="hidden" animate="visible">
              {cart.items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${index}`}
                  className="py-4 grid grid-cols-[auto,1fr,auto] gap-4"
                  variants={itemVariants}
                  exit="exit"
                  layout
                >
                  <div className="flex items-start">
                    <Checkbox
                      id={`item-${index}`}
                      className="mt-1 mr-3"
                      checked={item.isChecked}
                      onClick={() => handleCheckItem(item.product.id!)}
                    />
                    <motion.img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-20 h-24 rounded-md object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">{item.product.category.split(" ").slice(-2).join(" ")} - {item.product.size}</p>

                      <div className="flex space-x-2 mt-1">
                        {item.product.tags.map(tag => <motion.span
                          className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                          whileHover={{ backgroundColor: "#f0f0f0" }}
                        >
                          {tag.replace('_',' ')}
                        </motion.span>)}
                      </div>
                    </div>

                    <div className="flex items-center mt-2">
                      {item.count > 1 ? (
                        <motion.button
                          onClick={() => handleQuantityChange(item.product.id || "", Math.max(1, item.count - 1))}
                          className="w-6 h-6 flex items-center justify-center border rounded-full"
                          whileHover={{ scale: 1.1, backgroundColor: "#f5f5f5" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Minus className="w-3 h-3" />
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={() => removeFromCart(item.product.id!)}
                          className="w-6 h-6 flex items-center justify-center border rounded-full"
                          whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          X
                        </motion.button>
                      )}
                      <motion.span
                        className="mx-2"
                        key={item.count}
                        initial={{ scale: 1.2, color: "#4f46e5" }}
                        animate={{ scale: 1, color: "#000000" }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.count}
                      </motion.span>
                      <motion.button
                        onClick={() => handleQuantityChange(item.product.id || "", item.count + 1)}
                        className="w-6 h-6 flex items-center justify-center border rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "#f5f5f5" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    {item.discount ? (
                      <p className="flex flex-row gap-2 justify-center items-end">
                      <span className="font-semibold">${item.discountedTotal}</span>
                      <span className="font-semibold line-through text-sm text-gray-500">${item.total}</span>
                      </p>
                    ) : (
                      <span className="font-semibold">${item.total}</span>
                    )}

                    <div className="flex flex-col items-end space-y-2 mt-2">
                      <motion.button
                        className="text-xs text-gray-500 flex items-center"
                        whileHover={{ scale: 1.05, color: "#f43f5e" }}
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        SAVE TO WISHLIST
                      </motion.button>
                      <motion.button
                        onClick={() => removeFromCart(item.product.id || "")}
                        className="text-xs text-gray-500 flex items-center"
                        whileHover={{ scale: 1.05, color: "#ef4444" }}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        REMOVE
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
          </motion.div>
          <motion.h3
            className="text-xl font-medium text-gray-700 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your cart is empty
          </motion.h3>
          <motion.p
            className="text-gray-500 text-center max-w-xs"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </motion.p>
          <motion.button
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md font-medium"
            whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Browse Products
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

