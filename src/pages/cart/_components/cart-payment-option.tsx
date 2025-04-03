import { Checkbox } from "@/components/components/ui/checkbox";
import { motion } from "framer-motion"

export default function PaymentOptions() {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >

      <motion.div 
        className="flex items-center text-xs text-gray-600 justify-center"
        whileHover={{ scale: 1.01 }}
      >
        <Checkbox id="terms" className="mr-2" />
        <label htmlFor="terms">
          I agree to the{" "}
          <motion.a 
            href="#" 
            className="underline"
            whileHover={{ color: "#4f46e5" }}
          >
            Terms and Conditions
          </motion.a>{" "}
          and{" "}
          <motion.a 
            href="#" 
            className="underline"
            whileHover={{ color: "#4f46e5" }}
          >
            Privacy Policy
          </motion.a>
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-sm text-center mb-2">Available Payment Methods:</p>
        <div className="flex justify-center space-x-2">
          {["PP", "Visa", "MC", "Amex", "Disc"].map((method, index) => (
            <motion.div 
              key={method}
              className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "#e5e7eb",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" 
              }}
            >
              {method}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
