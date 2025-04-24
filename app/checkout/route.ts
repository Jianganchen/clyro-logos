import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: "https://clyro-logo.vercel.app/success",
  server: "sandbox", // Test environment
});
