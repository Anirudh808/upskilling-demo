"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Code, ShieldCheck, FolderGit2, Video, UserCircle, Search, GitBranch, Settings, BarChart3, Users, Brain, X, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"
import { navItems } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, Code, ShieldCheck, FolderGit2, Video, UserCircle, Search, GitBranch, Settings, BarChart3, Users,
}

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role } = useRole()
  const pathname = usePathname()

  const isStudentRole = role === "Student" || role === "Fresher" || role === "Experienced"

  const groups = [
    ...(isStudentRole ? navItems.student : []),
    ...(role === "Recruiter" ? navItems.recruiter : []),
    ...(role === "Admin" ? navItems.admin : []),
  ]

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-foreground/20 md:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Brain className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-sidebar-primary-foreground">TalentVerify AI</span>
          <button className="ml-auto md:hidden" onClick={onClose} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          {groups.map((group) => (
            <div key={group.group} className="mb-5">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">{group.group}</p>
              <nav className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
					<div className="border-t border-sidebar-border pt-3">
          <a
            href={process.env.NODE_ENV == "development" ? "http://localhost:3001/" : "https://hrms-demo-delta.vercel.app/seeker/dashboard"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <Briefcase className="h-4 w-4 shrink-0" />
            Go to Jobs Portal
          </a>
        </div>
        </ScrollArea>

        

        <div className="border-t border-sidebar-border p-4">
          <Badge variant="outline" className="border-sidebar-border text-sidebar-foreground/60 text-xs">
            Demo Mode
          </Badge>
        </div>
      </aside>
    </>
  )
}
