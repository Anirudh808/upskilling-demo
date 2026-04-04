"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlayCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

const practiceProblems = [
  { id: "p1", title: "Two Sum", difficulty: "Easy", type: "Problem Solving", description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", testcases: [ "Input: nums=[2,7,11,15], target=9. Output:[0,1]" ] },
  { id: "p2", title: "React Lifecycle Methods Quiz", difficulty: "Medium", type: "Quiz", description: "Describe the execution order of React lifecycle methods in class components.", testcases: [] }
]

export default function PracticePage() {
  const [code, setCode] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [completed, setCompleted] = useState<string[]>([])

  const handleSubmit = (id: string) => {
    setSubmitting(id)
    setTimeout(() => {
      setSubmitting(null)
      if (!completed.includes(id)) {
        setCompleted([...completed, id])
      }
      toast.success("Solution submitted successfully!")
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Arena</h1>
        <p className="text-muted-foreground">Hone your skills with problem-solving and quizzes.</p>
      </div>

      <div className="space-y-4">
        {practiceProblems.map((problem) => {
          const isCompleted = completed.includes(problem.id)
          return (
            <Card key={problem.id} className={isCompleted ? "border-green-500/50" : ""}>
              <CardHeader className="flex flex-row items-start justify-between bg-muted/20 py-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant={problem.difficulty === "Easy" ? "secondary" : "default"}>{problem.difficulty}</Badge>
                    <Badge variant="outline">{problem.type}</Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="py-4 space-y-4">
                <p className="text-sm">{problem.description}</p>
                {problem.testcases.length > 0 && (
                  <div className="bg-muted p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                    {problem.testcases.join("\n")}
                  </div>
                )}
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="solve" className="border-none">
                    <AccordionTrigger className="justify-start gap-2 hover:no-underline">
                      <Button variant={isCompleted ? "outline" : "default"} size="sm" asChild>
                        <span>
                          {isCompleted ? "Review Solution" : "Solve Problem"} <PlayCircle className="w-4 h-4 ml-1"/>
                        </span>
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground font-medium px-1">
                          <span>Write your solution below</span>
                        </div>
                        <Textarea 
                          className="font-mono h-40 focus-visible:ring-1 bg-background" 
                          placeholder={problem.type === "Problem Solving" ? "function solution() {\n  // your code here\n}" : "Write your explanation here..."}
                          value={code[problem.id] || ""}
                          onChange={(e) => setCode({ ...code, [problem.id]: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleSubmit(problem.id)} 
                          disabled={submitting === problem.id || !code[problem.id]?.trim()}
                        >
                          {submitting === problem.id ? "Evaluating..." : "Submit Solution"}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
