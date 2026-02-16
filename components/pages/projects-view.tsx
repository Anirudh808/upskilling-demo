"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { projects as initialProjects } from "@/lib/data"
import { toast } from "sonner"
import { CheckCircle2, Circle, Clock, Loader2, Sparkles, Globe, FolderGit2, Star } from "lucide-react"

const statusIcon: Record<string, React.ReactNode> = {
  Complete: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />,
  "In Progress": <Clock className="h-4 w-4 text-[hsl(var(--warning))]" />,
  Pending: <Circle className="h-4 w-4 text-muted-foreground" />,
}

export function ProjectsView() {
  const [projectsData, setProjectsData] = useState(initialProjects)
  const [submittingMilestone, setSubmittingMilestone] = useState<string | null>(null)

  const handleAIReview = (projectId: string, milestoneId: string) => {
    setSubmittingMilestone(milestoneId)
    setTimeout(() => {
      setProjectsData((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                milestones: p.milestones.map((m) =>
                  m.id === milestoneId
                    ? { ...m, status: "Complete" as const, aiScore: Math.floor(Math.random() * 20) + 80, feedback: "Good implementation! Consider adding more error handling and input validation for edge cases." }
                    : m
                ),
              }
            : p
        )
      )
      setSubmittingMilestone(null)
      toast.success("AI review complete! Check the feedback below.")
    }, 1500)
  }

  const togglePublish = (projectId: string) => {
    setProjectsData((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, published: !p.published } : p))
    )
    const project = projectsData.find((p) => p.id === projectId)!
    toast.success(project.published ? "Removed from portfolio" : "Published to portfolio!")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Guided Projects</h1>
        <p className="text-sm text-muted-foreground">Build real-world projects with AI-powered code reviews</p>
      </div>

      {projectsData.map((project) => {
        const completedMilestones = project.milestones.filter((m) => m.status === "Complete").length
        const progressPercent = Math.round((completedMilestones / project.milestones.length) * 100)

        return (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FolderGit2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {project.aiReviewScore && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Star className="h-3 w-3" /> {project.aiReviewScore}/100
                    </Badge>
                  )}
                  <div className="flex items-center gap-2">
                    <Globe className={`h-4 w-4 ${project.published ? "text-[hsl(var(--success))]" : "text-muted-foreground"}`} />
                    <Switch checked={project.published} onCheckedChange={() => togglePublish(project.id)} />
                    <span className="text-xs text-muted-foreground">{project.published ? "Published" : "Private"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={progressPercent} className="flex-1" />
                <span className="text-sm font-medium text-foreground">{progressPercent}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {project.milestones.map((milestone, i) => (
                  <div key={milestone.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {statusIcon[milestone.status]}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {i + 1}. {milestone.title}
                          </p>
                          <Badge variant="secondary" className="mt-1 text-[10px]">{milestone.status}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {milestone.aiScore && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <Sparkles className="h-3 w-3" /> {milestone.aiScore}/100
                          </Badge>
                        )}
                        {(milestone.status === "In Progress" || milestone.status === "Pending") && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-xs"
                            disabled={submittingMilestone === milestone.id}
                            onClick={() => handleAIReview(project.id, milestone.id)}
                          >
                            {submittingMilestone === milestone.id
                              ? <><Loader2 className="h-3 w-3 animate-spin" /> Reviewing...</>
                              : <><Sparkles className="h-3 w-3" /> Submit for AI Review</>}
                          </Button>
                        )}
                      </div>
                    </div>
                    {milestone.feedback && (
                      <div className="mt-3 rounded-lg bg-primary/[0.04] p-3">
                        <p className="text-xs font-medium text-primary">AI Feedback</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/80">{milestone.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
