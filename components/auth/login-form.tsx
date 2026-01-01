"use client"
import {z} from "zod"
//Schema -> 
const loginSchema = z.object({
  email: z.email("please enter a valid email address!"),
  password: z.string().min(6, "Password must be at least 6 character long")
})

type LoginForm = z.infer<typeof loginSchema>

function LoginForm() {
  return <div></div>
}

export default LoginForm