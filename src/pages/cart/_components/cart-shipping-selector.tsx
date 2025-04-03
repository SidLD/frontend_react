import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }from "@/components/components/ui/select"
import { useStore } from "@/store/app.store"
export default function ShippingSelector() {
  const [shippingMethod, setShippingMethod] = useState("s3") 
    const {shippingOptions} = useStore()
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold mb-4">ESTIMATED SHIPPING FEE</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm mb-1 block">Shipping to:</label>
          <Select defaultValue={shippingMethod} onValueChange={setShippingMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select shipping method" />
            </SelectTrigger>
            <SelectContent>
              {
                shippingOptions?.map((option: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                    <SelectItem key={option.id} value={option.id as any}>
                      {option.name}
                    </SelectItem>
                  ))
              }
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm mb-1 block">Fee:</label>
          {/* <Input type="text" value={`$ ${selectedOption?.price || 16}`} readOnly /> */}
        </div>

        <p className="text-xs text-gray-500">
          Shipping fees may vary based on your address. The final cost will be confirmed at checkout if the shipping
          method is available in your location.
        </p>
      </div>
    </div>
  )
}

