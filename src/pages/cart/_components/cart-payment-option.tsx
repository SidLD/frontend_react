import { Button } from "@/components/components/ui/button";
import { Checkbox } from "@/components/components/ui/checkbox";


export default function PaymentOptions() {
  return (
    <div className="space-y-4">
      <Button className="w-full bg-[#ffc439] hover:bg-[#f0b82d] text-blue-900 font-semibold h-12">
        <div className="mx-auto font-bold">PayPal</div>
      </Button>

      <div className="flex items-center text-xs text-gray-600 justify-center">
        <Checkbox id="terms" className="mr-2" />
        <label htmlFor="terms">
          I agree to the{" "}
          <a href="#" className="underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <div>
        <p className="text-sm text-center mb-2">Available Payment Methods:</p>
        <div className="flex justify-center space-x-2">
          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">PP</div>
          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Visa</div>
          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">MC</div>
          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Amex</div>
          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Disc</div>
        </div>
      </div>
    </div>
  )
}

