import {betterAuth} from "better-auth"

export const auth = betterAuth({
    appName: "Blog",
    secret : process.env.BETTER_AUTH_SECRET || ""
})