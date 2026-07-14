"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { catalogProjects, courseCategories, type CatalogProject, type CourseCategory, type ProjectStatus } from "@/lib/data"
import { useProjects } from "@/lib/projects-context"
import {
  Cpu, Code2, Globe, Brain, LineChart, RadioTower, Zap, Cog, Search, FolderGit2, Clock, ListChecks,
  ArrowRight, CheckCircle2, Circle, Loader2,
} from "lucide-react"

const categoryIcon: Record<string, React.ElementType> = { Cpu, Code2, Globe, Brain, LineChart, RadioTower, Zap, Cog }

const COLOR: Record<CourseCategory["color"], { text: string; bg: string; softBg: string }> = {
  blue:    { text: "text-blue-500",    bg: "bg-blue-500",    softBg: "bg-blue-500/10" },
  violet:  { text: "text-violet-500",  bg: "bg-violet-500",  softBg: "bg-violet-500/10" },
  emerald: { text: "text-emerald-500", bg: "bg-emerald-500", softBg: "bg-emerald-500/10" },
  rose:    { text: "text-rose-500",    bg: "bg-rose-500",    softBg: "bg-rose-500/10" },
  amber:   { text: "text-amber-500",   bg: "bg-amber-500",   softBg: "bg-amber-500/10" },
  cyan:    { text: "text-cyan-500",    bg: "bg-cyan-500",    softBg: "bg-cyan-500/10" },
  orange:  { text: "text-orange-500",  bg: "bg-orange-500",  softBg: "bg-orange-500/10" },
  teal:    { text: "text-teal-500",    bg: "bg-teal-500",    softBg: "bg-teal-500/10" },
}

const DIFFICULTY_STYLE: Record<CatalogProject["difficulty"], string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-600 border-rose-500/20",
}

const STATUS_STYLE: Record<ProjectStatus, { badge: string; icon: React.ElementType; iconColor: string }> = {
  "Not Started": { badge: "bg-muted text-muted-foreground border-border", icon: Circle, iconColor: "text-muted-foreground" },
  "In Progress": { badge: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Loader2, iconColor: "text-amber-500" },
  "Completed":   { badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2, iconColor: "text-emerald-500" },
}

const STATUSES: (ProjectStatus | "All")[] = ["All", "Not Started", "In Progress", "Completed"]

function ProjectCard({ project }: { project: CatalogProject }) {
  const { progressOf } = useProjects()
  const category = courseCategories.find((c) => c.id === project.categoryId)!
  const c = COLOR[category.color]
  const Icon = categoryIcon[category.icon] || FolderGit2
  const { done, total, percent, status } = progressOf(project.id)
  const st = STATUS_STYLE[status]

  return (
    <Link href={`/projects/${project.id}`} className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/30 hover:shadow-sm">
      {/* Accent header */}
      <div className={`flex items-center gap-3 border-b ${c.softBg} px-4 py-3`}>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg}`}>
          <Icon className="h-[18px] w-[18px] text-white" />
        </div>
        <span className={`text-xs font-semibold ${c.text}`}>{category.name}</span>
        <span className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-semibold ${DIFFICULTY_STYLE[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold leading-snug text-foreground">{project.title}</h3>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><ListChecks className="h-3 w-3" /> {total} steps</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {project.duration}</span>
        </div>

        {/* Status + progress */}
        <div className="flex flex-col gap-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${st.badge}`}>
              <st.icon className={`h-3 w-3 ${st.iconColor} ${status === "In Progress" ? "animate-spin" : ""}`} style={status === "In Progress" ? { animationDuration: "2s" } : undefined} />
              {status}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">{done}/{total}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={percent} className="h-1.5 flex-1" />
            <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {status === "Not Started" ? "Start" : status === "Completed" ? "Review" : "Continue"} <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ProjectsView() {
  const { progressOf } = useProjects()
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "All">("All")

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: catalogProjects.length, "Not Started": 0, "In Progress": 0, "Completed": 0 }
    for (const p of catalogProjects) counts[progressOf(p.id).status]++
    return counts
  }, [progressOf])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalogProjects.filter((p) => {
      if (activeCategory !== "all" && p.categoryId !== activeCategory) return false
      if (activeStatus !== "All" && progressOf(p.id).status !== activeStatus) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [query, activeCategory, activeStatus, progressOf])

  const grouped = query.trim() === "" && activeCategory === "all" && activeStatus === "All"

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <FolderGit2 className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Guided Projects</h1>
        </div>
        <p className="pl-10 text-sm text-muted-foreground">
          Build real-world projects step by step, from environment setup to deployment.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects or tech..." className="pl-9" />
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => {
            const active = activeStatus === s
            return (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {s}
                <span className={`rounded-full px-1.5 text-[10px] ${active ? "bg-primary-foreground/20" : "bg-muted"}`}>{statusCounts[s]}</span>
              </button>
            )
          })}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === "all" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            All Categories
          </button>
          {courseCategories.map((cat) => {
            const Icon = categoryIcon[cat.icon] || FolderGit2
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      {grouped ? (
        <div className="flex flex-col gap-8">
          {courseCategories.map((cat) => {
            const list = catalogProjects.filter((p) => p.categoryId === cat.id)
            if (list.length === 0) return null
            const Icon = categoryIcon[cat.icon] || FolderGit2
            const c = COLOR[cat.color]
            return (
              <section key={cat.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.softBg}`}>
                    <Icon className={`h-4 w-4 ${c.text}`} />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">{cat.name}</h2>
                  <Badge variant="secondary" className="ml-auto text-xs">{list.length} projects</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {list.map((project) => <ProjectCard key={project.id} project={project} />)}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-16 text-center">
              <FolderGit2 className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">No projects match your filters</p>
              <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setActiveCategory("all"); setActiveStatus("All") }}>Clear filters</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
