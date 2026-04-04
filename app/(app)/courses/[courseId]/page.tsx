"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLMS } from "@/lib/lms-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Clock, BookOpen } from "lucide-react"

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter()
  const { courses, enrollCourse, enrolledCourses } = useLMS()
  const resolvedParams = use(params)
  
  const course = courses.find(c => c.id === resolvedParams.courseId)
  const isEnrolled = enrolledCourses.some(c => c.id === resolvedParams.courseId)

  if (!course) return <div className="p-10 text-center">Course not found.</div>

  const handleEnroll = () => {
    enrollCourse(course)
    router.push("/my-courses")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="space-y-4">
        <Badge variant={course.isLMS ? "default" : "secondary"}>
          {course.isLMS ? "LMS Official Course" : "AI Generated"}
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">{course.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mt-4">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4"/> Comprehensive Syllabus</span>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* Outcomes */}
          {course.outcomes && (
            <Card>
              <CardHeader>
                <CardTitle>Course Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Syllabus */}
          {course.syllabus && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Syllabus</h2>
              <Accordion type="single" collapsible className="w-full">
                {course.syllabus.map((mod, mIdx) => (
                  <AccordionItem key={mIdx} value={`mod-${mIdx}`}>
                    <AccordionTrigger className="text-lg font-semibold bg-muted/30 px-4 rounded-md">
                      Module {mIdx + 1}: {mod.module}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-4 space-y-6">
                      {mod.chapters && mod.chapters.length > 0 ? mod.chapters.map((chap, cIdx) => (
                        <div key={cIdx} className="space-y-3">
                          <h4 className="font-semibold text-md text-primary">{chap.title}</h4>
                          {chap.lessons && chap.lessons.length > 0 && (
                            <div className="pl-4 border-l-2 border-muted space-y-4">
                              {chap.lessons.map((less, lIdx) => (
                                <div key={lIdx}>
                                  <h5 className="font-medium text-sm">{less.title}</h5>
                                  {less.topics && less.topics.length > 0 && (
                                    <ul className="mt-2 space-y-2 pl-4">
                                      {less.topics.map((top, tIdx) => (
                                        <li key={tIdx} className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                                          <span className="font-medium text-foreground">{top.title}</span>
                                          {top.subtopics && top.subtopics.length > 0 && (
                                            <div className="mt-1 pl-2 border-l border-primary/20 flex flex-wrap gap-2">
                                              {top.subtopics.map((sub, sIdx) => (
                                                <Badge variant="outline" key={sIdx} className="text-xs">{sub}</Badge>
                                              ))}
                                            </div>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )) : <p className="text-muted-foreground text-sm">No chapters found for this module.</p>}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ready to start?</CardTitle>
              <CardDescription>Enroll now to track your progress and earn certificates.</CardDescription>
            </CardHeader>
            <CardContent>
              {isEnrolled ? (
                <Button className="w-full" variant="outline" onClick={() => router.push("/my-courses")}>
                  Go to My Courses
                </Button>
              ) : (
                <Button className="w-full" onClick={handleEnroll}>
                  Enroll Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
