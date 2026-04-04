"use client"

import { use, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLMS } from "@/lib/lms-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Lock, PlayCircle, Bot, Send, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react"

export default function LearningScreen({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter()
  const { courses } = useLMS()
  const { courseId } = use(params)
  const course = courses.find(c => c.id === courseId)

  const syllabus = course?.syllabus ?? []

  // Expand/collapse state — key format: "mod-0", "chap-0-0", "less-0-0-0", "top-0-0-0-0"
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["mod-0", "chap-0-0", "less-0-0-0", "top-0-0-0-0", "top-0-0-0-1"])
  )

  const toggle = (key: string) =>
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  const isOpen = (key: string) => expanded.has(key)

  // Active selection
  const [activeLesson, setActiveLesson] = useState("0-0-0")
  const [activeSubId, setActiveSubId] = useState<string | null>(null)

  // Pre-select first subtopic on load
  useEffect(() => {
    const firstSub = syllabus[0]?.chapters?.[0]?.lessons?.[0]?.topics?.[0]?.subtopics?.[0]
    if (firstSub) setActiveSubId(firstSub.id)
  }, [course])

  const [aMod, aChap, aLess] = activeLesson.split("-").map(Number)
  const mod    = syllabus[aMod]
  const chap   = mod?.chapters?.[aChap]
  const lesson = chap?.lessons?.[aLess]
  const activeSub = lesson?.topics?.flatMap(t => t.subtopics ?? []).find(s => s.id === activeSubId)
  const centerTitle = activeSub?.title ?? lesson?.title ?? null

  // AI Chat
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your AI Tutor. Ask me anything about this lesson." }
  ])
  const [chatInput, setChatInput] = useState("")
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const msg = chatInput
    setMessages(prev => [...prev, { role: "user", text: msg }])
    setChatInput("")
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "ai",
        text: `Good question about "${msg}" related to "${centerTitle}"! Let me explain this clearly with a practical example.`
      }])
    }, 900)
  }

  if (!course) return <div className="p-10 text-center text-muted-foreground">Course not found.</div>

  // ── Expand/Collapse Trigger helper ──────────────────────────────────────
  const Expander = ({
    nodeKey, label, enabled, active, onClick, depth
  }: {
    nodeKey: string
    label: string
    enabled: boolean
    active?: boolean
    onClick?: () => void
    depth: 0 | 1 | 2 | 3
  }) => {
    const open = isOpen(nodeKey)
    const textSize = depth === 0 ? "text-[11px] font-bold uppercase tracking-widest" : depth === 1 ? "text-[11px] font-semibold" : "text-[11px] font-medium"
    const paddingLeft = ["px-2", "px-1", "px-1", "px-1"][depth]

    return (
      <button
        disabled={!enabled && depth > 0}
        onClick={() => {
          toggle(nodeKey)
          onClick?.()
        }}
        className={`w-full flex items-center gap-1.5 ${paddingLeft} py-1.5 rounded-md transition-all text-left ${
          active
            ? "bg-primary text-primary-foreground"
            : enabled
            ? "hover:bg-muted/60 text-foreground cursor-pointer"
            : "text-muted-foreground/35 cursor-not-allowed"
        } ${depth === 0 ? "mb-1" : ""}`}
      >
        {/* Chevron */}
        <span className="shrink-0 text-xs">
          {open
            ? <ChevronDown className="w-3 h-3" />
            : <ChevronRight className="w-3 h-3" />}
        </span>

        {/* Icon */}
        {enabled
          ? <PlayCircle className={`shrink-0 ${depth === 0 ? "w-3.5 h-3.5 text-primary" : "w-3 h-3 opacity-60"}`} />
          : <Lock className="w-3 h-3 shrink-0 opacity-40" />}

        <span className={`truncate ${textSize}`}>{label}</span>
      </button>
    )
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] w-full border rounded-xl overflow-hidden bg-background shadow-sm animate-in fade-in duration-500">

      {/* ─── LEFT SIDEBAR ─── */}
      <div className="w-[280px] border-r flex flex-col bg-muted/10 shrink-0">
        <div className="p-3 border-b bg-muted/30 flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => router.push("/my-courses")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="flex-1 truncate font-bold text-sm" title={course.title}>{course.title}</span>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {syllabus.map((mod, mIdx) => {
              const modEnabled = mIdx === 0
              const modKey = `mod-${mIdx}`
              return (
                <div key={mIdx} className={!modEnabled ? "opacity-40 pointer-events-none mt-2" : "mt-0"}>

                  {/* MODULE — expandable */}
                  <Expander
                    nodeKey={modKey}
                    label={mod.module}
                    enabled={modEnabled}
                    depth={0}
                  />

                  {isOpen(modKey) && (
                    <div className="ml-3 border-l-2 border-primary/20 pl-2 space-y-1 mb-2">
                      {(mod.chapters ?? []).map((chap, cIdx) => {
                        const chapEnabled = modEnabled && cIdx === 0
                        const chapKey = `chap-${mIdx}-${cIdx}`
                        return (
                          <div key={cIdx}>
                            {/* CHAPTER — expandable */}
                            <Expander
                              nodeKey={chapKey}
                              label={chap.title}
                              enabled={chapEnabled}
                              depth={1}
                            />

                            {isOpen(chapKey) && (
                              <div className="ml-3 border-l border-muted/60 pl-2 space-y-1">
                                {(chap.lessons ?? []).map((less, lIdx) => {
                                  const lessEnabled = chapEnabled && lIdx === 0
                                  const lessKey = `less-${mIdx}-${cIdx}-${lIdx}`
                                  const navKey = `${mIdx}-${cIdx}-${lIdx}`
                                  const isLessActive = activeLesson === navKey

                                  return (
                                    <div key={lIdx}>
                                      {/* LESSON — expandable + selectable */}
                                      <Expander
                                        nodeKey={lessKey}
                                        label={less.title}
                                        enabled={lessEnabled}
                                        active={isLessActive && !activeSubId}
                                        depth={2}
                                        onClick={() => {
                                          if (lessEnabled) {
                                            setActiveLesson(navKey)
                                            const firstSub = less.topics?.[0]?.subtopics?.[0]
                                            if (firstSub) setActiveSubId(firstSub.id)
                                          }
                                        }}
                                      />

                                      {isOpen(lessKey) && lessEnabled && (
                                        <div className="ml-3 border-l border-muted/40 pl-2 space-y-1">
                                          {(less.topics ?? []).map((top, tIdx) => {
                                            const topKey = `top-${mIdx}-${cIdx}-${lIdx}-${tIdx}`
                                            const topEnabled = lessEnabled // all topics shown but only first topic's first 2 subs enabled

                                            return (
                                              <div key={tIdx}>
                                                {/* TOPIC — expandable */}
                                                <Expander
                                                  nodeKey={topKey}
                                                  label={top.title}
                                                  enabled={topEnabled}
                                                  depth={3}
                                                />

                                                {isOpen(topKey) && (
                                                  <div className="ml-3 border-l border-muted/30 pl-2 space-y-0.5 mb-1">
                                                    {(top.subtopics ?? []).map((sub, sIdx) => {
                                                      // Only first 2 subtopics of first topic are enabled
                                                      const subEnabled = tIdx === 0 && sIdx < 2
                                                      const isSubActive = activeSubId === sub.id
                                                      return (
                                                        <button
                                                          key={sub.id}
                                                          disabled={!subEnabled}
                                                          onClick={() => {
                                                            setActiveLesson(navKey)
                                                            setActiveSubId(sub.id)
                                                          }}
                                                          className={`w-full text-left text-[11px] px-2 py-1.5 rounded-md flex items-center gap-2 border transition-all ${
                                                            isSubActive
                                                              ? "bg-primary text-primary-foreground border-primary font-semibold shadow-sm"
                                                              : subEnabled
                                                              ? "hover:bg-primary/10 hover:border-primary/20 text-foreground border-transparent cursor-pointer"
                                                              : "text-muted-foreground/25 border-transparent cursor-not-allowed"
                                                          }`}
                                                        >
                                                          {subEnabled
                                                            ? <PlayCircle className="w-2.5 h-2.5 shrink-0" />
                                                            : <Lock className="w-2.5 h-2.5 shrink-0" />}
                                                          <span className="truncate">{sub.title}</span>
                                                        </button>
                                                      )
                                                    })}
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* ─── CENTER CONTENT ─── */}
      <div className="flex-1 flex flex-col bg-background">
        <ScrollArea className="flex-1 p-8">
          {centerTitle ? (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{mod?.module}</Badge>
                <Badge variant="outline">{chap?.title}</Badge>
                <Badge variant="secondary">{lesson?.title}</Badge>
              </div>
              <h1 className="text-3xl font-extrabold">{centerTitle}</h1>

              <div className="aspect-video bg-muted border rounded-xl flex flex-col items-center justify-center text-muted-foreground shadow-inner overflow-hidden">
                <PlayCircle className="w-16 h-16 opacity-20 mb-3" />
                <p className="text-sm font-medium">Video Content Player</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Welcome to <strong className="text-foreground">{centerTitle}</strong>. Explore the core concepts step by step.
              </p>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">Key Takeaways</h4>
                <ul className="space-y-1 text-sm list-inside list-disc">
                  <li>Master the core of <strong>{centerTitle}</strong>.</li>
                  <li>Apply concepts to real-world workflows.</li>
                  <li>Use the AI Tutor on the right for code examples.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Lock className="w-12 h-12 opacity-20" />
              <p>Select a lesson or subtopic from the sidebar to begin.</p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* ─── RIGHT AI TUTOR ─── */}
      <div className="w-[340px] border-l flex flex-col bg-muted/5 shrink-0">
        <div className="p-4 border-b flex items-center gap-2 bg-background font-semibold">
          <Bot className="w-5 h-5 text-primary" />
          AI Tutor
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none border"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </ScrollArea>
        <div className="p-3 border-t bg-background">
          <form onSubmit={handleSend} className="relative flex items-center">
            <Input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about this lesson..." className="pr-10" />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-1 w-8 h-8 hover:bg-transparent text-primary">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

    </div>
  )
}
