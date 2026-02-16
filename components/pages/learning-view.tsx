"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { courses } from "@/lib/data"
import { CheckCircle2, Circle, Send, Sparkles, BookOpen, Code, MessageSquare, Lightbulb } from "lucide-react"
import { toast } from "sonner"

const lessonContent: Record<string, { title: string; content: string; quiz: { question: string; options: string[]; answer: number } }> = {
  l1: {
    title: "How the Web Works",
    content: "The web operates on a client-server model. When you type a URL into your browser, it sends an HTTP request to a server, which processes the request and returns an HTTP response. The response typically contains HTML, CSS, and JavaScript that the browser renders into the page you see.\n\nKey concepts include DNS resolution (converting domain names to IP addresses), TCP/IP (the underlying communication protocol), and TLS/SSL (encryption for secure communications).\n\nModern web applications often use additional architectural patterns like microservices, CDNs for content delivery, and reverse proxies for load balancing.",
    quiz: { question: "What protocol is used to encrypt web communications?", options: ["FTP", "TLS/SSL", "UDP", "SMTP"], answer: 1 },
  },
  l4: {
    title: "Node.js Runtime & Event Loop",
    content: "Node.js is a JavaScript runtime built on Chrome's V8 engine. Unlike traditional server-side languages that use multi-threading, Node.js uses a single-threaded event loop architecture.\n\nThe event loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded. It offloads operations to the system kernel whenever possible and uses a callback queue to handle completed operations.\n\nPhases of the event loop: timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Understanding these phases is crucial for writing performant Node.js applications.",
    quiz: { question: "Node.js uses which architecture for handling concurrent requests?", options: ["Multi-threading", "Event loop", "Process forking", "Coroutines"], answer: 1 },
  },
  l5: {
    title: "Building REST APIs with Express",
    content: "Express.js is the most popular web framework for Node.js. It provides a minimal, flexible foundation for building REST APIs.\n\nTo build a REST API with Express:\n1. Set up routing with app.get(), app.post(), app.put(), app.delete()\n2. Parse request bodies with express.json() middleware\n3. Send responses with res.json(), res.status(), res.send()\n4. Organize routes using express.Router()\n\nBest practices include versioning your API (/api/v1/), using proper HTTP status codes, implementing consistent error responses, and validating input data.",
    quiz: { question: "Which Express method is used to define a route group?", options: ["express.group()", "express.Router()", "express.route()", "app.use()"], answer: 1 },
  },
  l6: {
    title: "Middleware & Error Handling",
    content: "Middleware functions in Express have access to the request object (req), response object (res), and the next middleware function (next). They can execute code, modify req/res, end the request-response cycle, or call the next middleware.\n\nCommon middleware patterns:\n- Authentication middleware that checks JWT tokens\n- Logging middleware for request tracking\n- CORS middleware for cross-origin requests\n- Rate limiting middleware to prevent abuse\n\nError handling middleware has four parameters (err, req, res, next) and should be defined after all other middleware and routes.",
    quiz: { question: "How many parameters does Express error-handling middleware have?", options: ["2", "3", "4", "5"], answer: 2 },
  },
}

const defaultLesson = {
  title: "Lesson Content",
  content: "This lesson covers important concepts in backend development. The full content would include detailed explanations, code examples, and practical exercises.\n\nKey topics include best practices, common patterns, and real-world applications of the concepts being taught.\n\nAfter completing this lesson, you will be able to apply these concepts in your own projects and understand how they fit into the broader backend development ecosystem.",
  quiz: { question: "Which of the following is a best practice in backend development?", options: ["Ignore error handling", "Use parameterized queries", "Store passwords in plain text", "Skip input validation"], answer: 1 },
}

export function LearningView() {
  const course = courses[0]
  const [modules, setModules] = useState(course.modules)
  const [selectedLesson, setSelectedLesson] = useState(course.modules[1].lessons[2].id)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your AI Tutor. Ask me anything about the current lesson or use the quick prompts below." },
  ])
  const [chatInput, setChatInput] = useState("")

  const lesson = lessonContent[selectedLesson] || defaultLesson
  const completedLessons = modules.flatMap((m) => m.lessons).filter((l) => l.completed).length
  const totalLessons = modules.flatMap((m) => m.lessons).length
  const progressPercent = Math.round((completedLessons / totalLessons) * 100)

  const handleMarkComplete = () => {
    setModules((prev) =>
      prev.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((l) => (l.id === selectedLesson ? { ...l, completed: true } : l)),
        completed: mod.lessons.every((l) => (l.id === selectedLesson ? true : l.completed)),
      }))
    )
    toast.success("Lesson marked as complete!")
  }

  const handleQuiz = (index: number) => {
    setQuizAnswer(index)
    if (index === lesson.quiz.answer) {
      toast.success("Correct answer!")
    } else {
      toast.error("Not quite. Try reviewing the material above.")
    }
  }

  const sendChat = (text: string) => {
    if (!text.trim()) return
    setChatMessages((prev) => [...prev, { role: "user", text }])
    setChatInput("")
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Ask a Question": `Great question! In the context of "${lesson.title}", the key concept to understand is how each component interacts with the request-response cycle. Think of it as a pipeline where each step can inspect, modify, or terminate the flow.`,
        "Get an Example": `Here's a practical example:\n\n\`\`\`javascript\napp.use((req, res, next) => {\n  console.log(\`\${req.method} \${req.url}\`);\n  next();\n});\n\`\`\`\n\nThis logs every incoming request before passing control to the next handler.`,
        "Explain in Simple Words": `Think of it like a factory assembly line. Each worker (middleware) on the line can check the product (request), make changes, send it back as defective (error), or pass it to the next worker. The last worker packages and ships it (sends the response).`,
        "Walk through Code": `Let me walk through the code step by step:\n\n1. First, the request enters the application\n2. It passes through each middleware in order\n3. Each middleware can read req/res objects\n4. Calling next() passes control forward\n5. If no middleware sends a response, Express returns 404`,
      }
      const response = responses[text] || `That's a great question about "${lesson.title}". The main takeaway is to understand the flow of data and how each component handles its responsibility. Practice implementing small examples to solidify your understanding.`
      setChatMessages((prev) => [...prev, { role: "ai", text: response }])
    }, 800)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Module</h1>
          <p className="text-sm text-muted-foreground">{course.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={progressPercent} className="w-32" />
          <span className="text-sm font-medium text-foreground">{progressPercent}%</span>
        </div>
      </div>

      {/* Adaptive difficulty banner */}
      <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] px-4 py-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm text-foreground">
          Difficulty adjusted to <strong>Intermediate</strong> based on your quiz accuracy (85%).
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Course outline */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" /> Outline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[540px]">
              {modules.map((mod) => (
                <div key={mod.id} className="border-b border-border last:border-0">
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    {mod.completed
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />
                      : <Circle className="h-3.5 w-3.5 text-muted-foreground" />}
                    <span className="text-xs font-semibold text-foreground">{mod.title}</span>
                  </div>
                  {mod.lessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => { setSelectedLesson(l.id); setQuizAnswer(null) }}
                      className={`flex w-full items-center gap-2 px-6 py-1.5 text-left text-xs transition-colors ${
                        selectedLesson === l.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {l.completed
                        ? <CheckCircle2 className="h-3 w-3 shrink-0 text-[hsl(var(--success))]" />
                        : <Circle className="h-3 w-3 shrink-0" />}
                      <span className="truncate">{l.title}</span>
                    </button>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Center: Lesson content */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <ScrollArea className="h-[300px]">
              <div className="prose prose-sm max-w-none text-foreground">
                {lesson.content.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-3 leading-relaxed text-sm text-foreground/80">{para}</p>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            {/* Inline Quiz */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-semibold text-foreground">Quick Check</p>
              <p className="mb-3 text-sm text-foreground">{lesson.quiz.question}</p>
              <div className="flex flex-col gap-2">
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
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleMarkComplete} className="gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Mark as Complete
            </Button>
          </CardContent>
        </Card>

        {/* Right: AI Tutor panel */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-primary" /> AI Tutor
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-0">
            <ScrollArea className="h-[380px] px-4">
              <div className="flex flex-col gap-3 py-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
              {["Ask a Question", "Get an Example", "Explain in Simple Words", "Walk through Code"].map((prompt) => (
                <Button key={prompt} variant="outline" size="sm" className="gap-1 text-xs" onClick={() => sendChat(prompt)}>
                  <Lightbulb className="h-3 w-3" /> {prompt}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-border px-4 py-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat(chatInput)}
                placeholder="Ask anything..."
                className="flex-1 rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
              <Button size="icon" onClick={() => sendChat(chatInput)}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
