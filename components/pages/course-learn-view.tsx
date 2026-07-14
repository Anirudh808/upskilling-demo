"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getCatalogCourse, getCourseContent, courseCategories, type CatalogCourse, type CourseLesson } from "@/lib/data"
import { CheckCircle2, Circle, Send, BookOpen, MessageSquare, Lightbulb, ArrowLeft, Clock, X, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { RichText } from "@/components/math"

export function CourseLearnView({ courseId }: { courseId: string }) {
  const course = getCatalogCourse(courseId)

  const modules = useMemo(() => (course ? getCourseContent(course) : []), [course])
  const allLessons = useMemo(() => modules.flatMap((m) => m.lessons), [modules])

  const initialCompletedCount = course ? Math.round((course.progress / 100) * allLessons.length) : 0
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(allLessons.slice(0, initialCompletedCount).map((l) => l.id))
  )
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    allLessons.find((l, i) => i >= initialCompletedCount)?.id ?? allLessons[0]?.id ?? ""
  )
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center">
        <BookOpen className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm font-medium text-foreground">Course not found</p>
        <Link href="/learning">
          <Button size="sm" variant="outline" className="gap-1.5"><ArrowLeft className="h-4 w-4" /> Back to My Learning</Button>
        </Link>
      </div>
    )
  }

  const category = courseCategories.find((c) => c.id === course.categoryId)
  const lesson = allLessons.find((l) => l.id === selectedLessonId) ?? allLessons[0]
  const progressPercent = allLessons.length ? Math.round((completed.size / allLessons.length) * 100) : 0

  const selectLesson = (id: string) => {
    setSelectedLessonId(id)
    setQuizAnswer(null)
  }

  const handleMarkComplete = () => {
    setCompleted((prev) => new Set(prev).add(selectedLessonId))
    toast.success("Lesson marked as complete!")
    const idx = allLessons.findIndex((l) => l.id === selectedLessonId)
    const next = allLessons[idx + 1]
    if (next) selectLesson(next.id)
  }

  const handleQuiz = (index: number) => {
    if (!lesson) return
    setQuizAnswer(index)
    if (index === lesson.quiz.answer) toast.success("Correct answer!")
    else toast.error("Not quite. Review the material above and try again.")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Link href="/learning" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> My Learning
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              {category && <Badge variant="secondary" className="text-[10px]">{category.name}</Badge>}
              <Badge variant="outline" className="text-[10px]">{course.level}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {allLessons.length} lessons</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
              <span>by {course.instructor}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-40">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Your progress</span>
                <span className="font-medium text-foreground">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: outline */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4" /> Course Content</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[540px]">
              {modules.map((mod) => {
                const modDone = mod.lessons.every((l) => completed.has(l.id))
                return (
                  <div key={mod.id} className="border-b border-border last:border-0">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      {modDone
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />
                        : <Circle className="h-3.5 w-3.5 text-muted-foreground" />}
                      <span className="text-xs font-semibold text-foreground">{mod.title}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground">
                        {mod.lessons.filter((l) => completed.has(l.id)).length}/{mod.lessons.length}
                      </span>
                    </div>
                    {mod.lessons.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => selectLesson(l.id)}
                        className={`flex w-full items-center gap-2 px-6 py-1.5 text-left text-xs transition-colors ${
                          selectedLessonId === l.id ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        {completed.has(l.id)
                          ? <CheckCircle2 className="h-3 w-3 shrink-0 text-[hsl(var(--success))]" />
                          : <Circle className="h-3 w-3 shrink-0" />}
                        <span className="truncate">{l.title}</span>
                      </button>
                    ))}
                  </div>
                )
              })}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right: lesson content */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle className="text-lg">{lesson?.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="max-w-none text-foreground">
              {lesson?.content.split("\n\n").map((para, i) => (
                <div key={i} className="mb-3 text-sm leading-relaxed text-foreground/80">
                  <RichText text={para} />
                </div>
              ))}
            </div>

            <Separator />

            {/* Inline Quiz */}
            {lesson && (
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-3 text-sm font-semibold text-foreground">Quick Check</p>
                <div className="mb-3 text-sm text-foreground"><RichText text={lesson.quiz.question} /></div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {lesson.quiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuiz(i)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        quizAnswer === i
                          ? i === lesson.quiz.answer
                            ? "border-[hsl(var(--success))] bg-[hsl(var(--success))]/10 text-foreground"
                            : "border-destructive bg-destructive/10 text-foreground"
                          : "border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <RichText text={opt} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleMarkComplete} disabled={completed.has(selectedLessonId)} className="w-fit gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> {completed.has(selectedLessonId) ? "Completed" : "Mark as Complete"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating AI Tutor */}
      <AiTutorWidget course={course} lesson={lesson} />
    </div>
  )
}

// ── Floating AI Tutor chat widget ─────────────────────────────────────────────
function AiTutorWidget({ course, lesson }: { course: CatalogCourse; lesson?: CourseLesson }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: `Hi! I'm your AI Tutor for ${course.title}. Ask me anything about the current lesson or use the quick prompts below.` },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Always keep the conversation scrolled to the bottom
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  const send = (text: string) => {
    if (!text.trim() || !lesson) return
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Ask a Question": `Great question! In "${lesson.title}", the key idea is how ${course.tags[0]} is applied step by step. Focus on the flow of data and how each concept builds on the previous one.`,
        "Get an Example": `Here's a simple way to think about "${lesson.title}":\n\nImagine you're building a small ${course.title.split(" ")[0]} project. You'd start with the basics, verify each piece works, then combine them — exactly the pattern this lesson teaches.`,
        "Explain in Simple Words": `In plain terms: ${lesson.title} is about getting comfortable with ${course.tags[0]}. Don't worry about memorizing — focus on understanding *why* each step matters.`,
        "Walk through Code": `Let's break it down:\n\n1. Set up the basic structure\n2. Implement the core logic for ${course.tags[0]}\n3. Test with a small example\n4. Refine and handle edge cases\n\nTake it one step at a time and it'll click.`,
      }
      const response = responses[text] || `That's a great question about "${lesson.title}". The main takeaway is to understand how ${course.tags.join(", ")} work together. Try a small hands-on example to solidify it.`
      setMessages((prev) => [...prev, { role: "ai", text: response }])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Tutor"
          style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem" }}
          className="z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: "2.5s" }} />
          <MessageSquare className="relative h-6 w-6" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--success))] text-[9px] font-bold text-white ring-2 ring-background">
            AI
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem" }}
          className="z-50 flex h-[520px] max-h-[calc(100vh-6rem)] w-[370px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-border bg-primary/[0.04] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">AI Tutor</p>
              <p className="line-clamp-1 text-[11px] text-muted-foreground">{course.title}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close AI Tutor"
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground"
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2.5">
            {["Ask a Question", "Get an Example", "Explain in Simple Words", "Walk through Code"].map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                <Lightbulb className="h-3 w-3" /> {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border px-3 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything..."
              className="flex-1 rounded-full border border-input bg-background px-3.5 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <Button size="icon" className="h-9 w-9 shrink-0 rounded-full" onClick={() => send(input)} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
