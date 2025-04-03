import { Checkbox } from "@/components/components/ui/checkbox";
import { useStore } from "@/store/app.store";
import { motion } from "framer-motion"

import amex from '@/assets/payments/amex.png';
import jcb from '@/assets/payments/jcb.png';
import paypal_2 from '@/assets/payments/paypal_2.png';
import union_bank from '@/assets/payments/union_bank.png';
import union_pay from '@/assets/payments/union_pay.png';
import visa from '@/assets/payments/visa.png';

export default function PaymentOptions() {
  const {setAgreement} =  useStore()
  const handleTermsAndAgreement = () => {
    setAgreement()
  }
  const banks = [
    {
      name: 'PayPal',
      image: paypal_2
    },
    {
      name: 'Visa',
      image: visa
    },
    {
      name: 'Union Bank',
      image: union_bank
    },
    {
      name: 'JCB',
      image: jcb
    },
    {
      name: 'AMEX',
      image: amex
    },
    {
      name: 'UnionPay',
      image: union_pay
    }
  ];
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >

      <motion.div 
        className="flex items-center justify-center text-xs text-gray-600"
        whileHover={{ scale: 1.01 }}
      >
        <Checkbox id="terms" className="mr-2" onClick={handleTermsAndAgreement} />
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
        <p className="mb-2 text-sm text-left ml-15 md:ml-3">Available Payment Methods:</p>
        <div className="ml-[-8%] flex justify-center gap-2 space-x-1">
          {banks.map((method, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-center w-10 overflow-hidden text-xs bg-white border-gray-400 rounded h-7 hover:scale-110 border-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "#e5e7eb",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" 
              }}
            >
              <img src={method.image} className="object-cover bg-white" alt={method.name}/>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
