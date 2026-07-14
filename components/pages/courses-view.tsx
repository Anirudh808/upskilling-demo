"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { catalogCourses, courseCategories, type CatalogCourse, type CourseCategory } from "@/lib/data"
import { useEnrollment } from "@/lib/enrollment-context"
import { toast } from "sonner"
import {
  Cpu, Code2, Globe, Brain, LineChart, RadioTower, Zap, Cog, Star, Users, Clock, BookOpen,
  Search, Check, Plus, GraduationCap, ArrowRight,
} from "lucide-react"

const categoryIcon: Record<string, React.ElementType> = { Cpu, Code2, Globe, Brain, LineChart, RadioTower, Zap, Cog }

// Tailwind class sets per category color (kept static so they aren't purged)
const COLOR: Record<CourseCategory["color"], { text: string; bg: string; softBg: string; border: string; ring: string }> = {
  blue:    { text: "text-blue-500",    bg: "bg-blue-500",    softBg: "bg-blue-500/10",    border: "border-blue-500/20",    ring: "ring-blue-500/20" },
  violet:  { text: "text-violet-500",  bg: "bg-violet-500",  softBg: "bg-violet-500/10",  border: "border-violet-500/20",  ring: "ring-violet-500/20" },
  emerald: { text: "text-emerald-500", bg: "bg-emerald-500", softBg: "bg-emerald-500/10", border: "border-emerald-500/20", ring: "ring-emerald-500/20" },
  rose:    { text: "text-rose-500",    bg: "bg-rose-500",    softBg: "bg-rose-500/10",    border: "border-rose-500/20",    ring: "ring-rose-500/20" },
  amber:   { text: "text-amber-500",   bg: "bg-amber-500",   softBg: "bg-amber-500/10",   border: "border-amber-500/20",   ring: "ring-amber-500/20" },
  cyan:    { text: "text-cyan-500",    bg: "bg-cyan-500",    softBg: "bg-cyan-500/10",    border: "border-cyan-500/20",    ring: "ring-cyan-500/20" },
  orange:  { text: "text-orange-500",  bg: "bg-orange-500",  softBg: "bg-orange-500/10",  border: "border-orange-500/20",  ring: "ring-orange-500/20" },
  teal:    { text: "text-teal-500",    bg: "bg-teal-500",    softBg: "bg-teal-500/10",    border: "border-teal-500/20",    ring: "ring-teal-500/20" },
}

const LEVEL_STYLE: Record<CatalogCourse["level"], string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-600 border-rose-500/20",
}

function formatStudents(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`
}

function CourseCard({ course }: { course: CatalogCourse }) {
  const { isEnrolled, toggle } = useEnrollment()
  const category = courseCategories.find((c) => c.id === course.categoryId)!
  const c = COLOR[category.color]
  const Icon = categoryIcon[category.icon] || BookOpen
  const enrolled = isEnrolled(course.id)

  const handleToggle = () => {
    toggle(course.id)
    toast[enrolled ? "info" : "success"](
      enrolled ? `Removed "${course.title}" from My Learning` : `Enrolled in "${course.title}"!`
    )
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/30 hover:shadow-sm">
      {/* Accent header */}
      <div className={`flex items-center gap-3 border-b ${c.softBg} px-4 py-3`}>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg}`}>
          <Icon className="h-[18px] w-[18px] text-white" />
        </div>
        <span className={`text-xs font-semibold ${c.text}`}>{category.name}</span>
        <span className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-semibold ${LEVEL_STYLE[course.level]}`}>
          {course.level}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold leading-snug text-foreground line-clamp-1">{course.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">{course.description}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
          ))}
        </div>

        {/* Meta */}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {formatStudents(course.students)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessons} lessons</span>
        </div>

        <div className="flex items-center justify-between gap-2 border-t pt-3">
          <span className="truncate text-[11px] text-muted-foreground">by {course.instructor}</span>
          {enrolled ? (
            <div className="flex items-center gap-1.5">
              <Link href="/learning">
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs text-primary">
                  Go to course <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="h-8 gap-1 px-2.5 text-xs" onClick={handleToggle}>
                <Check className="h-3.5 w-3.5 text-emerald-500" /> Enrolled
              </Button>
            </div>
          ) : (
            <Button size="sm" className="h-8 gap-1 px-3 text-xs" onClick={handleToggle}>
              <Plus className="h-3.5 w-3.5" /> Enroll
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function CoursesView() {
  const { enrolledIds } = useEnrollment()
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalogCourses.filter((course) => {
      if (activeCategory !== "all" && course.categoryId !== activeCategory) return false
      if (!q) return true
      return (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.tags.some((t) => t.toLowerCase().includes(q)) ||
        course.instructor.toLowerCase().includes(q)
      )
    })
  }, [query, activeCategory])

  const grouped = query.trim() === "" && activeCategory === "all"

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Course Catalog</h1>
        </div>
        <p className="pl-10 text-sm text-muted-foreground">
          {catalogCourses.length} AI-generated courses across {courseCategories.length} fields · {enrolledIds.length} enrolled
        </p>
      </div>

      {/* Search + category filters */}
      <div className="flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, topics, or instructors..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            All Courses
          </button>
          {courseCategories.map((cat) => {
            const Icon = categoryIcon[cat.icon] || BookOpen
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grouped by category (default) */}
      {grouped ? (
        <div className="flex flex-col gap-8">
          {courseCategories.map((cat) => {
            const list = catalogCourses.filter((c) => c.categoryId === cat.id)
            const Icon = categoryIcon[cat.icon] || BookOpen
            const c = COLOR[cat.color]
            return (
              <section key={cat.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.softBg}`}>
                    <Icon className={`h-4 w-4 ${c.text}`} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">{cat.name}</h2>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto text-xs">{list.length} courses</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {list.map((course) => <CourseCard key={course.id} course={course} />)}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-16 text-center">
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">No courses match your search</p>
              <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setActiveCategory("all") }}>Clear filters</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
