import dbConnect from "@/lib/mongodb";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "stupe",
  description: "simplified fee collection",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (

      <html lang="en">
        <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </head>
        <body>          
          {children}
          <Toaster />
        </body>
      </html>

  );
}