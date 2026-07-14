"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { problems } from "@/lib/data"
import { usePractice } from "@/lib/practice-context"
import {
  CheckCircle2, Clock, ChevronRight, Circle, Code2, Zap, Target,
  Trophy, TrendingUp, Filter, Sigma, ListChecks,
} from "lucide-react"

const TYPE_META: Record<string, { icon: React.ElementType; label: string }> = {
  coding: { icon: Code2, label: "Coding" },
  numerical: { icon: Sigma, label: "Numerical" },
  mcq: { icon: ListChecks, label: "MCQ" },
}
const DEPARTMENTS = ["All", "CSE", "ECE", "EEE", "Mechanical"] as const

const DIFFICULTY_CONFIG = {
  Easy:   { color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", ring: "#10b981" },
  Medium: { color: "text-amber-500",   bg: "bg-amber-500/10 border-amber-500/20",   dot: "bg-amber-400",   ring: "#f59e0b" },
  Hard:   { color: "text-rose-500",    bg: "bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400",    ring: "#f43f5e" },
} as const

type Difficulty = keyof typeof DIFFICULTY_CONFIG

function RingProgress({ solved, total, color, size = 64 }: { solved: number; total: number; color: string; size?: number }) {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const pct = total > 0 ? solved / total : 0
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={5} className="text-border opacity-30" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  )
}

function StatCard({ label, solved, total, difficulty }: { label: Difficulty; solved: number; total: number; difficulty: Difficulty }) {
  const cfg = DIFFICULTY_CONFIG[difficulty]
  return (
    <div className={`relative flex items-center gap-4 overflow-hidden rounded-xl border ${cfg.bg} p-4`}>
      <div className="relative flex-shrink-0">
        <RingProgress solved={solved} total={total} color={cfg.ring} />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
          {total > 0 ? Math.round((solved / total) * 100) : 0}%
        </span>
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-widest ${cfg.color}`}>{label}</p>
        <p className="text-2xl font-bold leading-tight text-foreground">{solved}<span className="text-sm font-normal text-muted-foreground">/{total}</span></p>
        <p className="mt-0.5 text-xs text-muted-foreground">problems solved</p>
      </div>
    </div>
  )
}

export function PracticeView() {
  const { isSolved, statusOf } = usePractice()
  const [filterDept, setFilterDept] = useState("All")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [filterTag, setFilterTag] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const deptOf = (p: (typeof problems)[number]) => p.department ?? "CSE"

  const allTags = useMemo(() => [...new Set(problems.flatMap((p) => p.tags))].sort(), [])

  const filtered = problems.filter((p) => {
    if (filterDept !== "All" && deptOf(p) !== filterDept) return false
    if (filterDifficulty !== "all" && p.difficulty !== filterDifficulty) return false
    if (filterTag !== "all" && !p.tags.includes(filterTag)) return false
    if (filterStatus !== "all" && statusOf(p) !== filterStatus) return false
    return true
  })

  const byDiff = (d: Difficulty) => problems.filter((p) => p.difficulty === d)
  const solvedIn = (d: Difficulty) => byDiff(d).filter((p) => isSolved(p.id)).length
  const totalSolved = problems.filter((p) => isSolved(p.id)).length
  const total = problems.length
  const pct = total > 0 ? Math.round((totalSolved / total) * 100) : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Problem Solving</h1>
        </div>
        <p className="pl-10 text-sm text-muted-foreground">Practice across departments — coding, numerical, and conceptual problems</p>
      </div>

      {/* Department tabs */}
      <div className="flex flex-wrap gap-2">
        {DEPARTMENTS.map((d) => {
          const count = d === "All" ? problems.length : problems.filter((p) => deptOf(p) === d).length
          const active = filterDept === d
          return (
            <button
              key={d}
              onClick={() => setFilterDept(d)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {d}
              <span className={`rounded-full px-1.5 text-[10px] ${active ? "bg-primary-foreground/20" : "bg-muted"}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Easy"   difficulty="Easy"   solved={solvedIn("Easy")}   total={byDiff("Easy").length} />
        <StatCard label="Medium" difficulty="Medium" solved={solvedIn("Medium")} total={byDiff("Medium").length} />
        <StatCard label="Hard"   difficulty="Hard"   solved={solvedIn("Hard")}   total={byDiff("Hard").length} />
        <div className="relative flex items-center gap-4 overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4">
          <div className="relative flex-shrink-0">
            <RingProgress solved={totalSolved} total={total} color="hsl(217,91%,50%)" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">{pct}%</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Overall</p>
            <p className="text-2xl font-bold leading-tight text-foreground">{totalSolved}<span className="text-sm font-normal text-muted-foreground">/{total}</span></p>
            <p className="mt-0.5 text-xs text-muted-foreground">problems solved</p>
          </div>
          <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
        </div>
      </div>

      {/* Quick stats strip */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: Zap,        label: "Day Streak",     value: "7 days",  color: "text-amber-500",   bg: "bg-amber-500/10" },
          { icon: Target,     label: "Avg Acceptance", value: "54%",     color: "text-blue-500",    bg: "bg-blue-500/10" },
          { icon: Clock,      label: "Avg Time",       value: "18 min",  color: "text-violet-500",  bg: "bg-violet-500/10" },
          { icon: TrendingUp, label: "This Week",      value: "+3",      color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { icon: Trophy,     label: "Best Streak",    value: "12 days", color: "text-rose-500",    bg: "bg-rose-500/10" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`flex items-center gap-2 rounded-lg border border-transparent px-3.5 py-2 ${bg}`}>
            <Icon className={`h-3.5 w-3.5 ${color}`} />
            <span className="text-xs text-muted-foreground">{label}:</span>
            <span className={`text-xs font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> Filter by:
        </div>
        <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
          <SelectTrigger className="h-8 w-[140px] border-border/60 text-xs"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterTag} onValueChange={setFilterTag}>
          <SelectTrigger className="h-8 w-[140px] border-border/60 text-xs"><SelectValue placeholder="Topic" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {allTags.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-8 w-[140px] border-border/60 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Solved">Solved</SelectItem>
            <SelectItem value="Attempted">Attempted</SelectItem>
            <SelectItem value="Unsolved">Unsolved</SelectItem>
          </SelectContent>
        </Select>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} problem{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Problem list */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="grid grid-cols-[2rem_1fr_6rem_1fr_5rem_2rem] gap-3 border-b bg-muted/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div />
          <div>Problem</div>
          <div>Difficulty</div>
          <div className="hidden md:block">Topics</div>
          <div className="hidden text-right md:block">Acceptance</div>
          <div />
        </div>

        <div className="divide-y divide-border/50">
          {filtered.map((p, idx) => {
            const cfg = DIFFICULTY_CONFIG[p.difficulty as Difficulty]
            const status = statusOf(p)
            return (
              <Link
                key={p.id}
                href={`/practice/${p.id}`}
                className="group grid grid-cols-[2rem_1fr_6rem_1fr_5rem_2rem] items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex-shrink-0">
                  {status === "Solved" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : status === "Attempted" ? (
                    <Clock className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/40" />
                  )}
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  {(() => { const T = TYPE_META[p.type ?? "coding"].icon; return <T className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" /> })()}
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      <span className="mr-2 text-xs font-normal text-muted-foreground/50">{String(idx + 1).padStart(2, "0")}</span>
                      {p.title}
                    </span>
                    {p.subject && <p className="truncate text-[11px] text-muted-foreground/70">{p.subject}</p>}
                  </div>
                </div>
                <div>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cfg.bg} ${cfg.color}`}>
                    <span className={`h-1 w-1 rounded-full ${cfg.dot}`} />
                    {p.difficulty}
                  </span>
                </div>
                <div className="hidden flex-wrap gap-1 md:flex">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
                  ))}
                </div>
                <div className="hidden items-center justify-end gap-1.5 md:flex">
                  <div className="h-1 w-10 overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${p.acceptance}%` }} />
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">{p.acceptance}%</span>
                </div>
                <div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Code2 className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">No problems match your filters</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setFilterDifficulty("all"); setFilterTag("all"); setFilterStatus("all") }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
