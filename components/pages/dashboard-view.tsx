"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { currentUser, courses, courseCategories, roadmapSteps, skillGaps, recommendedRoles, problems, mockInterviews, verifications } from "@/lib/data"
import { useEnrollment } from "@/lib/enrollment-context"
import { usePractice } from "@/lib/practice-context"
import {
  CheckCircle2, Circle, Flame, Target, BookOpen, Code, Calendar, MessageSquare,
  TrendingUp, ArrowRight, GraduationCap, Sparkles, ShieldCheck, Video,
} from "lucide-react"
import Link from "next/link"

const TYPE_COLOR: Record<string, string> = {
  Learning: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Practice: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Verification: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Project: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Interview: "bg-rose-500/10 text-rose-600 border-rose-500/20",
}
const CAT_DOT: Record<string, string> = {
  blue: "bg-blue-500", violet: "bg-violet-500", emerald: "bg-emerald-500", rose: "bg-rose-500",
  amber: "bg-amber-500", cyan: "bg-cyan-500", orange: "bg-orange-500", teal: "bg-teal-500",
}

function EmployabilityRing({ score, size = 132 }: { score: number; size?: number }) {
  const stroke = 9
  const radius = (size - stroke) / 2 - 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? "hsl(var(--success))" : score >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))"

  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground">{score}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, label, tintBg, tintText, trend }: {
  icon: React.ElementType; value: React.ReactNode; label: string; tintBg: string; tintText: string; trend?: string
}) {
  return (
    <div className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tintBg}`}>
          <Icon className={`h-5 w-5 ${tintText}`} />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 rounded-full bg-[hsl(var(--success))]/10 px-2 py-0.5 text-[11px] font-medium text-[hsl(var(--success))]">
            <TrendingUp className="h-3 w-3" /> {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function DashboardView() {
  const { enrolledCourses } = useEnrollment()
  const { isSolved } = usePractice()
  const [steps, setSteps] = useState(roadmapSteps)
  const [today, setToday] = useState("")

  useEffect(() => {
    setToday(new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }))
  }, [])

  const course = courses[0]
  const avgProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0
  const solvedCount = problems.filter((p) => isSolved(p.id)).length
  const verifiedCount = verifications.filter((v) => v.status === "Passed").length
  const doneSteps = steps.filter((s) => s.done).length
  const upcomingVerification = verifications.find((v) => v.status === "Scheduled")
  const upcomingInterview = mockInterviews.find((v) => v.status === "Scheduled")

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/[0.04] to-transparent p-6 md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <div className="flex flex-wrap items-center gap-2">
              {today && <span className="rounded-full bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">{today}</span>}
              <span className="flex items-center gap-1 rounded-full bg-[hsl(var(--warning))]/10 px-2.5 py-1 text-xs font-medium text-[hsl(var(--warning))]">
                <Flame className="h-3.5 w-3.5" /> 7-day streak
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">Welcome back, {currentUser.name.split(" ")[0]} 👋</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              You&apos;ve completed {doneSteps} of {steps.length} roadmap steps. Keep the momentum going and boost your employability score.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/learning"><Button className="gap-1.5">Continue Learning <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/practice"><Button variant="outline" className="gap-1.5"><Code className="h-4 w-4" /> Practice</Button></Link>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4 rounded-xl border bg-card/60 p-4 backdrop-blur-sm">
            <EmployabilityRing score={currentUser.employabilityScore} />
            <div className="max-w-[150px]">
              <p className="text-sm font-semibold text-foreground">Employability Score</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Top 15% of your cohort</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {recommendedRoles.slice(0, 2).map((r) => (
                  <Badge key={r} variant="secondary" className="text-[10px] font-normal">{r}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} value={`${avgProgress}%`} label="Avg. Course Progress" tintBg="bg-primary/10" tintText="text-primary" />
        <StatCard icon={Code} value={solvedCount} label="Problems Solved" tintBg="bg-[hsl(var(--success))]/10" tintText="text-[hsl(var(--success))]" trend="+3" />
        <StatCard icon={Flame} value="7" label="Day Streak" tintBg="bg-[hsl(var(--warning))]/10" tintText="text-[hsl(var(--warning))]" />
        <StatCard icon={ShieldCheck} value={verifiedCount} label="Verified Skills" tintBg="bg-violet-500/10" tintText="text-violet-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roadmap */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base"><Target className="h-4 w-4 text-primary" /> Roadmap</CardTitle>
              <Badge variant="secondary" className="text-xs">{doneSteps}/{steps.length}</Badge>
            </div>
            <Progress value={(doneSteps / steps.length) * 100} className="mt-2 h-1.5" />
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, done: !s.done } : s)))}
                className="flex items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted/50"
              >
                {step.done
                  ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                  : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />}
                <div className="flex-1">
                  <p className={`text-sm ${step.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{step.title}</p>
                  <span className={`mt-1 inline-block rounded border px-1.5 py-0.5 text-[10px] font-medium ${TYPE_COLOR[step.type] ?? "bg-muted text-muted-foreground"}`}>{step.type}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* My Courses */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base"><GraduationCap className="h-4 w-4 text-primary" /> My Courses</CardTitle>
              <Badge variant="secondary" className="text-xs">{enrolledCourses.length} enrolled</Badge>
            </div>
            <CardDescription>Your enrolled courses and progress</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {enrolledCourses.length > 0 ? (
              <>
                {enrolledCourses.slice(0, 4).map((ec) => {
                  const cat = courseCategories.find((c) => c.id === ec.categoryId)
                  const pct = ec.id === "c1" ? course.progress : ec.progress
                  return (
                    <Link key={ec.id} href={`/learning/${ec.id}`} className="flex flex-col gap-1.5 rounded-lg p-2 transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${cat ? CAT_DOT[cat.color] : "bg-primary"}`} />
                        <span className="line-clamp-1 flex-1 text-sm font-medium text-foreground">{ec.title}</span>
                        <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </Link>
                  )
                })}
                <Link href="/learning" className="mt-1">
                  <Button variant="outline" size="sm" className="w-full gap-1.5">Continue Learning <ArrowRight className="h-3.5 w-3.5" /></Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <GraduationCap className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">You haven&apos;t enrolled in any courses yet.</p>
                <Link href="/courses"><Button size="sm" className="gap-1.5">Browse Courses <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming + AI Tutor */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Calendar className="h-4 w-4 text-primary" /> Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              {upcomingVerification && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><ShieldCheck className="h-4 w-4 text-primary" /></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{upcomingVerification.skill} Verification</p>
                    <p className="text-xs text-muted-foreground">{upcomingVerification.date} &middot; {upcomingVerification.tier}</p>
                  </div>
                </div>
              )}
              {upcomingInterview && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10"><Video className="h-4 w-4 text-[hsl(var(--success))]" /></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{upcomingInterview.type} Interview</p>
                    <p className="text-xs text-muted-foreground">{upcomingInterview.date}</p>
                  </div>
                </div>
              )}
              {!upcomingVerification && !upcomingInterview && (
                <p className="py-2 text-sm text-muted-foreground">No upcoming events. Schedule a verification or interview.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.06] to-transparent">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Sparkles className="h-4 w-4 text-primary" /> AI Tutor</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex gap-2.5 rounded-lg border border-border bg-card p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10"><MessageSquare className="h-3.5 w-3.5 text-primary" /></div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Hi {currentUser.name.split(" ")[0]}! I see you&apos;re working on Middleware &amp; Error Handling. Need help with Express middleware patterns?
                </p>
              </div>
              <Link href="/learning"><Button size="sm" className="w-full gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> Open Tutor</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly insight */}
      <div className="flex flex-col gap-4 rounded-xl border bg-gradient-to-r from-[hsl(var(--success))]/[0.06] to-transparent p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--success))]/10">
            <TrendingUp className="h-5 w-5 text-[hsl(var(--success))]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Weekly Insight</p>
            <p className="text-xs text-muted-foreground">You solved 4 more problems than last week. Focus on Medium difficulty to boost your score.</p>
          </div>
        </div>
        <Link href="/practice"><Button variant="outline" size="sm" className="gap-1.5">Practice Now <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
      </div>
    </div>
  )
}
