"use client"

import { useState, useEffect, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { RoleProvider, useRole } from "@/lib/role-context"
import { EnrollmentProvider } from "@/lib/enrollment-context"
import { PracticeProvider } from "@/lib/practice-context"
import { ProjectsProvider } from "@/lib/projects-context"
import { Toaster } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { catalogCourses, problems, catalogProjects } from "@/lib/data"

function ShellInner({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const { role } = useRole()
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [pathname])

  // Redirect to appropriate default page on role change
  useEffect(() => {
    const isStudentRole = role === "Student" || role === "Fresher" || role === "Experienced"
    const studentPages = ["/dashboard", "/courses", "/learning", "/practice", "/verification", "/projects", "/interviews", "/profile"]
    const recruiterPages = ["/talent-search", "/pipeline", "/hrms"]
    const adminPages = ["/analytics", "/students"]
    const allowed = (pages: string[]) => pages.some((p) => pathname === p || pathname.startsWith(p + "/"))

    if (isStudentRole && !allowed(studentPages)) {
      router.push("/dashboard")
    } else if (role === "Recruiter" && !allowed(recruiterPages)) {
      router.push("/talent-search")
    } else if (role === "Admin" && !allowed(adminPages)) {
      router.push("/analytics")
    }
  }, [role, pathname, router])

  const breadcrumbs = pathname.split("/").filter(Boolean).map((segment, i, arr) => {
    const course = catalogCourses.find((c) => c.id === segment)
    const problem = problems.find((p) => p.id === segment)
    const project = catalogProjects.find((p) => p.id === segment)
    return {
      label: course?.title
        ?? problem?.title
        ?? project?.title
        ?? segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      isLast: i === arr.length - 1,
    }
  })

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
            {breadcrumbs.length > 0 && (
              <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
                <span>Home</span>
                {breadcrumbs.map((bc) => (
                  <span key={bc.label} className="flex items-center gap-1.5">
                    <span>/</span>
                    <span className={bc.isLast ? "font-medium text-foreground" : ""}>{bc.label}</span>
                  </span>
                ))}
              </nav>
            )}
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton className="h-8 w-48" />
                <div className="grid gap-4 md:grid-cols-3">
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </div>
                <Skeleton className="h-64" />
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <EnrollmentProvider>
        <PracticeProvider>
          <ProjectsProvider>
            <ShellInner>{children}</ShellInner>
          </ProjectsProvider>
        </PracticeProvider>
      </EnrollmentProvider>
    </RoleProvider>
  )
}
