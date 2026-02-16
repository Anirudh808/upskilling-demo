"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { verifications, certificates } from "@/lib/data"
import { toast } from "sonner"
import { ShieldCheck, Clock, Calendar, CheckCircle2, AlertTriangle, Camera, Monitor, Fingerprint, Award, Timer, ChevronRight, Flag } from "lucide-react"

type TestPhase = "schedule" | "checklist" | "test" | "results"

const questions = [
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
  { q: "Which HTTP method is idempotent?", options: ["POST", "PATCH", "PUT", "None"], answer: 2 },
  { q: "What does ACID stand for in databases?", options: ["Atomicity, Consistency, Isolation, Durability", "Application, Control, Integration, Data", "Async, Cache, Index, Deploy", "None of the above"], answer: 0 },
  { q: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Tree"], answer: 1 },
  { q: "What is a foreign key?", options: ["Primary identifier", "Reference to another table's primary key", "Index type", "Database lock"], answer: 1 },
]

export function VerificationView() {
  const [phase, setPhase] = useState<TestPhase>("schedule")
  const [selectedSkill, setSelectedSkill] = useState("DSA")
  const [selectedTier, setSelectedTier] = useState("Intermediate")
  const [checklistDone, setChecklistDone] = useState([false, false, false, false])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(300)
  const [warnings, setWarnings] = useState(0)
  const [certModal, setCertModal] = useState<string | null>(null)

  const startChecklist = () => {
    setPhase("checklist")
    // Auto-check items one by one
    const timers = [0, 1, 2, 3].map((i) =>
      setTimeout(() => setChecklistDone((prev) => prev.map((v, idx) => idx <= i ? true : v)), (i + 1) * 600)
    )
    return () => timers.forEach(clearTimeout)
  }

  const startTest = () => {
    setPhase("test")
    setTimeLeft(300)
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setPhase("results")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const submitTest = () => {
    setPhase("results")
    toast.success("Test submitted successfully!")
  }

  const selectAnswer = (qi: number, ai: number) => {
    setAnswers((prev) => prev.map((v, i) => i === qi ? ai : v))
  }

  const score = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0)
  const scorePercent = Math.round((score / questions.length) * 100)

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  const statusColor: Record<string, string> = {
    Passed: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    Failed: "bg-destructive/10 text-destructive",
    Scheduled: "bg-primary/10 text-primary",
    "Not Started": "bg-muted text-muted-foreground",
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Skill Verification</h1>
        <p className="text-sm text-muted-foreground">Prove your skills with proctored assessments</p>
      </div>

      {/* Existing Verifications */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {verifications.map((v) => (
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

      {/* Test Flow */}
      {phase === "schedule" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schedule New Verification</CardTitle>
            <CardDescription>Select a skill, difficulty tier, and schedule your proctored assessment.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Skill</label>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="DSA">DSA</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
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
                <label className="mb-1.5 block text-sm font-medium text-foreground">Date & Time</label>
                <Select defaultValue="slot1">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slot1">Feb 20, 2026 - 10:00 AM</SelectItem>
                    <SelectItem value="slot2">Feb 20, 2026 - 2:00 PM</SelectItem>
                    <SelectItem value="slot3">Feb 21, 2026 - 10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-fit" onClick={startChecklist}>Proceed to Proctoring Checklist</Button>
          </CardContent>
        </Card>
      )}

      {phase === "checklist" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Proctoring Checklist</CardTitle>
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
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {checklistDone[i]
                  ? <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                  : <Clock className="h-5 w-5 animate-spin text-muted-foreground" />}
              </div>
            ))}
            <Button
              disabled={!checklistDone.every(Boolean)}
              onClick={startTest}
              className="w-fit"
            >
              Start Test
            </Button>
          </CardContent>
        </Card>
      )}

      {phase === "test" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-primary" />
                <span className="text-lg font-bold font-mono text-foreground">{formatTime(timeLeft)}</span>
              </div>
              <Badge variant="outline" className="text-xs">{selectedSkill} - {selectedTier}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {warnings === 0
                  ? <><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--success))]" /> No flags</>
                  : <><AlertTriangle className="h-3.5 w-3.5 text-[hsl(var(--warning))]" /> {warnings} warning(s)</>}
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
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
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
                  <p className="text-sm text-muted-foreground">{selectedSkill} - {selectedTier} Verification</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">CERT-{selectedSkill.toUpperCase().slice(0, 3)}-2026-DEMO</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fraud Flags demo */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">Fraud Detection Timeline (Demo)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {[
                { time: "00:00", event: "Test started, proctoring active", type: "info" },
                { time: "02:15", event: "Tab switch detected (1s)", type: "warning" },
                { time: "03:42", event: "Face not detected for 2s", type: "warning" },
                { time: "05:00", event: "Test submitted successfully", type: "info" },
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

          <Button variant="outline" className="w-fit" onClick={() => { setPhase("schedule"); setAnswers(Array(questions.length).fill(null)); setCurrentQ(0) }}>
            Back to Scheduler
          </Button>
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
