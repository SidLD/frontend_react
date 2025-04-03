
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }from "@/components/components/ui/select"
import { useStore } from "@/store/app.store"
import { ShippingType } from "@/types/shipping.type"
export default function ShippingSelector() {
  const {shippingOptions,setShipping} = useStore()
  const handleSelectShipping = (code: string) => {
      const ifExist  = shippingOptions.find((shipping:any) => shipping.code == code) as ShippingType | null
      if(ifExist){
        setShipping(ifExist)
      }
  }
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold mb-4">ESTIMATED SHIPPING FEE</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm mb-1 block">Shipping to:</label>
          <Select defaultValue={'s3'} onValueChange={(e) => handleSelectShipping(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select shipping method" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {
                shippingOptions?.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
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

