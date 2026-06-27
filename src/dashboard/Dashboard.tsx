import { useState } from "react"
import { SidebarLeft } from "@/components/sidebar-left"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Attendance from "@/features/attendance/Attendance"
import ViewList from "@/features/list/ViewList"
import ManageList from "@/features/list/ManageList"
import ManageProfile from "@/features/profile/ManageProfile"
import { useLists } from "@/hooks/useLists"

type View = "attendance" | "view-list" | "manage-list" | "manage-profile"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<View>("attendance")
  const listsData = useLists()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const renderContent = () => {
    switch (activeView) {
      case "view-list":
        return <ViewList listsData={listsData} />
      case "manage-list":
        return <ManageList listsData={listsData} />
      case "manage-profile":
        return <ManageProfile />
      default:
        return <Attendance selectedDate={selectedDate} listsData={listsData} />
    }
  }

  const breadcrumbTitle = {
    attendance: "Take Attendance",
    "view-list": "View Lists",
    "manage-list": "Manage Lists",
    "manage-profile": "Profile",
  }[activeView]

  return (
    <SidebarProvider>
      <SidebarLeft
        onNavigate={setActiveView}
        activeView={activeView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {breadcrumbTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4">
          <div className="mx-auto h-screen w-full rounded-xl bg-muted/90">
            {renderContent()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
