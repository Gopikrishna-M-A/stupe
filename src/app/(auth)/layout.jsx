import { ClerkProvider } from "@clerk/nextjs";

export default function StaticLayout({ children }) {
  return (
    <ClerkProvider>
    <div className='h-screen flex items-center justify-center'>
      {children}
    </div>
    </ClerkProvider>
  )
}
