"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Code, ShieldCheck, FolderGit2, Video, UserCircle, Search, GitBranch, Settings, BarChart3, Users, Brain, X, Briefcase, GraduationCap, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"
import { navItems, currentUser } from "@/lib/data"
import { ScrollArea } from "@/components/ui/scroll-area"

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, Code, ShieldCheck, FolderGit2, Video, UserCircle, Search, GitBranch, Settings, BarChart3, Users, GraduationCap,
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

  const jobsPortalHref = process.env.NODE_ENV == "development"
    ? "http://localhost:3001/"
    : "https://hrms-demo-delta.vercel.app/seeker/dashboard"

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm md:hidden" onClick={onClose} />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border/70 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-indigo-500 shadow-lg shadow-sidebar-primary/30">
            <Brain className="h-[18px] w-[18px] text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-white">Skill<span className="text-sidebar-primary">Bridge</span></span>
            <span className="text-[10px] text-sidebar-foreground/50">Learn · Verify · Get Hired</span>
          </div>
          <button className="ml-auto text-sidebar-foreground/60 hover:text-white md:hidden" onClick={onClose} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          {groups.map((group) => (
            <div key={group.group} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/40">{group.group}</p>
              <nav className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-sidebar-primary/15 text-white"
                          : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {isActive && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary" />}
                      <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-white")} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </ScrollArea>

        {/* Jobs Portal CTA */}
        <div className="px-3 pb-2">
          <a
            href={jobsPortalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-lg border border-sidebar-border bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary/15">
              <Briefcase className="h-3.5 w-3.5 text-sidebar-primary" />
            </div>
            <span className="flex-1">Jobs Portal</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-50" />
          </a>
        </div>

        {/* User footer */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sidebar-primary to-indigo-500 text-xs font-semibold text-white">
              {currentUser.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{currentUser.name}</p>
              <p className="truncate text-[11px] text-sidebar-foreground/50">{role} · Demo Mode</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--success))]" title="Online" />
          </div>
        </div>
      </aside>
    </>
  )
}
