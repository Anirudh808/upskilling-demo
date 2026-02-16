"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { currentUser, courses, roadmapSteps, skillGaps, recommendedRoles, problems, mockInterviews, verifications } from "@/lib/data"
import { CheckCircle2, Circle, Flame, Target, BookOpen, Code, Calendar, MessageSquare, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

function EmployabilityRing({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? "hsl(var(--success))" : score >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))"

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

export function DashboardView() {
  const [steps, setSteps] = useState(roadmapSteps)
  const course = courses[0]
  const solvedCount = problems.filter((p) => p.status === "Solved").length
  const upcomingVerification = verifications.find((v) => v.status === "Scheduled")
  const upcomingInterview = mockInterviews.find((v) => v.status === "Scheduled")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {currentUser.name.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">Here is your learning progress and next steps.</p>
        </div>
        <Badge variant="outline" className="hidden md:inline-flex">Demo Mode</Badge>
      </div>

      {/* Employability Score Hero */}
      <Card className="border-0 bg-primary/[0.03]">
        <CardContent className="flex flex-col items-center gap-6 py-8 md:flex-row md:items-start md:px-8">
          <EmployabilityRing score={currentUser.employabilityScore} />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-foreground">Employability Score</h2>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
              Computed from your learning progress, practice performance, skill verifications, and mock interview results. Keep completing milestones to improve your score.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {skillGaps.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
              <span className="text-xs text-muted-foreground">Recommended roles:</span>
              {recommendedRoles.map((r) => (
                <Badge key={r} variant="outline" className="text-xs font-normal">{r}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{course.progress}%</p>
              <p className="text-xs text-muted-foreground">Course Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
              <Code className="h-5 w-5 text-[hsl(var(--success))]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{solvedCount}</p>
              <p className="text-xs text-muted-foreground">Problems Solved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--warning))]/10">
              <Flame className="h-5 w-5 text-[hsl(var(--warning))]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Verified Skills</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roadmap */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Personalized Roadmap</CardTitle>
            <CardDescription>Your next 5 steps</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setSteps((prev) => prev.map((s) => s.id === step.id ? { ...s, done: !s.done } : s))}
                className="flex items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted/50"
              >
                {step.done
                  ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                  : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                <div className="flex-1">
                  <p className={`text-sm ${step.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{step.title}</p>
                  <Badge variant="secondary" className="mt-1 text-[10px]">{step.type}</Badge>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Active Course */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Course</CardTitle>
            <CardDescription>{course.title}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Progress value={course.progress} className="flex-1" />
              <span className="text-sm font-medium text-foreground">{course.progress}%</span>
            </div>
            {course.modules.map((mod) => (
              <div key={mod.id} className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-muted/50">
                {mod.completed
                  ? <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
                  : <Circle className="h-4 w-4 text-muted-foreground" />}
                <span className="flex-1 text-sm text-foreground">{mod.title}</span>
                <span className="text-xs text-muted-foreground">{mod.lessons.filter((l) => l.completed).length}/{mod.lessons.length}</span>
              </div>
            ))}
            <Link href="/learning">
              <Button variant="outline" size="sm" className="mt-1 w-full gap-1.5">
                Continue Learning <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming + AI Tutor */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {upcomingVerification && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{upcomingVerification.skill} Verification</p>
                    <p className="text-xs text-muted-foreground">{upcomingVerification.date} &middot; {upcomingVerification.tier}</p>
                  </div>
                </div>
              )}
              {upcomingInterview && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Calendar className="h-4 w-4 text-[hsl(var(--success))]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{upcomingInterview.type} Interview</p>
                    <p className="text-xs text-muted-foreground">{upcomingInterview.date}</p>
                  </div>
                </div>
              )}
              {!upcomingVerification && !upcomingInterview && (
                <p className="text-sm text-muted-foreground">No upcoming events. Schedule a verification or interview.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">AI Tutor</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-lg bg-card p-3 text-sm text-muted-foreground">
                {"Hi Priya! I see you're working on Middleware & Error Handling. Need help with Express middleware patterns?"}
              </div>
              <Link href="/learning">
                <Button size="sm" className="w-full gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> Open Tutor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Insights row */}
      <Card>
        <CardContent className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Weekly Insight</p>
              <p className="text-xs text-muted-foreground">You solved 4 more problems than last week. Focus on Medium difficulty to boost your score.</p>
            </div>
          </div>
          <Link href="/practice">
            <Button variant="outline" size="sm" className="gap-1.5">
              Practice Now <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
