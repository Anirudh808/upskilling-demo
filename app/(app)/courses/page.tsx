"use client"

import { useState } from "react"
import Link from "next/link"
import { useLMS } from "@/lib/lms-context"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CoursesPage() {
  const { courses } = useLMS()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || (filter === "lms" ? c.isLMS : !c.isLMS)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Explore our curriculum and AI-generated topics.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>

          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => {
          const isLMS = course.isLMS

          const CardContent = (
            <div className={`flex flex-col justify-between p-6 h-full border rounded-xl shadow-sm transition-all ${isLMS ? "bg-card hover:shadow-md hover:border-primary/50 cursor-pointer" : "bg-muted/40 cursor-not-allowed opacity-60"
              }`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">

                </div>
                <div>
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{course.duration}</p>
                </div>
              </div>
            </div>
          )

          return isLMS ? (
            <Link key={course.id} href={`/courses/${course.id}`} className="block h-full">
              {CardContent}
            </Link>
          ) : (
            <div key={course.id} className="h-full">
              {CardContent}
            </div>
          )
        })}
      </div>
    </div >
  )
}
