import dbConnect from "@/lib/mongodb";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata = {
  title: "stupe",
  description: "simplified fee collection",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <head />
      <body>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}