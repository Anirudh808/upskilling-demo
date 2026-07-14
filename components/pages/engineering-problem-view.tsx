"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProblem, getEngineeringDetail } from "@/lib/data"
import { usePractice } from "@/lib/practice-context"
import { RichText } from "@/components/math"
import { toast } from "sonner"
import {
  ArrowLeft, Sigma, CheckCircle2, XCircle, Lightbulb, BookOpen, ListChecks, Award,
} from "lucide-react"

const DIFFICULTY_CONFIG = {
  Easy:   { color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
  Medium: { color: "text-amber-500",   bg: "bg-amber-500/10 border-amber-500/20",   dot: "bg-amber-400" },
  Hard:   { color: "text-rose-500",    bg: "bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400" },
} as const

export function EngineeringProblemView({ problemId }: { problemId: string }) {
  const problem = getProblem(problemId)
  const detail = getEngineeringDetail(problemId)
  const { isSolved, markSolved } = usePractice()

  const [numeric, setNumeric] = useState("")
  const [choice, setChoice] = useState<number | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [hintStep, setHintStep] = useState(0)

  if (!problem || !detail) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center">
        <Sigma className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm font-medium text-foreground">Problem not found</p>
        <Link href="/practice">
          <Button size="sm" variant="outline" className="gap-1.5"><ArrowLeft className="h-4 w-4" /> Back to Practice</Button>
        </Link>
      </div>
    )
  }

  const cfg = DIFFICULTY_CONFIG[problem.difficulty]
  const solved = isSolved(problem.id)

  const handleCheck = () => {
    let correct = false
    if (detail.answerType === "numerical" && detail.answer) {
      const val = parseFloat(numeric)
      if (!Number.isNaN(val)) correct = Math.abs(val - detail.answer.value) <= detail.answer.tolerance
    } else if (detail.answerType === "mcq") {
      correct = choice === detail.correctChoice
    }
    setResult(correct ? "correct" : "incorrect")
    if (correct) {
      markSolved(problem.id)
      setShowSolution(true)
      toast.success("Correct! Well done.")
    } else {
      toast.error("Not quite — review your working and try again.")
    }
  }

  const canCheck = detail.answerType === "numerical" ? numeric.trim() !== "" : choice !== null

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/practice" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Problems
        </Link>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-base font-semibold text-foreground">{problem.title}</h1>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
          {problem.difficulty}
        </span>
        {problem.department && <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{problem.department}</span>}
        {problem.subject && <span className="text-xs text-muted-foreground">{problem.subject}</span>}
        {solved && (
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-500">
            <CheckCircle2 className="h-3.5 w-3.5" /> Solved
          </span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left — problem statement */}
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookOpen className="h-4 w-4 text-primary" /> Problem
          </div>
          <div className="text-sm leading-relaxed text-foreground/85"><RichText text={detail.statement} /></div>

          {detail.given && detail.given.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/30 p-3.5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Given</p>
              <ul className="flex flex-col gap-1.5">
                {detail.given.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <RichText text={g} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hints */}
          <div className="flex flex-col gap-2">
            {detail.hints.slice(0, hintStep).map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-foreground/90">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                <RichText text={h} />
              </div>
            ))}
            {hintStep < detail.hints.length && (
              <Button variant="ghost" size="sm" className="w-fit gap-1.5 text-xs text-amber-600" onClick={() => setHintStep((s) => s + 1)}>
                <Lightbulb className="h-3.5 w-3.5" /> {hintStep === 0 ? "Show a hint" : "Next hint"}
              </Button>
            )}
          </div>
        </div>

        {/* Right — answer + solution */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              {detail.answerType === "mcq" ? <ListChecks className="h-4 w-4 text-primary" /> : <Sigma className="h-4 w-4 text-primary" />}
              Your Answer
            </div>

            {detail.answerType === "numerical" ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={numeric}
                  onChange={(e) => { setNumeric(e.target.value); setResult(null) }}
                  placeholder="Enter your numeric answer"
                  className="max-w-[220px]"
                  onKeyDown={(e) => e.key === "Enter" && canCheck && handleCheck()}
                />
                {detail.answer?.unit && <span className="text-sm font-medium text-muted-foreground">{detail.answer.unit}</span>}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {detail.choices?.map((opt, i) => {
                  const isSel = choice === i
                  const showState = result !== null && (i === detail.correctChoice || isSel)
                  const isRight = i === detail.correctChoice
                  return (
                    <button
                      key={i}
                      onClick={() => { setChoice(i); setResult(null) }}
                      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                        result !== null && showState
                          ? isRight
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-destructive bg-destructive/10"
                          : isSel
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${isSel ? "border-primary text-primary" : "border-muted-foreground/40 text-muted-foreground"}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <RichText text={opt} />
                    </button>
                  )
                })}
              </div>
            )}

            {result && (
              <div className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium ${
                result === "correct" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600" : "border-rose-500/20 bg-rose-500/10 text-rose-600"
              }`}>
                {result === "correct" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {result === "correct" ? "Correct answer!" : "Incorrect — try again or view the solution."}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button onClick={handleCheck} disabled={!canCheck} className="gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Check Answer
              </Button>
              <Button variant="outline" onClick={() => setShowSolution((s) => !s)} className="gap-1.5">
                <BookOpen className="h-4 w-4" /> {showSolution ? "Hide" : "Show"} Solution
              </Button>
            </div>
          </div>

          {/* Solution */}
          {showSolution && (
            <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/[0.03] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Award className="h-4 w-4" /> Worked Solution
              </div>
              <div className="text-sm leading-relaxed text-foreground/85">
                {detail.solution.split("\n\n").map((para, i) => (
                  <div key={i} className="mb-2"><RichText text={para} /></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
