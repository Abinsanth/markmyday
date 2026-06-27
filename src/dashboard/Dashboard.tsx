import { Outlet, useNavigate, useLocation, useBlocker } from "react-router-dom"
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
import { useLists } from "@/hooks/useLists"
import { useState } from "react"
import ConfirmDialog from "@/components/ConfirmDialog"

export type DashboardContext = {
  listsData: ReturnType<typeof useLists>
  selectedDate: Date | undefined
}

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const listsData = useLists()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const breadcrumbTitle: Record<string, string> = {
    "/dashboard/attendance": "Take Attendance",
    "/dashboard/view-lists": "View Lists",
    "/dashboard/manage-lists": "Manage Lists",
    "/dashboard/profile": "Profile",
  }
  const blocker = useBlocker(({ nextLocation }) => {
    return (
      nextLocation.pathname === "/login" || nextLocation.pathname === "/signup"
    )
  })

  return (
    <>
      {blocker.state === "blocked" && (
        <ConfirmDialog
          open={blocker.state === "blocked"}
          title="Leave Dashboard?"
          description="Are you sure you want to leave? You will be taken to the login page."
          confirmLabel="Leave"
          cancelLabel="Stay"
          onConfirm={() => blocker.proceed()}
          onCancel={() => blocker.reset()}
        />
      )}
      <SidebarProvider>
        <SidebarLeft
          onNavigate={(path) => navigate(path)}
          activePath={location.pathname}
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
                      {breadcrumbTitle[location.pathname] ?? "Dashboard"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="p-4">
            <div className="mx-auto h-screen w-full rounded-xl bg-muted/90">
              <Outlet
                context={{ listsData, selectedDate } satisfies DashboardContext}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
