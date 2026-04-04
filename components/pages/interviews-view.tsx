"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { mockInterviews as initialInterviews } from "@/lib/data"
import { toast } from "sonner"
import {
  Video, Calendar, CheckCircle2, Star, TrendingUp, TrendingDown,
  Clock, Mic, MicOff, VideoOff, PhoneOff, MonitorUp, MessageSquare,
  Users, MoreVertical, Hand, Captions, Settings2, X, Wifi,
  Shield, Target, ChevronRight, Plus
} from "lucide-react"

// ── Google Meet Modal ────────────────────────────────────────────────────────
function MeetModal({ onClose }: { onClose: () => void }) {
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [handRaised, setHandRaised] = useState(false)
  const [elapsed] = useState("12:47")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col rounded-2xl overflow-hidden bg-[#202124] shadow-2xl w-full max-w-5xl"
           style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 2rem)" }}>

        {/* ── Top bar ── */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3
                        bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-sm bg-white/10 flex items-center justify-center">
                <Video className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">TalentVerify Interview</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-xs text-white/60 font-mono">{elapsed}</span>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Wifi className="h-3 w-3" /> Good connection
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">axr-bqyz-tpn</span>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* ── Video tiles ── */}
        <div className="flex flex-1 items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
          {/* Main tile – AI Interviewer */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a]" />
            {/* Interviewer avatar */}
            <div className="relative flex flex-col items-center gap-3 z-10">
              {/* Subtle room background effect */}
              <div className="absolute -inset-20 bg-gradient-to-b from-slate-800/0 via-slate-900/60 to-slate-900/0 blur-xl pointer-events-none" />
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-2xl ring-4 ring-white/10 text-3xl font-bold text-white select-none">
                  AM
                </div>
                {/* Speaking pulse ring */}
                <span className="absolute inset-0 rounded-full animate-ping bg-white/10" style={{ animationDuration: "1.8s" }} />
                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#202124]" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-base">Arjun Mehta</p>
                <p className="text-white/50 text-xs mt-0.5">Senior Software Engineer · Google</p>
              </div>
              {/* Waveform */}
              <div className="flex items-end gap-0.5 h-6">
                {[3,6,4,8,5,7,3,9,4,6,3,7,5,4,8].map((h, i) => (
                  <div key={i}
                    className="w-1 rounded-full bg-white/40"
                    style={{ height: `${h * 3}px`, animation: `pulse ${0.4 + i * 0.05}s ease-in-out infinite alternate` }}
                  />
                ))}
              </div>
            </div>

            {/* Speaker label */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5">
              <Mic className="h-3 w-3 text-white/70" />
              <span className="text-xs text-white">Arjun Mehta</span>
            </div>
          </div>

          {/* Self tile (PiP) */}
          <div className="absolute bottom-4 right-4 w-44 aspect-video rounded-xl overflow-hidden border-2 border-white/10 shadow-xl bg-[#2d2d2d]">
            {camOn ? (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">PS</span>
                </div>
                <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                  {micOn
                    ? <Mic className="h-2.5 w-2.5 text-white/70" />
                    : <MicOff className="h-2.5 w-2.5 text-rose-400" />}
                  <span className="text-[10px] text-white/70">You</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#3c3c3c]">
                <VideoOff className="h-6 w-6 text-white/40" />
              </div>
            )}
          </div>

          {/* Participants pill */}
          <div className="absolute top-14 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
            <Users className="h-3 w-3 text-white/60" />
            <span className="text-xs text-white/70">2 participants</span>
          </div>
        </div>

        {/* ── Bottom control bar ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicOn(v => !v)}
                className={`flex flex-col items-center gap-1 group`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors
                  ${micOn ? "bg-white/10 hover:bg-white/20" : "bg-rose-500 hover:bg-rose-600"}`}>
                  {micOn ? <Mic className="h-5 w-5 text-white" /> : <MicOff className="h-5 w-5 text-white" />}
                </div>
                <span className="text-[10px] text-white/50">{micOn ? "Mute" : "Unmute"}</span>
              </button>
              <button onClick={() => setCamOn(v => !v)} className="flex flex-col items-center gap-1">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors
                  ${camOn ? "bg-white/10 hover:bg-white/20" : "bg-rose-500 hover:bg-rose-600"}`}>
                  {camOn ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5 text-white" />}
                </div>
                <span className="text-[10px] text-white/50">{camOn ? "Stop video" : "Start video"}</span>
              </button>
            </div>

            {/* Center actions */}
            <div className="flex items-center gap-2">
              {[
                { Icon: MonitorUp, label: "Present" },
                { Icon: MessageSquare, label: "Chat" },
                { Icon: Captions, label: "Captions" },
                { Icon: Hand, label: handRaised ? "Lower" : "Raise hand", active: handRaised, onClick: () => setHandRaised(v => !v) },
                { Icon: MoreVertical, label: "More" },
              ].map(({ Icon, label, active, onClick }) => (
                <button key={label} onClick={onClick} className="flex flex-col items-center gap-1">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors
                    ${active ? "bg-blue-500 hover:bg-blue-600" : "bg-white/10 hover:bg-white/20"}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] text-white/50">{label}</span>
                </button>
              ))}
            </div>

            {/* Right – Leave */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={onClose}
                className="flex h-11 w-24 items-center justify-center gap-1.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
              >
                <PhoneOff className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Leave</span>
              </button>
              <span className="text-[10px] text-white/50">End call</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Score badge ───────────────────────────────────────────────────────────────
function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-rose-500"
  const bg    = score >= 80 ? "bg-emerald-500/10 border-emerald-500/20" : score >= 60 ? "bg-amber-500/10 border-amber-500/20" : "bg-rose-500/10 border-rose-500/20"
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border px-5 py-3 ${bg}`}>
      <span className={`text-3xl font-bold ${color}`}>{score}</span>
      <span className="text-xs text-muted-foreground mt-0.5">/ 100</span>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export function InterviewsView() {
  const [interviews, setInterviews] = useState(initialInterviews)
  const [bookingType, setBookingType] = useState("Technical")
  const [bookingDate, setBookingDate] = useState("mar5")
  const [showMeet, setShowMeet] = useState(false)

  const handleBook = () => {
    const dateMap: Record<string, string> = { mar5: "Mar 5, 2026 · 11:00 AM", mar7: "Mar 7, 2026 · 3:00 PM", mar10: "Mar 10, 2026 · 10:00 AM" }
    const newInterview = {
      id: `mi${interviews.length + 1}`,
      type: bookingType as "Technical" | "Behavioral",
      date: dateMap[bookingDate] || "Mar 5, 2026",
      status: "Scheduled" as const,
    }
    setInterviews((prev) => [...prev, newInterview])
    toast.success(`${bookingType} interview scheduled!`)
  }

  const completed = interviews.filter((i) => i.status === "Completed")
  const scheduled = interviews.filter((i) => i.status === "Scheduled")

  return (
    <>
      {showMeet && <MeetModal onClose={() => setShowMeet(false)} />}

      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <Video className="h-4 w-4 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Mock Interviews</h1>
            </div>
            <p className="text-sm text-muted-foreground pl-10">Practice with AI-powered interviews and get instant feedback</p>
          </div>

          {/* Quick stats */}
          <div className="hidden sm:flex items-center gap-3">
            {[
              { icon: CheckCircle2, label: "Completed", value: completed.length, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: Clock,        label: "Scheduled",  value: scheduled.length, color: "text-blue-500",    bg: "bg-blue-500/10"    },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${bg} border-transparent`}>
                <Icon className={`h-4 w-4 ${color}`} />
                <div>
                  <p className={`text-lg font-bold leading-none ${color}`}>{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scheduler card ── */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="border-b bg-muted/30 px-5 py-3.5 flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Schedule a New Interview</span>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground mb-4">Book an AI-powered mock session to sharpen your interview skills and receive actionable feedback.</p>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Interview Type</label>
                <Select value={bookingType} onValueChange={setBookingType}>
                  <SelectTrigger className="w-[200px] border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        Technical (Live Coding)
                      </div>
                    </SelectItem>
                    <SelectItem value="Behavioral">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-violet-500" />
                        Behavioral
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date & Time</label>
                <Select value={bookingDate} onValueChange={setBookingDate}>
                  <SelectTrigger className="w-[220px] border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mar5">Mar 5, 2026 · 11:00 AM</SelectItem>
                    <SelectItem value="mar7">Mar 7, 2026 · 3:00 PM</SelectItem>
                    <SelectItem value="mar10">Mar 10, 2026 · 10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleBook} className="gap-2 bg-primary hover:bg-primary/90">
                <Calendar className="h-4 w-4" />
                Book Interview
              </Button>
            </div>
          </div>
        </div>

        {/* ── Upcoming / Scheduled ── */}
        {scheduled.length > 0 && (
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Upcoming Sessions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {scheduled.map((interview) => (
                <div key={interview.id}
                  className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-5 flex flex-col gap-4">
                  {/* Subtle glow */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                      {interview.type === "Technical"
                        ? <Video className="h-6 w-6 text-primary" />
                        : <Users className="h-6 w-6 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground">{interview.type} Interview</p>
                        <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          Scheduled
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {interview.date}
                      </p>
                    </div>
                  </div>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: Shield, label: "AI Monitored" },
                      { icon: Target, label: "Live Coding" },
                      { icon: Settings2, label: "HD Video" },
                    ].map(({ icon: Icon, label }) => (
                      <span key={label} className="flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                        <Icon className="h-3 w-3" /> {label}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => setShowMeet(true)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  >
                    <Video className="h-4 w-4" />
                    Join Meeting
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {scheduled.length === 0 && (
          <div className="rounded-xl border border-dashed bg-card/50 py-12 flex flex-col items-center justify-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No upcoming interviews</p>
              <p className="text-xs text-muted-foreground mt-0.5">Book a session above to start practicing</p>
            </div>
          </div>
        )}

        {/* ── Completed interviews ── */}
        {completed.length > 0 && (
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" /> Completed Sessions
            </h2>
            <div className="flex flex-col gap-4">
              {completed.map((interview) => (
                <div key={interview.id} className="rounded-xl border bg-card overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-4 p-5 border-b bg-muted/20">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{interview.type} Interview</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Calendar className="h-3 w-3" /> {interview.date}
                      </p>
                    </div>
                    {interview.overallScore && <ScoreBadge score={interview.overallScore} />}
                  </div>

                  {/* Score bar */}
                  {interview.overallScore && (
                    <div className="px-5 pt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground">Overall Performance</span>
                        <span className="text-xs font-bold text-foreground">{interview.overallScore}%</span>
                      </div>
                      <Progress value={interview.overallScore} className="h-2" />
                    </div>
                  )}

                  {/* Feedback grid */}
                  <div className="grid gap-4 md:grid-cols-3 p-5">
                    {interview.strengths && (
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                        <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <TrendingUp className="h-3.5 w-3.5" /> Strengths
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {interview.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/80">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-500 flex-shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {interview.improvements && (
                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5">
                        <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                          <TrendingDown className="h-3.5 w-3.5" /> Improve
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {interview.improvements.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/80">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {interview.recommendedPractice && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3.5">
                        <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-primary">
                          <Star className="h-3.5 w-3.5" /> Next Steps
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {interview.recommendedPractice.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/80">
                              <ChevronRight className="mt-0.5 h-3 w-3 text-primary flex-shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Recording row */}
                  <div className="mx-5 mb-5 flex items-center gap-3 rounded-lg bg-muted/40 border border-border/50 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">Interview Recording</p>
                      <p className="text-[11px] text-muted-foreground">Available for 30 days · 47:23</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs border-border/60">
                      <Video className="h-3 w-3" /> Watch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
