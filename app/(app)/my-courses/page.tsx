"use client"

import Link from "next/link"
import { useLMS } from "@/lib/lms-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PlayCircle } from "lucide-react"

export default function MyCoursesPage() {
  const { enrolledCourses } = useLMS()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">Pick up where you left off.</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-muted/20">
          <h3 className="text-xl font-medium mb-2">No courses enrolled yet</h3>
          <p className="text-muted-foreground mb-4">Start exploring our rich curriculum.</p>
          <Link href="/courses" className="text-primary hover:underline font-medium">Browse Courses &rarr;</Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => {
            // Mock random progress if 0 for demo purposes, else use actual
            const displayProgress = course.progress > 0 ? course.progress : Math.floor(Math.random() * 60) + 10

            return (
              <Link key={course.id} href={`/learn/${course.id}`} className="block group">
                <Card className="h-full flex flex-col transition-all hover:border-primary hover:shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                       <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                         Continue Learning
                       </Badge>
                       <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="line-clamp-2 text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.outcomes ? course.outcomes.join(", ") : "Master the fundamentals of this comprehensive course."}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex-col items-start gap-2">
                    <div className="flex justify-between w-full text-xs text-muted-foreground font-medium mb-1">
                      <span>Progress</span>
                      <span>{displayProgress}%</span>
                    </div>
                    <Progress value={displayProgress} className="h-2" />
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
