"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { getProblem, getProblemDetail, type CodeLanguage } from "@/lib/data"
import { usePractice } from "@/lib/practice-context"
import { toast } from "sonner"
import {
  ArrowLeft, Play, Upload, Lightbulb, CheckCircle2, XCircle, Terminal,
  BookOpen, Code2, ChevronRight,
} from "lucide-react"

const CodeEditor = dynamic(() => import("@/components/code-editor").then((m) => m.CodeEditor), {
  ssr: false,
  loading: () => <div className="p-4 font-mono text-xs text-white/40">Loading editor…</div>,
})

const DIFFICULTY_CONFIG = {
  Easy:   { color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
  Medium: { color: "text-amber-500",   bg: "bg-amber-500/10 border-amber-500/20",   dot: "bg-amber-400" },
  Hard:   { color: "text-rose-500",    bg: "bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400" },
} as const

type TestResult = { input: string; expected: string; actual: string; passed: boolean }

export function ProblemView({ problemId }: { problemId: string }) {
  const problem = getProblem(problemId)
  const detail = getProblemDetail(problemId)
  const { isSolved, markSolved } = usePractice()

  const [language, setLanguage] = useState<CodeLanguage>("javascript")
  const [codeByLang, setCodeByLang] = useState<Record<CodeLanguage, string>>(detail.starter)
  const [hintStep, setHintStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState<{ passed: boolean; results: TestResult[] } | null>(null)
  const [consoleTab, setConsoleTab] = useState("testcase")

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center">
        <Code2 className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm font-medium text-foreground">Problem not found</p>
        <Link href="/practice">
          <Button size="sm" variant="outline" className="gap-1.5"><ArrowLeft className="h-4 w-4" /> Back to Practice</Button>
        </Link>
      </div>
    )
  }

  const cfg = DIFFICULTY_CONFIG[problem.difficulty]
  const solved = isSolved(problem.id)
  const code = codeByLang[language]
  const setCode = (c: string) => setCodeByLang((prev) => ({ ...prev, [language]: c }))

  const handleRun = () => {
    setRunning(true)
    setConsoleTab("result")
    setTimeout(() => {
      setOutput({
        passed: false,
        results: [
          { input: detail.examples[0]?.input ?? "sample 1", expected: detail.examples[0]?.output ?? "…", actual: detail.examples[0]?.output ?? "…", passed: true },
          { input: detail.examples[1]?.input ?? "sample 2", expected: detail.examples[1]?.output ?? "…", actual: detail.examples[1]?.output ?? "…", passed: true },
          { input: "hidden edge case", expected: "…", actual: "undefined", passed: false },
        ],
      })
      setRunning(false)
      toast.info("2 of 3 test cases passed")
    }, 1100)
  }

  const handleSubmit = () => {
    setRunning(true)
    setConsoleTab("result")
    setTimeout(() => {
      const success = Math.random() > 0.35
      if (success) {
        setOutput({
          passed: true,
          results: detail.examples.map((ex) => ({ input: ex.input, expected: ex.output, actual: ex.output, passed: true })),
        })
        markSolved(problem.id)
        toast.success("Accepted! All test cases passed.")
      } else {
        setOutput({
          passed: false,
          results: [
            { input: detail.examples[0]?.input ?? "sample", expected: detail.examples[0]?.output ?? "…", actual: detail.examples[0]?.output ?? "…", passed: true },
            { input: "Large input (n = 10^4)", expected: "…", actual: "Time Limit Exceeded", passed: false },
          ],
        })
        toast.error("Some test cases failed. Try optimizing your solution.")
      }
      setRunning(false)
    }, 1400)
  }

  return (
    <div className="flex flex-col gap-3">
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
        <div className="flex flex-wrap gap-1">
          {problem.tags.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{t}</span>
          ))}
        </div>
        {solved && (
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-500">
            <CheckCircle2 className="h-3.5 w-3.5" /> Solved
          </span>
        )}
      </div>

      {/* LeetCode split */}
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-11rem)] min-h-[520px] rounded-xl border">
        {/* Left — problem statement */}
        <ResizablePanel defaultSize={45} minSize={25}>
          <Tabs defaultValue="description" className="flex h-full flex-col">
            <div className="border-b bg-muted/30 px-2">
              <TabsList className="h-11 gap-0 rounded-none bg-transparent">
                <TabsTrigger value="description" className="gap-1.5 rounded-none border-b-2 border-transparent text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent">
                  <BookOpen className="h-3.5 w-3.5" /> Description
                </TabsTrigger>
                <TabsTrigger value="hints" className="gap-1.5 rounded-none border-b-2 border-transparent text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent">
                  <Lightbulb className="h-3.5 w-3.5" /> Hints
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="description" className="m-0 flex-1 overflow-auto p-5">
              <div className="flex flex-col gap-5">
                <p className="text-sm leading-relaxed text-foreground/80">{detail.description}</p>
                <div className="flex flex-col gap-3">
                  {detail.examples.map((ex, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border border-border bg-muted/40">
                      <div className="border-b border-border bg-muted/60 px-3 py-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Example {i + 1}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 p-3 font-mono text-xs">
                        <p><span className="text-muted-foreground">Input: </span><span className="text-foreground">{ex.input}</span></p>
                        <p><span className="text-muted-foreground">Output: </span><span className="text-foreground">{ex.output}</span></p>
                        {ex.explanation && <p className="font-sans text-muted-foreground">{ex.explanation}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Constraints</p>
                  <ul className="flex flex-col gap-1.5">
                    {detail.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <code className="font-mono">{c}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hints" className="m-0 flex-1 overflow-auto p-5">
              <div className="flex flex-col gap-3">
                {detail.hints.slice(0, hintStep + 1).map((hint, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">{hint}</p>
                  </div>
                ))}
                {hintStep < detail.hints.length - 1 ? (
                  <Button variant="outline" size="sm" onClick={() => setHintStep((p) => p + 1)} className="self-start gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Reveal Next Hint
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground">All hints revealed. You&apos;ve got this! 💪</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right — editor + console */}
        <ResizablePanel defaultSize={55} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* Editor */}
            <ResizablePanel defaultSize={65} minSize={25}>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Code2 className="h-4 w-4 text-primary" /> Code
                  </div>
                  <div className="ml-auto">
                    <Select value={language} onValueChange={(v) => setLanguage(v as CodeLanguage)}>
                      <SelectTrigger className="h-7 w-[130px] border-border/60 bg-background/60 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex-1 overflow-auto bg-[#2d2d2d]">
                  <CodeEditor value={code} onValueChange={setCode} language={language} />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Console */}
            <ResizablePanel defaultSize={35} minSize={15}>
              <Tabs value={consoleTab} onValueChange={setConsoleTab} className="flex h-full flex-col">
                <div className="flex items-center border-b bg-muted/30 px-2">
                  <TabsList className="h-10 gap-0 rounded-none bg-transparent">
                    <TabsTrigger value="testcase" className="rounded-none border-b-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent">Testcase</TabsTrigger>
                    <TabsTrigger value="result" className="gap-1.5 rounded-none border-b-2 border-transparent text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent">
                      <Terminal className="h-3.5 w-3.5" /> Result
                      {output && <span className={`ml-1 h-1.5 w-1.5 rounded-full ${output.passed ? "bg-emerald-400" : "bg-rose-400"}`} />}
                    </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2 pr-2">
                    <Button variant="outline" size="sm" onClick={handleRun} disabled={running} className="h-7 gap-1.5 text-xs">
                      <Play className={`h-3.5 w-3.5 ${running ? "animate-pulse" : ""}`} /> Run
                    </Button>
                    <Button size="sm" onClick={handleSubmit} disabled={running} className="h-7 gap-1.5 text-xs">
                      <Upload className="h-3.5 w-3.5" /> Submit
                    </Button>
                  </div>
                </div>

                <TabsContent value="testcase" className="m-0 flex-1 overflow-auto p-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Default test case</p>
                  <div className="rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs text-foreground">
                    {detail.examples[0]?.input ?? "—"}
                  </div>
                </TabsContent>

                <TabsContent value="result" className="m-0 flex-1 overflow-auto p-4">
                  {output ? (
                    <div className="flex flex-col gap-3">
                      <div className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 ${output.passed ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600" : "border-rose-500/20 bg-rose-500/10 text-rose-600"}`}>
                        {output.passed ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span className="text-sm font-semibold">{output.passed ? "Accepted — all tests passed!" : "Some tests failed"}</span>
                      </div>
                      {output.results.map((r, i) => (
                        <div key={i} className={`rounded-lg border p-3 ${r.passed ? "border-emerald-500/20 bg-emerald-500/5" : "border-rose-500/20 bg-rose-500/5"}`}>
                          <div className="mb-2 flex items-center gap-2">
                            {r.passed ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <XCircle className="h-3.5 w-3.5 text-rose-500" />}
                            <span className="text-xs font-semibold text-foreground">Test Case {i + 1}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            {[["Input", r.input], ["Expected", r.expected], ["Got", r.actual]].map(([lbl, val]) => (
                              <div key={lbl}>
                                <p className="mb-0.5 font-medium text-muted-foreground">{lbl}</p>
                                <code className="break-all font-mono text-foreground">{val}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                      <Terminal className="h-7 w-7 text-muted-foreground/40" />
                      <p className="text-sm text-muted-foreground">Run or submit your code to see results</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
