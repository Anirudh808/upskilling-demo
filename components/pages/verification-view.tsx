"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarPicker } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { verifications, certificates, catalogCourses } from "@/lib/data"
import { toast } from "sonner"
import {
  ShieldCheck, Clock, Calendar, CheckCircle2, AlertTriangle, Camera, Monitor,
  Fingerprint, Award, Timer, Flag, CalendarPlus, Play, X, CalendarClock, Video, VideoOff, Eye,
} from "lucide-react"

// Skills the user can be tested on — derived from the tags of the listed courses.
const SKILL_OPTIONS = Array.from(new Set(catalogCourses.flatMap((c) => c.tags))).sort((a, b) => a.localeCompare(b))

type TestPhase = "list" | "checklist" | "test" | "results"

interface ScheduledExam {
  id: string
  skill: string
  tier: string
  datetime: string // "YYYY-MM-DDTHH:MM" (local)
}

const STORAGE_KEY = "tv_scheduled_exams"
// Seed the scheduled list from any "Scheduled" verification in the demo data.
const SEED_SCHEDULED: ScheduledExam[] = verifications
  .filter((v) => v.status === "Scheduled")
  .map((v) => ({ id: `seed-${v.id}`, skill: v.skill, tier: v.tier, datetime: `${v.date ?? "2026-02-20"}T10:00` }))

const questions = [
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
  { q: "Which HTTP method is idempotent?", options: ["POST", "PATCH", "PUT", "None"], answer: 2 },
  { q: "What does ACID stand for in databases?", options: ["Atomicity, Consistency, Isolation, Durability", "Application, Control, Integration, Data", "Async, Cache, Index, Deploy", "None of the above"], answer: 0 },
  { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Tree"], answer: 1 },
  { q: "What is a foreign key?", options: ["Primary identifier", "Reference to another table's primary key", "Index type", "Database lock"], answer: 1 },
]

const pad = (n: number) => String(n).padStart(2, "0")

function formatDateTime(dt: string) {
  const d = new Date(dt)
  if (Number.isNaN(d.getTime())) return dt
  return d.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })
}

// ── Date + time picker ────────────────────────────────────────────────────────
function DateTimePicker({
  date, time, onDateChange, onTimeChange,
}: {
  date: Date | undefined
  time: string
  onDateChange: (d: Date | undefined) => void
  onTimeChange: (t: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-1 justify-start gap-2 font-normal">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {date
              ? date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
              : <span className="text-muted-foreground">Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarPicker
            mode="single"
            selected={date}
            onSelect={(d) => { onDateChange(d); setOpen(false) }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="relative flex items-center">
        <Clock className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="h-10 rounded-md border border-input bg-background pl-8 pr-2 text-sm outline-none focus:ring-1 focus:ring-ring"
        />
      </div>
    </div>
  )
}

export function VerificationView() {
  const [phase, setPhase] = useState<TestPhase>("list")

  // Scheduler form
  const [selectedSkill, setSelectedSkill] = useState(SKILL_OPTIONS.includes("DSA") ? "DSA" : SKILL_OPTIONS[0])
  const [selectedTier, setSelectedTier] = useState("Intermediate")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("10:00")

  // Scheduled exams (persisted)
  const [scheduledExams, setScheduledExams] = useState<ScheduledExam[]>(SEED_SCHEDULED)
  const [hydrated, setHydrated] = useState(false)

  // Active exam being taken
  const [activeExam, setActiveExam] = useState<ScheduledExam | null>(null)

  // Test state
  const [checklistDone, setChecklistDone] = useState([false, false, false, false])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(300)
  const [certModal, setCertModal] = useState<string | null>(null)

  // Proctoring
  const [violations, setViolations] = useState<{ at: string; type: string }[]>([])
  const [cameraStatus, setCameraStatus] = useState<"idle" | "active" | "denied">("idle")

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const checklistTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const testStartRef = useRef<number>(0)
  const lastViolationRef = useRef<number>(0)

  // Load / persist scheduled exams
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setScheduledExams(JSON.parse(stored))
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduledExams)) } catch { /* ignore */ }
  }, [scheduledExams, hydrated])

  // Clear timers & camera on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      checklistTimersRef.current.forEach(clearTimeout)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  // Attach the camera stream to the video element once the exam screen renders
  useEffect(() => {
    if (phase === "test" && cameraStatus === "active" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch(() => {})
    }
  }, [phase, cameraStatus])

  // Proctoring: flag tab switches / window-not-visible while the exam is running
  useEffect(() => {
    if (phase !== "test") return
    const onVisibility = () => { if (document.hidden) flagViolation("Tab switched / window hidden") }
    const onBlur = () => flagViolation("Window lost focus")
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("blur", onBlur)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("blur", onBlur)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  const stopCamera = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null }
    setCameraStatus("idle")
  }

  const requestCamera = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraStatus("denied"); return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      streamRef.current = stream
      setCameraStatus("active")
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(() => {}) }
    } catch {
      setCameraStatus("denied")
    }
  }

  const elapsedLabel = () => {
    const s = Math.max(0, Math.floor((Date.now() - testStartRef.current) / 1000))
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
  }

  const flagViolation = (type: string) => {
    const now = Date.now()
    if (now - lastViolationRef.current < 1500) return // debounce double events
    lastViolationRef.current = now
    setViolations((prev) => [...prev, { at: elapsedLabel(), type }])
    toast.error(`Proctoring flag: ${type}`)
  }

  const handleSchedule = () => {
    if (!date) { toast.error("Please pick a date for your exam."); return }
    const dt = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${time || "10:00"}`
    const exam: ScheduledExam = { id: `sched-${Date.now()}`, skill: selectedSkill, tier: selectedTier, datetime: dt }
    setScheduledExams((prev) => [...prev, exam].sort((a, b) => a.datetime.localeCompare(b.datetime)))
    setDate(undefined)
    setTime("10:00")
    toast.success(`${selectedSkill} (${selectedTier}) scheduled for ${formatDateTime(dt)}`)
  }

  const cancelExam = (id: string) => {
    setScheduledExams((prev) => prev.filter((e) => e.id !== id))
    toast.info("Scheduled exam cancelled")
  }

  const startExam = (exam: ScheduledExam) => {
    setActiveExam(exam)
    setAnswers(Array(questions.length).fill(null))
    setCurrentQ(0)
    setViolations([])
    setChecklistDone([false, false, false, false])
    setPhase("checklist")
    checklistTimersRef.current = [0, 1, 2, 3].map((i) =>
      setTimeout(() => setChecklistDone((prev) => prev.map((v, idx) => (idx <= i ? true : v))), (i + 1) * 600)
    )
    requestCamera() // ask for camera permission up front, shown live during the exam
  }

  const cancelChecklist = () => {
    stopCamera()
    setActiveExam(null)
    setPhase("list")
  }

  const startTest = () => {
    setPhase("test")
    setTimeLeft(300)
    testStartRef.current = Date.now()
    stopTimer()
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { stopTimer(); stopCamera(); setPhase("results"); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const submitTest = () => {
    stopTimer()
    stopCamera()
    setPhase("results")
    toast.success("Test submitted successfully!")
  }

  const finishExam = () => {
    // Remove the completed exam from the schedule and return to the list
    if (activeExam) setScheduledExams((prev) => prev.filter((e) => e.id !== activeExam.id))
    setActiveExam(null)
    setPhase("list")
  }

  const selectAnswer = (qi: number, ai: number) =>
    setAnswers((prev) => prev.map((v, i) => (i === qi ? ai : v)))

  const examSkill = activeExam?.skill ?? "Skill"
  const examTier = activeExam?.tier ?? ""
  const score = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0)
  const scorePercent = Math.round((score / questions.length) * 100)
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  const statusColor: Record<string, string> = {
    Passed: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    Failed: "bg-destructive/10 text-destructive",
    Scheduled: "bg-primary/10 text-primary",
    "Not Started": "bg-muted text-muted-foreground",
  }

  const history = verifications.filter((v) => v.status !== "Scheduled")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Skill Verification</h1>
        <p className="text-sm text-muted-foreground">Schedule a proctored assessment, then take it to earn a verified certificate</p>
      </div>

      {phase === "list" && (
        <>
          {/* Schedule a new test */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Schedule a New Test</CardTitle>
              </div>
              <CardDescription>Choose a skill, difficulty tier, and a date &amp; time for your proctored assessment.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Skill</label>
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {SKILL_OPTIONS.map((skill) => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Difficulty</label>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Date &amp; Time</label>
                  <DateTimePicker date={date} time={time} onDateChange={setDate} onTimeChange={setTime} />
                </div>
              </div>
              <Button className="w-fit gap-1.5" onClick={handleSchedule}>
                <CalendarPlus className="h-4 w-4" /> Schedule Test
              </Button>
            </CardContent>
          </Card>

          {/* Scheduled exams */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Scheduled Tests</h2>
              <Badge variant="secondary" className="text-xs">{scheduledExams.length}</Badge>
            </div>
            {scheduledExams.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {scheduledExams.map((exam) => (
                  <Card key={exam.id} className="border-primary/20">
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{exam.skill}</p>
                          <p className="text-xs text-muted-foreground">{exam.tier}</p>
                        </div>
                        <Badge className={statusColor.Scheduled}>Scheduled</Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> {formatDateTime(exam.datetime)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1 gap-1.5" onClick={() => startExam(exam)}>
                          <Play className="h-3.5 w-3.5" /> Start Exam
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 text-muted-foreground" onClick={() => cancelExam(exam.id)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground/70">Demo mode: you can start this exam anytime.</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-12 text-center">
                <CalendarClock className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground">No scheduled tests yet</p>
                <p className="text-xs text-muted-foreground">Schedule one above to get started.</p>
              </div>
            )}
          </div>

          {/* Verification history */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-foreground">Your Verifications</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {history.map((v) => (
                <Card key={v.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{v.skill}</p>
                        <p className="text-xs text-muted-foreground">{v.tier}</p>
                      </div>
                      <Badge className={statusColor[v.status]}>{v.status}</Badge>
                    </div>
                    {v.score !== undefined && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Score</span>
                          <span className="font-medium text-foreground">{v.score}%</span>
                        </div>
                        <Progress value={v.score} className="mt-1" />
                      </div>
                    )}
                    {v.date && <p className="mt-2 text-xs text-muted-foreground">{v.date}</p>}
                    {v.certificateId && (
                      <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5 text-xs" onClick={() => setCertModal(v.certificateId!)}>
                        <Award className="h-3.5 w-3.5" /> View Certificate
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {phase === "checklist" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Proctoring Checklist — {examSkill} ({examTier})</CardTitle>
            <CardDescription>Verify your environment before starting the test.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { icon: Fingerprint, label: "Identity Verification", desc: "Face match confirmed" },
              { icon: Camera, label: "Webcam Check", desc: "Camera detected and working" },
              { icon: Monitor, label: "Screen Share", desc: "Screen sharing ready" },
              { icon: ShieldCheck, label: "Environment Check", desc: "No unauthorized software detected" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {i === 1
                      ? (cameraStatus === "active" ? "Camera detected and streaming" : cameraStatus === "denied" ? "Camera permission denied — demo continues without it" : "Requesting camera access…")
                      : item.desc}
                  </p>
                </div>
                {i === 1 && cameraStatus === "denied"
                  ? <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning))]" />
                  : checklistDone[i]
                    ? <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                    : <Clock className="h-5 w-5 animate-spin text-muted-foreground" />}
              </div>
            ))}
            <div className="flex gap-2">
              <Button disabled={!checklistDone.every(Boolean)} onClick={startTest} className="w-fit">Start Test</Button>
              <Button variant="outline" onClick={cancelChecklist} className="w-fit">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {phase === "test" && (
        <div className="flex flex-col gap-4">
          {/* Proctoring camera (top-right, monitored) */}
          <div
            style={{ position: "fixed", top: "5rem", right: "1.5rem" }}
            className={`z-40 w-48 overflow-hidden rounded-xl border-2 bg-black shadow-xl transition-colors ${violations.length > 0 ? "border-destructive" : "border-border"}`}
          >
            <div className="flex items-center justify-between bg-black/80 px-2 py-1">
              <span className="flex items-center gap-1 text-[10px] font-semibold text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> REC
              </span>
              <span className="flex items-center gap-1 text-[10px] text-white/70"><Eye className="h-3 w-3" /> AI Monitored</span>
            </div>
            <div className="relative aspect-video bg-[#111]">
              {cameraStatus === "active" ? (
                <video ref={videoRef} autoPlay muted playsInline className="h-full w-full -scale-x-100 object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 text-white/50">
                  <VideoOff className="h-5 w-5" />
                  <span className="px-2 text-center text-[10px] leading-tight">
                    {cameraStatus === "denied" ? "Camera unavailable (permission denied)" : "Starting camera…"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Violation banner */}
          {violations.length > 0 && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                <AlertTriangle className="h-4 w-4" /> {violations.length} proctoring violation{violations.length > 1 ? "s" : ""} detected
              </div>
              <ul className="mt-1.5 flex flex-col gap-0.5">
                {violations.slice(-4).map((v, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-destructive/90">
                    <span className="font-mono">{v.at}</span> · {v.type}
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-[11px] text-destructive/70">Stay on this tab. Repeated violations may invalidate your test.</p>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-primary" />
                <span className="font-mono text-lg font-bold text-foreground">{formatTime(timeLeft)}</span>
              </div>
              <Badge variant="outline" className="text-xs">{examSkill} - {examTier}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {violations.length === 0
                  ? <><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--success))]" /> No flags</>
                  : <><AlertTriangle className="h-3.5 w-3.5 text-destructive" /> <span className="font-medium text-destructive">{violations.length} flag{violations.length > 1 ? "s" : ""}</span></>}
              </div>
              <Button size="sm" onClick={submitTest}>Submit Test</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                  currentQ === i ? "bg-primary text-primary-foreground" : answers[i] !== null ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-1 text-xs text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
              <p className="mb-4 text-base font-medium text-foreground">{questions[currentQ].q}</p>
              <div className="flex flex-col gap-2">
                {questions[currentQ].options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(currentQ, oi)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      answers[currentQ] === oi
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-foreground hover:border-primary/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" disabled={currentQ === 0} onClick={() => setCurrentQ((p) => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={currentQ === questions.length - 1} onClick={() => setCurrentQ((p) => p + 1)}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {phase === "results" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader><CardTitle>Test Results — {examSkill} ({examTier})</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{scorePercent}%</p>
                  <p className="text-sm text-muted-foreground">{score}/{questions.length} correct</p>
                </div>
                <div className="flex-1">
                  <Progress value={scorePercent} className="h-3" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {scorePercent >= 70 ? "Congratulations! You have passed this verification." : "You did not meet the passing threshold of 70%. You can retake the assessment."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {scorePercent >= 70 && (
            <Card className="border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/[0.03]">
              <CardContent className="flex items-center gap-4 pt-6">
                <Award className="h-10 w-10 text-[hsl(var(--success))]" />
                <div>
                  <p className="font-semibold text-foreground">Certificate Issued</p>
                  <p className="text-sm text-muted-foreground">{examSkill} - {examTier} Verification</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">CERT-{examSkill.toUpperCase().slice(0, 3)}-2026-DEMO</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fraud Flags demo */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">Proctoring Timeline {violations.length > 0 && <span className="text-destructive">· {violations.length} flag{violations.length > 1 ? "s" : ""}</span>}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {[
                { time: "0:00", event: "Test started, camera proctoring active", type: "info" as const },
                ...violations.map((v) => ({ time: v.at, event: v.type, type: "warning" as const })),
                ...(violations.length === 0 ? [{ time: "—", event: "No violations detected", type: "info" as const }] : []),
                { time: "—", event: "Test submitted", type: "info" as const },
              ].map((flag, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2 text-xs">
                  <span className="font-mono font-medium text-muted-foreground">{flag.time}</span>
                  {flag.type === "warning"
                    ? <AlertTriangle className="h-3.5 w-3.5 text-[hsl(var(--warning))]" />
                    : <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />}
                  <span className="text-foreground">{flag.event}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button variant="outline" className="w-fit" onClick={finishExam}>Back to Verifications</Button>
        </div>
      )}

      {/* Certificate Modal */}
      <Dialog open={!!certModal} onOpenChange={() => setCertModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Certificate Verification</DialogTitle>
            <DialogDescription>Blockchain-backed authenticity verification</DialogDescription>
          </DialogHeader>
          {certModal && (() => {
            const cert = certificates.find((c) => c.authenticityId.startsWith(certModal.replace("CERT-", "").slice(0, 3)) || c.authenticityId.includes(certModal.slice(-4)))
            return cert ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/[0.03] p-4 text-center">
                  <ShieldCheck className="mx-auto h-8 w-8 text-[hsl(var(--success))]" />
                  <p className="mt-2 font-semibold text-foreground">Verified Authentic</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground">Holder</p><p className="font-medium text-foreground">{cert.holder}</p></div>
                  <div><p className="text-muted-foreground">Skill</p><p className="font-medium text-foreground">{cert.skill} ({cert.tier})</p></div>
                  <div><p className="text-muted-foreground">Score</p><p className="font-medium text-foreground">{cert.score}%</p></div>
                  <div><p className="text-muted-foreground">Issued</p><p className="font-medium text-foreground">{cert.issuedDate}</p></div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Authenticity ID</p>
                  <p className="font-mono text-xs text-foreground">{cert.authenticityId}</p>
                </div>
              </div>
            ) : <p className="text-sm text-muted-foreground">Certificate details not found.</p>
          })()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
