import Sidebar from "@/components/Sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClerkProvider } from "@clerk/nextjs"


export default function StaticLayout({ children }) {
  return (
    <ClerkProvider>
    <div className='min-h-screen flex flex-col justify-between '>
      <TooltipProvider>
        <Sidebar>
        {children}
        </Sidebar>
      </TooltipProvider>
    </div>
    </ClerkProvider>
  )
}
