import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
})
