import Sidebar from "@/components/Sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"


export default function StaticLayout({ children }) {
  return (
    <div className='min-h-screen flex flex-col justify-between '>
      <TooltipProvider>
        <Sidebar>
        {children}
        </Sidebar>
      </TooltipProvider>
    </div>
  )
}
