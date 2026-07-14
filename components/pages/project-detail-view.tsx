"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getCatalogProject, getProjectSteps, courseCategories, type ProjectStatus } from "@/lib/data"
import { useProjects } from "@/lib/projects-context"
import { RichText } from "@/components/math"
import { toast } from "sonner"
import {
  ArrowLeft, FolderGit2, Clock, ListChecks, CheckCircle2, Terminal,
  Rocket, Sparkles, Target,
} from "lucide-react"

const STATUS_BADGE: Record<ProjectStatus, string> = {
  "Not Started": "bg-muted text-muted-foreground border-border",
  "In Progress": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Completed": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
}

export function ProjectDetailView({ projectId }: { projectId: string }) {
  const project = getCatalogProject(projectId)
  const { isStepDone, toggleStep, progressOf } = useProjects()

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center">
        <FolderGit2 className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm font-medium text-foreground">Project not found</p>
        <Link href="/projects">
          <Button size="sm" variant="outline" className="gap-1.5"><ArrowLeft className="h-4 w-4" /> Back to Projects</Button>
        </Link>
      </div>
    )
  }

  const steps = getProjectSteps(project)
  const category = courseCategories.find((c) => c.id === project.categoryId)
  const { done, total, percent, status } = progressOf(project.id)

  const handleToggle = (stepId: string, stepTitle: string) => {
    const wasDone = isStepDone(stepId)
    toggleStep(stepId)
    if (!wasDone) {
      const nowDone = done + 1
      if (nowDone >= total) toast.success("🎉 Project complete! Add it to your portfolio.")
      else toast.success(`Step complete: ${stepTitle}`)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Link href="/projects" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Guided Projects
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              {category && <Badge variant="secondary" className="text-[10px]">{category.name}</Badge>}
              <Badge variant="outline" className="text-[10px]">{project.difficulty}</Badge>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[status]}`}>{status}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{project.description}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ListChecks className="h-3 w-3" /> {total} steps</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {project.duration}</span>
              <span className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{t}</span>
                ))}
              </span>
            </p>
          </div>
          <div className="w-full max-w-[200px]">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{done}/{total} · {percent}%</span>
            </div>
            <Progress value={percent} />
          </div>
        </div>
      </div>

      {/* Outcome banner */}
      <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/[0.04] px-4 py-3">
        <Target className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-foreground"><span className="font-medium">What you&apos;ll build:</span> {project.outcome}</p>
      </div>

      {/* Completed banner */}
      {status === "Completed" && (
        <div className="flex items-center gap-3 rounded-lg border border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/[0.06] px-4 py-3">
          <Rocket className="h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
          <div>
            <p className="text-sm font-semibold text-foreground">Project completed — nicely done!</p>
            <p className="text-xs text-muted-foreground">You&apos;ve finished every step. This project is ready for your portfolio.</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const stepDone = isStepDone(step.id)
          const isLast = i === steps.length - 1
          return (
            <li key={step.id} className="relative flex gap-4">
              {/* Number + connector */}
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                  stepDone
                    ? "border-[hsl(var(--success))] bg-[hsl(var(--success))] text-white"
                    : "border-border bg-card text-muted-foreground"
                }`}>
                  {stepDone ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>
                {!isLast && <div className={`w-0.5 flex-1 ${stepDone ? "bg-[hsl(var(--success))]/40" : "bg-border"}`} />}
              </div>

              {/* Content */}
              <div className={`mb-4 flex-1 rounded-xl border bg-card p-4 transition-colors ${stepDone ? "border-[hsl(var(--success))]/30" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}{i === 0 ? " · Setup" : isLast ? " · Ship" : ""}</p>
                    <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <Button
                    size="sm"
                    variant={stepDone ? "outline" : "default"}
                    className="shrink-0 gap-1.5 text-xs"
                    onClick={() => handleToggle(step.id, step.title)}
                  >
                    <CheckCircle2 className={`h-3.5 w-3.5 ${stepDone ? "text-[hsl(var(--success))]" : ""}`} />
                    {stepDone ? "Completed" : "Mark as Complete"}
                  </Button>
                </div>

                <div className="mt-2 text-sm leading-relaxed text-foreground/80"><RichText text={step.description} /></div>

                <ul className="mt-3 flex flex-col gap-1.5">
                  {step.details.map((d, di) => (
                    <li key={di} className="flex items-start gap-2 text-xs text-foreground/70">
                      <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary/60" />
                      <RichText text={d} />
                    </li>
                  ))}
                </ul>

                {step.command && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-[hsl(220,18%,10%)]">
                    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
                      <Terminal className="h-3 w-3 text-white/50" />
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">Terminal</span>
                    </div>
                    <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-[hsl(210,15%,85%)]">{step.command}</pre>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
