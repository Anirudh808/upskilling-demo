"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { problems } from "@/lib/data"
import { toast } from "sonner"
import { ArrowLeft, Play, Upload, Lightbulb, CheckCircle2, XCircle, Clock, ChevronRight, Circle } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

const problemDetails: Record<string, { description: string; examples: string[]; constraints: string[]; hints: string[] }> = {
  p1: {
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: ["Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] == 9", "Input: nums = [3,2,4], target = 6\nOutput: [1,2]"],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists"],
    hints: ["Try using a hash map to store seen values", "For each number, check if target - number exists in the map", "One pass through the array is sufficient"],
  },
}

const defaultDetails = {
  description: "Given the problem constraints, implement an efficient solution that handles all edge cases. Consider the time and space complexity of your approach.\n\nYour solution should handle empty inputs, single-element inputs, and large inputs efficiently.",
  examples: ["Input: [1, 2, 3]\nOutput: [expected result]\nExplanation: Process the input according to the problem rules"],
  constraints: ["Input size: 1 <= n <= 10^5", "Values within 32-bit integer range", "Solution must run in O(n) or O(n log n) time"],
  hints: ["Consider the brute force approach first", "Think about what data structure could help", "Can you reduce the time complexity with extra space?"],
}

const difficultyColor: Record<string, string> = {
  Easy: "text-[hsl(var(--success))]",
  Medium: "text-[hsl(var(--warning))]",
  Hard: "text-destructive",
}

export function PracticeView() {
  const [problemList, setProblemList] = useState(problems)
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [filterTag, setFilterTag] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [code, setCode] = useState(`function solve(nums, target) {\n  // Write your solution here\n  \n}`)
  const [language, setLanguage] = useState("javascript")
  const [showHints, setShowHints] = useState(false)
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
    const med = problemList.filter((p) => p.difficulty === "Medium")
    const hard = problemList.filter((p) => p.difficulty === "Hard")
    return [
      { label: "Easy", solved: easy.filter((p) => p.status === "Solved").length, total: easy.length, fill: "hsl(var(--success))" },
      { label: "Medium", solved: med.filter((p) => p.status === "Solved").length, total: med.length, fill: "hsl(var(--warning))" },
      { label: "Hard", solved: hard.filter((p) => p.status === "Solved").length, total: hard.length, fill: "hsl(var(--destructive))" },
    ]
  }, [problemList])

  const handleRun = () => {
    setRunning(true)
    setTimeout(() => {
      setOutput({
        passed: false,
        results: [
          { input: "[2,7,11,15], target=9", expected: "[0,1]", actual: "[0,1]", passed: true },
          { input: "[3,2,4], target=6", expected: "[1,2]", actual: "[1,2]", passed: true },
          { input: "[3,3], target=6", expected: "[0,1]", actual: "undefined", passed: false },
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
            { input: "[3,2,4], target=6", expected: "[1,2]", actual: "[1,2]", passed: true },
            { input: "[3,3], target=6", expected: "[0,1]", actual: "[0,1]", passed: true },
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
            { input: "[2,7,11,15], target=9", expected: "[0,1]", actual: "[0,1]", passed: true },
            { input: "Large input (n=10^4)", expected: "...", actual: "Time Limit Exceeded", passed: false },
          ],
        })
        toast.error("Some test cases failed. Try optimizing your solution.")
      }
      setRunning(false)
    }, 1500)
  }

  if (selectedProblem) {
    const problem = problemList.find((p) => p.id === selectedProblem)!
    const details = problemDetails[selectedProblem] || defaultDetails

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { setSelectedProblem(null); setOutput(null); setShowHints(false); setHintStep(0) }}>
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
          </Button>
          <h1 className="text-lg font-bold text-foreground">{problem.title}</h1>
          <Badge variant="outline" className={difficultyColor[problem.difficulty]}>{problem.difficulty}</Badge>
          {problem.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Problem statement */}
          <Card className="flex flex-col">
            <Tabs defaultValue="description" className="flex flex-1 flex-col">
              <TabsList className="mx-4 mt-4 w-fit">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="flex-1 px-4 pb-4">
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-foreground/80">{details.description}</p>
                  {details.examples.map((ex, i) => (
                    <div key={i} className="rounded-lg bg-muted/50 p-3">
                      <p className="mb-1 text-xs font-semibold text-muted-foreground">Example {i + 1}</p>
                      <pre className="whitespace-pre-wrap font-mono text-xs text-foreground">{ex}</pre>
                    </div>
                  ))}
                  <div>
                    <p className="mb-1 text-xs font-semibold text-muted-foreground">Constraints</p>
                    <ul className="flex flex-col gap-1">
                      {details.constraints.map((c, i) => (
                        <li key={i} className="text-xs text-foreground/70">{`• ${c}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hints" className="flex-1 px-4 pb-4">
                <div className="flex flex-col gap-3">
                  {details.hints.slice(0, hintStep + 1).map((hint, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--warning))]" />
                      <p className="text-sm text-foreground">{hint}</p>
                    </div>
                  ))}
                  {hintStep < details.hints.length - 1 && (
                    <Button variant="outline" size="sm" onClick={() => setHintStep((prev) => prev + 1)}>
                      Show Next Hint
                    </Button>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="output" className="flex-1 px-4 pb-4">
                {output ? (
                  <div className="flex flex-col gap-2">
                    <div className={`flex items-center gap-2 rounded-lg p-2 ${output.passed ? "bg-[hsl(var(--success))]/10" : "bg-destructive/10"}`}>
                      {output.passed ? <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" /> : <XCircle className="h-4 w-4 text-destructive" />}
                      <span className="text-sm font-medium text-foreground">{output.passed ? "All tests passed" : "Some tests failed"}</span>
                    </div>
                    {output.results.map((r, i) => (
                      <div key={i} className="rounded-lg border border-border p-2.5">
                        <div className="flex items-center gap-2">
                          {r.passed ? <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                          <span className="text-xs font-medium text-foreground">Test Case {i + 1}</span>
                        </div>
                        <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                          <div><span className="font-medium">Input:</span> {r.input}</div>
                          <div><span className="font-medium">Expected:</span> {r.expected}</div>
                          <div><span className="font-medium">Actual:</span> {r.actual}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Run or submit your code to see results.</p>
                )}
              </TabsContent>
            </Tabs>
          </Card>

          {/* Code editor */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Code Editor</CardTitle>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[130px] text-xs">
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
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] flex-1 font-mono text-sm"
                spellCheck={false}
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRun} disabled={running} className="gap-1.5">
                  <Play className="h-3.5 w-3.5" /> {running ? "Running..." : "Run"}
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={running} className="gap-1.5">
                  <Upload className="h-3.5 w-3.5" /> {running ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Practice</h1>
        <p className="text-sm text-muted-foreground">Sharpen your skills with coding problems</p>
      </div>

      {/* Analytics */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${difficultyColor[s.label]}`}>{s.label}</p>
                  <p className="text-2xl font-bold text-foreground">{s.solved}<span className="text-sm font-normal text-muted-foreground">/{s.total}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Avg Time</p>
                <p className="text-2xl font-bold text-foreground">18<span className="text-sm font-normal text-muted-foreground"> min</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="mb-3 text-sm font-medium text-foreground">Solved by Difficulty</p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={stats} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="label" width={60} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="solved" radius={[0, 4, 4, 0]}>
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
          <SelectTrigger className="w-[130px] text-sm"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterTag} onValueChange={setFilterTag}>
          <SelectTrigger className="w-[130px] text-sm"><SelectValue placeholder="Tag" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[130px] text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Solved">Solved</SelectItem>
            <SelectItem value="Attempted">Attempted</SelectItem>
            <SelectItem value="Unsolved">Unsolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Problems table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="hidden md:table-cell">Tags</TableHead>
              <TableHead className="hidden md:table-cell">Acceptance</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="cursor-pointer" onClick={() => setSelectedProblem(p.id)}>
                <TableCell>
                  {p.status === "Solved"
                    ? <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
                    : p.status === "Attempted"
                    ? <Clock className="h-4 w-4 text-[hsl(var(--warning))]" />
                    : <Circle className="h-4 w-4 text-muted-foreground" />}
                </TableCell>
                <TableCell className="font-medium text-foreground">{p.title}</TableCell>
                <TableCell><span className={`text-sm font-medium ${difficultyColor[p.difficulty]}`}>{p.difficulty}</span></TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">{p.tags.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}</div>
                </TableCell>
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">{p.acceptance}%</TableCell>
                <TableCell><ChevronRight className="h-4 w-4 text-muted-foreground" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
