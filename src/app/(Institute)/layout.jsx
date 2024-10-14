import Sidebar from "@/components/Sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClerkProvider } from "@clerk/nextjs"
import { UserProvider } from "@/contexts/UserContext"

export default function StaticLayout({ children }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <div className='min-h-screen flex flex-col justify-between '>
          <TooltipProvider>
            <Sidebar>{children}</Sidebar>
          </TooltipProvider>
        </div>
      </UserProvider>
    </ClerkProvider>
  )
}
