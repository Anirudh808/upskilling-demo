"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { mockInterviews as initialInterviews } from "@/lib/data"
import { toast } from "sonner"
import { Video, Calendar, CheckCircle2, Star, TrendingUp, TrendingDown, Play, Clock } from "lucide-react"

export function InterviewsView() {
  const [interviews, setInterviews] = useState(initialInterviews)
  const [bookingType, setBookingType] = useState("Technical")

  const handleBook = () => {
    const newInterview = {
      id: `mi${interviews.length + 1}`,
      type: bookingType as "Technical" | "Behavioral",
      date: "2026-03-05",
      status: "Scheduled" as const,
    }
    setInterviews((prev) => [...prev, newInterview])
    toast.success(`${bookingType} interview scheduled for Mar 5, 2026!`)
  }

  const completed = interviews.filter((i) => i.status === "Completed")
  const scheduled = interviews.filter((i) => i.status === "Scheduled")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mock Interviews</h1>
        <p className="text-sm text-muted-foreground">Practice with AI-powered mock interviews</p>
      </div>

      {/* Scheduler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Schedule an Interview</CardTitle>
          <CardDescription>Book a mock interview session to practice and get feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Type</label>
              <Select value={bookingType} onValueChange={setBookingType}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical (Live Coding)</SelectItem>
                  <SelectItem value="Behavioral">Behavioral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Date</label>
              <Select defaultValue="mar5">
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mar5">Mar 5, 2026 - 11:00 AM</SelectItem>
                  <SelectItem value="mar7">Mar 7, 2026 - 3:00 PM</SelectItem>
                  <SelectItem value="mar10">Mar 10, 2026 - 10:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleBook} className="gap-1.5">
              <Calendar className="h-4 w-4" /> Book Interview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled */}
      {scheduled.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Upcoming</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {scheduled.map((interview) => (
              <Card key={interview.id} className="border-primary/20">
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {interview.type === "Technical" ? <Video className="h-5 w-5 text-primary" /> : <Calendar className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{interview.type} Interview</p>
                    <p className="text-sm text-muted-foreground">{interview.date}</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">Scheduled</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state for no scheduled */}
      {scheduled.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No upcoming interviews</p>
            <p className="mt-1 text-xs text-muted-foreground">Schedule a mock interview above to start practicing.</p>
          </CardContent>
        </Card>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completed</h2>
          <div className="flex flex-col gap-4">
            {completed.map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
                        <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{interview.type} Interview</CardTitle>
                        <CardDescription>{interview.date}</CardDescription>
                      </div>
                    </div>
                    {interview.overallScore && (
                      <div className="text-right">
                        <p className="text-3xl font-bold text-foreground">{interview.overallScore}</p>
                        <p className="text-xs text-muted-foreground">Overall Score</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {interview.overallScore && (
                    <Progress value={interview.overallScore} className="h-2" />
                  )}
                  <div className="grid gap-4 md:grid-cols-3">
                    {interview.strengths && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--success))]">
                          <TrendingUp className="h-3.5 w-3.5" /> Strengths
                        </p>
                        <ul className="flex flex-col gap-1">
                          {interview.strengths.map((s, i) => (
                            <li key={i} className="text-xs text-foreground/80">{`• ${s}`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {interview.improvements && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--warning))]">
                          <TrendingDown className="h-3.5 w-3.5" /> Improvement Areas
                        </p>
                        <ul className="flex flex-col gap-1">
                          {interview.improvements.map((s, i) => (
                            <li key={i} className="text-xs text-foreground/80">{`• ${s}`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {interview.recommendedPractice && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
                          <Star className="h-3.5 w-3.5" /> Recommended Practice
                        </p>
                        <ul className="flex flex-col gap-1">
                          {interview.recommendedPractice.map((s, i) => (
                            <li key={i} className="text-xs text-foreground/80">{`• ${s}`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Interview recording playback (demo placeholder)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
