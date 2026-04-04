"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useLMS } from "@/lib/lms-context"
import { certifications, Question } from "@/lib/mock-certs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Timer, ArrowLeft, Loader2, Target } from "lucide-react"
import { toast } from "sonner"

export default function ExamPage({ params }: { params: Promise<{ examId: string }> }) {
  const router = useRouter()
  const { addCertificate } = useLMS()
  const resolvedParams = use(params)
  
  const exam = certifications.find(c => c.id === resolvedParams.examId)
  
  const [timeLeft, setTimeLeft] = useState(exam?.timeLimit || 0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [examResult, setExamResult] = useState<{passed: boolean, score: number} | null>(null)
  
  useEffect(() => {
    if (!exam) return
    let timer: NodeJS.Timeout
    if (!examResult && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (!examResult && timeLeft <= 0) {
      handleSubmit()
      toast.error("Time is up! Exam auto-submitted.")
    }
    return () => clearTimeout(timer)
  }, [timeLeft, examResult, exam])

  if (!exam) return <div className="p-10 text-center">Exam not found.</div>

  const handleMultiSelect = (qId: string, optIdx: number, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[qId] || []
      if (checked) return { ...prev, [qId]: [...current, optIdx] }
      return { ...prev, [qId]: current.filter((x: number) => x !== optIdx) }
    })
  }

  const handleSubmit = () => {
    let correctCount = 0
    
    exam.questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === undefined) return
      
      if (q.type === "mcq" || q.type === "tf") {
        if (ans === q.correct) correctCount++
      } else if (q.type === "multi") {
        const correctArr = q.correct as number[]
        if (Array.isArray(ans) && ans.length === correctArr.length && correctArr.every(v => ans.includes(v))) {
          correctCount++
        }
      } else if (q.type === "fill") {
        if (String(ans).trim().toLowerCase() === String(q.correct).trim().toLowerCase()) correctCount++
      } else if (q.type === "code") {
        // Simplified code check (removing whitespace)
        const stripFn = (s: string) => s.replace(/\s+/g, '')
        if (stripFn(String(ans)) === stripFn(String(q.correct))) correctCount++
      }
    })

    const score = (correctCount / exam.questions.length) * 100
    const passed = score >= exam.passPercentage

    if (passed) {
      const newCertId = `CERT-${exam.id.toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`
      addCertificate({
        id: newCertId,
        courseName: exam.title,
        issueDate: new Date().toISOString()
      })
      toast.success("Congratulations! You passed the exam and earned a certificate.")
    } else {
      toast.error("You did not reach the passing score. Keep practicing!")
    }

    setExamResult({ passed, score })
  }

  if (examResult) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center mb-6">
           <Target className={`w-24 h-24 ${examResult.passed ? "text-green-500 animate-bounce" : "text-destructive"}`} />
        </div>
        <h1 className="text-4xl font-bold">{examResult.passed ? "Examination Passed!" : "Examination Failed"}</h1>
        <p className="text-xl text-muted-foreground">
          Your score: <strong className="text-foreground">{Math.round(examResult.score)}%</strong> (Required: {exam.passPercentage}%)
        </p>
        <div className="pt-8">
          <Button onClick={() => router.push("/verify")} size="lg">Go to Certifications</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/verify")}>
              <ArrowLeft className="w-5 h-5"/>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{exam.title}</h1>
          </div>
          <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="text-lg py-1 flex items-center gap-2">
            <Timer className="w-5 h-5"/>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Badge>
        </div>
        <Progress value={(timeLeft / exam.timeLimit) * 100} className="h-2" />
      </div>

      <div className="space-y-8 pt-4">
        {exam.questions.map((q, i) => (
          <div key={q.id} className="p-6 bg-card border rounded-xl shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="px-3 py-1">Question {i + 1}</Badge>
              <Badge>{q.type.toUpperCase()}</Badge>
            </div>
            <h3 className="text-lg font-medium">{q.q}</h3>
            
            <div className="pt-2">
              {(q.type === "mcq" || q.type === "tf") && q.options && (
                <RadioGroup 
                  value={answers[q.id]?.toString()} 
                  onValueChange={(val) => setAnswers(prev => ({...prev, [q.id]: parseInt(val)}))}
                  className="space-y-3"
                >
                  {q.options.map((opt, optIdx) => (
                    <div className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors" key={optIdx}>
                      <RadioGroupItem value={optIdx.toString()} id={`${q.id}-opt${optIdx}`} />
                      <Label htmlFor={`${q.id}-opt${optIdx}`} className="flex-1 cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {q.type === "multi" && q.options && (
                <div className="space-y-3">
                  {q.options.map((opt, optIdx) => (
                    <div className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors" key={optIdx}>
                      <Checkbox 
                        id={`${q.id}-opt${optIdx}`} 
                        checked={(answers[q.id] || []).includes(optIdx)}
                        onCheckedChange={(checked) => handleMultiSelect(q.id, optIdx, !!checked)}
                      />
                      <Label htmlFor={`${q.id}-opt${optIdx}`} className="flex-1 cursor-pointer">{opt}</Label>
                    </div>
                  ))}
                </div>
              )}

              {q.type === "fill" && (
                <div className="max-w-md">
                  <Input 
                    placeholder={q.placeholder || "Type your answer..."} 
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(prev => ({...prev, [q.id]: e.target.value}))}
                  />
                </div>
              )}

              {q.type === "code" && (
                <div>
                  <Textarea 
                    className="font-mono h-48 bg-muted/30 focus-visible:ring-1" 
                    placeholder={q.placeholder || "// your code"}
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(prev => ({...prev, [q.id]: e.target.value}))}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <Button size="lg" onClick={handleSubmit} className="w-full sm:w-auto px-10">
          Submit Assessment
        </Button>
      </div>
    </div>
  )
}
