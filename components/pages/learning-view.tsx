"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { courseCategories, type CatalogCourse } from "@/lib/data"
import { useEnrollment } from "@/lib/enrollment-context"
import { GraduationCap, Plus, ArrowRight, Clock, BookOpen } from "lucide-react"

const LEVEL_STYLE: Record<CatalogCourse["level"], string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-600 border-rose-500/20",
}

export function LearningView() {
  const { enrolledCourses } = useEnrollment()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Learning</h1>
        <p className="text-sm text-muted-foreground">
          Continue where you left off · {enrolledCourses.length} enrolled course{enrolledCourses.length !== 1 ? "s" : ""}
        </p>
      </div>

      {enrolledCourses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((ec) => {
            const cat = courseCategories.find((c) => c.id === ec.categoryId)
            const pct = ec.progress
            return (
              <div key={ec.id} className="flex flex-col gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-2">
                  {cat && <Badge variant="secondary" className="text-[10px]">{cat.name}</Badge>}
                  <span className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-semibold ${LEVEL_STYLE[ec.level]}`}>
                    {ec.level}
                  </span>
                </div>
                <div>
                  <p className="line-clamp-1 font-semibold text-foreground">{ec.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{ec.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {ec.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ec.duration}</span>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Progress value={pct} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-foreground">{pct}%</span>
                  </div>
                  <Link href={`/learning/${ec.id}`} className="w-full">
                    <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs">
                      {pct > 0 ? "Continue" : "Start Course"} <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
          <GraduationCap className="h-8 w-8 text-muted-foreground/40" />
          <div>
            <p className="text-sm font-medium text-foreground">You haven&apos;t enrolled in any courses yet</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Browse the catalog and enroll to start learning.</p>
          </div>
          <Link href="/courses">
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Browse Courses</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
