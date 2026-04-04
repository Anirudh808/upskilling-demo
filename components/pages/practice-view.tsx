"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { problems } from "@/lib/data"
import { toast } from "sonner"
import {
  ArrowLeft, Play, Upload, Lightbulb, CheckCircle2, XCircle, Clock,
  ChevronRight, Circle, Code2, Zap, Target, Trophy, TrendingUp,
  Terminal, BookOpen, Filter
} from "lucide-react"

const problemDetails: Record<string, { description: string; examples: string[]; constraints: string[]; hints: string[] }> = {
  p1: {
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] == 9",
      "Input: nums = [3,2,4], target = 6\nOutput: [1,2]",
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists"],
    hints: [
      "Try using a hash map to store seen values",
      "For each number, check if target - number exists in the map",
      "One pass through the array is sufficient",
    ],
  },
}

const defaultDetails = {
  description:
    "Given the problem constraints, implement an efficient solution that handles all edge cases. Consider the time and space complexity of your approach.\n\nYour solution should handle empty inputs, single-element inputs, and large inputs efficiently.",
  examples: ["Input: [1, 2, 3]\nOutput: [expected result]\nExplanation: Process the input according to the problem rules"],
  constraints: ["Input size: 1 <= n <= 10^5", "Values within 32-bit integer range", "Solution must run in O(n) or O(n log n) time"],
  hints: [
    "Consider the brute force approach first",
    "Think about what data structure could help",
    "Can you reduce the time complexity with extra space?",
  ],
}

const DIFFICULTY_CONFIG = {
  Easy:   { color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", ring: "#10b981" },
  Medium: { color: "text-amber-500",   bg: "bg-amber-500/10 border-amber-500/20",   dot: "bg-amber-400",   ring: "#f59e0b" },
  Hard:   { color: "text-rose-500",    bg: "bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400",    ring: "#f43f5e" },
} as const

type Difficulty = keyof typeof DIFFICULTY_CONFIG

// ── Circular progress ring ────────────────────────────────────────────────────
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

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, solved, total, difficulty }: { label: Difficulty; solved: number; total: number; difficulty: Difficulty }) {
  const cfg = DIFFICULTY_CONFIG[difficulty]
  return (
    <div className={`relative overflow-hidden rounded-xl border ${cfg.bg} p-4 flex items-center gap-4`}>
      <div className="relative flex-shrink-0">
        <RingProgress solved={solved} total={total} color={cfg.ring} />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
          {total > 0 ? Math.round((solved / total) * 100) : 0}%
        </span>
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-widest ${cfg.color}`}>{label}</p>
        <p className="text-2xl font-bold text-foreground leading-tight">{solved}<span className="text-sm font-normal text-muted-foreground">/{total}</span></p>
        <p className="text-xs text-muted-foreground mt-0.5">problems solved</p>
      </div>
    </div>
  )
}

export function PracticeView() {
  const [problemList, setProblemList] = useState(problems)
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [filterTag, setFilterTag] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [code, setCode] = useState(`function solve(nums, target) {\n  // Write your solution here\n  \n}`)
  const [language, setLanguage] = useState("javascript")
  const [hintStep, setHintStep] = useState(0)
  const [output, setOutput] = useState<{ passed: boolean; results: { input: string; expected: string; actual: string; passed: boolean }[] } | null>(null)
  const [running, setRunning] = useState(false)

  const allTags = useMemo(() => [...new Set(problems.flatMap((p) => p.tags))].sort(), [])

  const filtered = useMemo(() => {
    return problemList.filter((p) => {
      if (filterDifficulty !== "all" && p.difficulty !== filterDifficulty) return false
      if (filterTag !== "all" && !p.tags.includes(filterTag)) return false
      if (filterStatus !== "all" && p.status !== filterStatus) return false
      return true
    })
  }, [problemList, filterDifficulty, filterTag, filterStatus])

  const stats = useMemo(() => {
    const easy = problemList.filter((p) => p.difficulty === "Easy")
    const med  = problemList.filter((p) => p.difficulty === "Medium")
    const hard = problemList.filter((p) => p.difficulty === "Hard")
    const totalSolved = problemList.filter((p) => p.status === "Solved").length
    return {
      easy:  { solved: easy.filter((p) => p.status === "Solved").length, total: easy.length },
      med:   { solved: med.filter((p)  => p.status === "Solved").length, total: med.length  },
      hard:  { solved: hard.filter((p) => p.status === "Solved").length, total: hard.length },
      totalSolved,
      total: problemList.length,
    }
  }, [problemList])

  const handleRun = () => {
    setRunning(true)
    setTimeout(() => {
      setOutput({
        passed: false,
        results: [
          { input: "[2,7,11,15], target=9", expected: "[0,1]", actual: "[0,1]", passed: true },
          { input: "[3,2,4], target=6",     expected: "[1,2]", actual: "[1,2]", passed: true },
          { input: "[3,3], target=6",       expected: "[0,1]", actual: "undefined", passed: false },
        ],
      })
      setRunning(false)
      toast.info("2 of 3 test cases passed")
    }, 1200)
  }

  const handleSubmit = () => {
    setRunning(true)
    setTimeout(() => {
      const success = Math.random() > 0.4
      if (success) {
        setOutput({
          passed: true,
          results: [
            { input: "[2,7,11,15], target=9", expected: "[0,1]", actual: "[0,1]", passed: true },
            { input: "[3,2,4], target=6",     expected: "[1,2]", actual: "[1,2]", passed: true },
            { input: "[3,3], target=6",       expected: "[0,1]", actual: "[0,1]", passed: true },
          ],
        })
        toast.success("All test cases passed! Problem solved.")
        if (selectedProblem) {
          setProblemList((prev) => prev.map((p) => p.id === selectedProblem ? { ...p, status: "Solved" as const } : p))
        }
      } else {
        setOutput({
          passed: false,
          results: [
            { input: "[2,7,11,15], target=9",    expected: "[0,1]", actual: "[0,1]",              passed: true  },
            { input: "Large input (n=10^4)",      expected: "...",    actual: "Time Limit Exceeded", passed: false },
          ],
        })
        toast.error("Some test cases failed. Try optimizing your solution.")
      }
      setRunning(false)
    }, 1500)
  }

  // ── PROBLEM DETAIL VIEW ─────────────────────────────────────────────────────
  if (selectedProblem) {
    const problem = problemList.find((p) => p.id === selectedProblem)!
    const details = problemDetails[selectedProblem] || defaultDetails
    const cfg = DIFFICULTY_CONFIG[problem.difficulty as Difficulty]

    return (
      <div className="flex flex-col gap-4 h-full">
        {/* Header bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="ghost" size="sm"
            onClick={() => { setSelectedProblem(null); setOutput(null); setHintStep(0) }}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Problems
          </Button>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-base font-semibold text-foreground">{problem.title}</h1>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {problem.difficulty}
          </span>
          <div className="flex flex-wrap gap-1">
            {problem.tags.map((t) => (
              <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{t}</span>
            ))}
          </div>
          {problem.status === "Solved" && (
            <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-500">
              <CheckCircle2 className="h-3.5 w-3.5" /> Solved
            </span>
          )}
        </div>

        <div className="grid gap-4 lg:grid-cols-2 flex-1">
          {/* Left — Problem statement */}
          <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
            <Tabs defaultValue="description" className="flex flex-1 flex-col">
              <div className="border-b bg-muted/30 px-1">
                <TabsList className="h-11 bg-transparent gap-0 rounded-none">
                  <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent gap-1.5 text-sm">
                    <BookOpen className="h-3.5 w-3.5" /> Description
                  </TabsTrigger>
                  <TabsTrigger value="hints" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent gap-1.5 text-sm">
                    <Lightbulb className="h-3.5 w-3.5" /> Hints
                  </TabsTrigger>
                  <TabsTrigger value="output" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent gap-1.5 text-sm">
                    <Terminal className="h-3.5 w-3.5" /> Output
                    {output && (
                      <span className={`ml-1 h-1.5 w-1.5 rounded-full ${output.passed ? "bg-emerald-400" : "bg-rose-400"}`} />
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="description" className="flex-1 overflow-auto p-5 m-0">
                <div className="flex flex-col gap-5">
                  <p className="text-sm leading-relaxed text-foreground/80">{details.description}</p>
                  <div className="flex flex-col gap-3">
                    {details.examples.map((ex, i) => (
                      <div key={i} className="rounded-lg border border-border bg-muted/40 overflow-hidden">
                        <div className="px-3 py-1.5 border-b border-border bg-muted/60">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example {i + 1}</span>
                        </div>
                        <pre className="p-3 whitespace-pre-wrap font-mono text-xs text-foreground leading-relaxed">{ex}</pre>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Constraints</p>
                    <ul className="flex flex-col gap-1.5">
                      {details.constraints.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                          <code className="font-mono">{c}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hints" className="flex-1 overflow-auto p-5 m-0">
                <div className="flex flex-col gap-3">
                  {details.hints.slice(0, hintStep + 1).map((hint, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5">
                      <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{hint}</p>
                    </div>
                  ))}
                  {hintStep < details.hints.length - 1 && (
                    <Button variant="outline" size="sm" onClick={() => setHintStep((p) => p + 1)} className="self-start gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Reveal Next Hint
                    </Button>
                  )}
                  {hintStep >= details.hints.length - 1 && (
                    <p className="text-xs text-muted-foreground">All hints revealed. You've got this! 💪</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="output" className="flex-1 overflow-auto p-5 m-0">
                {output ? (
                  <div className="flex flex-col gap-3">
                    <div className={`flex items-center gap-2.5 rounded-lg px-4 py-3 border ${
                      output.passed
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                        : "bg-rose-500/10 border-rose-500/20 text-rose-600"
                    }`}>
                      {output.passed ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      <span className="text-sm font-semibold">{output.passed ? "All tests passed!" : "Some tests failed"}</span>
                    </div>
                    {output.results.map((r, i) => (
                      <div key={i} className={`rounded-lg border p-3.5 ${r.passed ? "border-emerald-500/20 bg-emerald-500/5" : "border-rose-500/20 bg-rose-500/5"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {r.passed
                            ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            : <XCircle className="h-3.5 w-3.5 text-rose-500" />}
                          <span className="text-xs font-semibold text-foreground">Test Case {i + 1}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          {[["Input", r.input], ["Expected", r.expected], ["Got", r.actual]].map(([lbl, val]) => (
                            <div key={lbl}>
                              <p className="text-muted-foreground font-medium mb-0.5">{lbl}</p>
                              <code className="font-mono text-foreground">{val}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
                    <Terminal className="h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">Run or submit your code to see results here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right — Code editor */}
          <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
            {/* Editor toolbar */}
            <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Code2 className="h-4 w-4 text-primary" />
                Code Editor
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-7 w-[120px] text-xs border-border/60 bg-background/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Code area */}
            <div className="flex-1 relative bg-[hsl(220,18%,9%)]">
              {/* Line numbers / gutter */}
              <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-white/5 flex flex-col pt-3 items-center gap-[1px] pointer-events-none">
                {code.split("\n").map((_, i) => (
                  <span key={i} className="text-[11px] text-white/20 font-mono leading-[1.625rem]">{i + 1}</span>
                ))}
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] h-full resize-none font-mono text-sm bg-transparent border-0 rounded-none pl-12 pr-4 pt-3 text-[hsl(220,15%,85%)] placeholder:text-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 leading-[1.625rem]"
                spellCheck={false}
              />
            </div>

            {/* Action bar */}
            <div className="flex items-center gap-2 border-t bg-muted/20 px-4 py-3">
              <Button
                variant="outline" size="sm"
                onClick={handleRun} disabled={running}
                className="gap-1.5 border-border/60 hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
              >
                <Play className={`h-3.5 w-3.5 ${running ? "animate-pulse" : ""}`} />
                {running ? "Running…" : "Run Code"}
              </Button>
              <Button
                size="sm" onClick={handleSubmit} disabled={running}
                className="gap-1.5 bg-primary hover:bg-primary/90"
              >
                <Upload className="h-3.5 w-3.5" />
                {running ? "Submitting…" : "Submit"}
              </Button>
              <span className="ml-auto text-xs text-muted-foreground">
                {code.split("\n").length} lines
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── PROBLEM LIST VIEW ───────────────────────────────────────────────────────
  const solved = stats.totalSolved
  const total  = stats.total
  const pct    = total > 0 ? Math.round((solved / total) * 100) : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Practice</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-10">Sharpen your algorithmic thinking with curated coding problems</p>
      </div>

      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Easy"   difficulty="Easy"   solved={stats.easy.solved} total={stats.easy.total} />
        <StatCard label="Medium" difficulty="Medium" solved={stats.med.solved}  total={stats.med.total}  />
        <StatCard label="Hard"   difficulty="Hard"   solved={stats.hard.solved} total={stats.hard.total} />

        {/* Overall card */}
        <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <RingProgress solved={solved} total={total} color="hsl(217,91%,50%)" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">{pct}%</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Overall</p>
            <p className="text-2xl font-bold text-foreground leading-tight">{solved}<span className="text-sm font-normal text-muted-foreground">/{total}</span></p>
            <p className="text-xs text-muted-foreground mt-0.5">problems solved</p>
          </div>
          {/* Glow */}
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* Quick stats strip */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: Zap,       label: "Day Streak",     value: "7 days",  color: "text-amber-500",   bg: "bg-amber-500/10"   },
          { icon: Target,    label: "Avg Acceptance",  value: "54%",     color: "text-blue-500",    bg: "bg-blue-500/10"    },
          { icon: Clock,     label: "Avg Time",        value: "18 min",  color: "text-violet-500",  bg: "bg-violet-500/10"  },
          { icon: TrendingUp,label: "This Week",       value: "+3",      color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { icon: Trophy,    label: "Best Streak",     value: "12 days", color: "text-rose-500",    bg: "bg-rose-500/10"    },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 ${bg} border-transparent`}>
            <Icon className={`h-3.5 w-3.5 ${color}`} />
            <span className="text-xs text-muted-foreground">{label}:</span>
            <span className={`text-xs font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
          <Filter className="h-3.5 w-3.5" /> Filter by:
        </div>
        <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
          <SelectTrigger className="h-8 w-[140px] text-xs border-border/60">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterTag} onValueChange={setFilterTag}>
          <SelectTrigger className="h-8 w-[140px] text-xs border-border/60">
            <SelectValue placeholder="Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {allTags.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-8 w-[140px] text-xs border-border/60">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
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
      <div className="rounded-xl border bg-card overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2rem_1fr_6rem_1fr_5rem_2rem] gap-3 border-b bg-muted/30 px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <div />
          <div>Problem</div>
          <div>Difficulty</div>
          <div className="hidden md:block">Topics</div>
          <div className="hidden md:block text-right">Acceptance</div>
          <div />
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/50">
          {filtered.map((p, idx) => {
            const cfg = DIFFICULTY_CONFIG[p.difficulty as Difficulty]
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProblem(p.id)}
                className="w-full grid grid-cols-[2rem_1fr_6rem_1fr_5rem_2rem] gap-3 items-center px-4 py-3.5 text-left hover:bg-muted/40 transition-colors group"
              >
                {/* Status icon */}
                <div className="flex-shrink-0">
                  {p.status === "Solved" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : p.status === "Attempted" ? (
                    <Clock className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/40" />
                  )}
                </div>

                {/* Title */}
                <div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    <span className="text-muted-foreground/50 text-xs mr-2 font-normal">{String(idx + 1).padStart(2, "0")}</span>
                    {p.title}
                  </span>
                </div>

                {/* Difficulty badge */}
                <div>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cfg.bg} ${cfg.color}`}>
                    <span className={`h-1 w-1 rounded-full ${cfg.dot}`} />
                    {p.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="hidden md:flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
                  ))}
                </div>

                {/* Acceptance */}
                <div className="hidden md:flex items-center justify-end gap-1.5">
                  <div className="h-1 w-10 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/60"
                      style={{ width: `${p.acceptance}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">{p.acceptance}%</span>
                </div>

                {/* Arrow */}
                <div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
            <Code2 className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">No problems match your filters</p>
            <p className="text-xs text-muted-foreground/60">Try adjusting the difficulty, topic, or status filter</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setFilterDifficulty("all"); setFilterTag("all"); setFilterStatus("all") }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
