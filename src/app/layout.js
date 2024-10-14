import dbConnect from "@/lib/mongodb";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Head from 'next/head';

export const metadata = {
  title: "stupe",
  description: "simplified fee collection",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <body>          
        {children}
        <Toaster />
      </body>
    </html>
  );
}