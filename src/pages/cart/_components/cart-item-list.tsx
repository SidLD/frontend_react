"use client"

import { useState } from "react"
import { Minus, Plus, Heart, Trash2 } from "lucide-react"
import { useStore } from "@/store/app.store"
import { Checkbox } from "@/components/components/ui/checkbox"

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

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Checkbox id="selectAll" checked={selectAll} onCheckedChange={handleSelectAll} />
        <label htmlFor="selectAll" className="ml-2 text-sm font-medium">
          ALL ITEMS ({cart.items.length})
        </label>
      </div>

      <div className="divide-y">
        {cart.items.map((item, index) => (
          <div key={`${item.product.id}-${index}`} className="py-4 grid grid-cols-[auto,1fr,auto] gap-4">
            <div className="flex items-start">
              <Checkbox id={`item-${index}`} className="mt-1 mr-3" checked={item.isChecked} onClick={() => handleCheckItem(item.product.id!)} />
              <img
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="w-20 h-24 rounded-md object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">{item.product.description.split(" ").slice(-2).join(" ")}</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Free Shipping</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Last Stock</span>
                </div>
              </div>

              <div className="flex items-center mt-2">
                {
                    item.count > 1 ?
                    <button
                        onClick={() => handleQuantityChange(item.product.id || "", Math.max(1, item.count - 1))}
                        className="w-6 h-6 flex items-center justify-center border rounded-full"
                    >
                        <Minus className="w-3 h-3" />
                    </button>
                : <button
                    onClick={() => removeFromCart(item.product.id!)}
                    className="w-6 h-6 flex items-center justify-center border rounded-full"
                >
                    X
                </button>
                }
                <span className="mx-2">{item.count}</span>
                <button
                  onClick={() => handleQuantityChange(item.product.id || "", item.count + 1)}
                  className="w-6 h-6 flex items-center justify-center border rounded-full"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              {
                item.discount!! ?
                
              <span className="font-semibold">${item.discountedTotal}</span>
              : 
              <span className="font-semibold">${item.total }</span>
              }
              

              <div className="flex flex-col items-end space-y-2 mt-2">
                <button className="text-xs text-gray-500 flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  SAVE TO WISHLIST
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id || "")}
                  className="text-xs text-gray-500 flex items-center"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

