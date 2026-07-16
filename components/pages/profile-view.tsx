"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { currentUser, certificates, verifications, catalogProjects } from "@/lib/data"
import { useProjects } from "@/lib/projects-context"
import { toast } from "sonner"
import { ShieldCheck, Award, Copy, Download, Sparkles, ExternalLink, FolderGit2, ArrowRight } from "lucide-react"

const skillsMatrix = [
  { skill: "React", level: "Advanced", verified: true, score: 87 },
  { skill: "Node.js", level: "Intermediate", verified: false, score: null },
  { skill: "Python", level: "Intermediate", verified: false, score: null },
  { skill: "DSA", level: "Intermediate", verified: true, score: 92 },
  { skill: "SQL", level: "Basic", verified: false, score: null },
  { skill: "TypeScript", level: "Intermediate", verified: false, score: null },
  { skill: "Docker", level: "Beginner", verified: false, score: null },
]

const resumeData = {
  summary: "Motivated Computer Science student with strong foundations in full-stack web development. Experienced with React, Node.js, Python, and SQL. Passionate about building scalable applications and continuously improving through verified skill assessments.",
  skills: ["React", "Node.js", "Python", "SQL", "TypeScript", "Express.js", "PostgreSQL", "Git"],
  projects: [
    { title: "E-commerce REST API", desc: "Full-stack REST API with JWT auth, product CRUD, and Stripe integration. AI Review Score: 88/100" },
    { title: "Real-time Chat Application", desc: "WebSocket-based chat app with rooms and message persistence. In progress." },
  ],
  certifications: [
    { title: "React - Intermediate Verification", date: "Jan 2026", score: "87%" },
    { title: "DSA - Basic Verification", date: "Jan 2026", score: "92%" },
  ],
}

const TITLE = "Full Stack Developer"
const LOCATION = "Bangalore, India"

type ResumeTemplateId = "modern" | "classic" | "minimal" | "creative"

const RESUME_TEMPLATES: { id: ResumeTemplateId; name: string; desc: string }[] = [
  { id: "modern",   name: "Modern",   desc: "Two-column with a sidebar" },
  { id: "classic",  name: "Classic",  desc: "Traditional single column" },
  { id: "minimal",  name: "Minimal",  desc: "Clean and spacious" },
  { id: "creative", name: "Creative", desc: "Bold colored header" },
]

// ── Small shared pieces ───────────────────────────────────────────────────────
function SkillPills({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {resumeData.skills.map((s) => (
        <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground">{s}</span>
      ))}
    </div>
  )
}
function ProjectsList() {
  return (
    <>
      {resumeData.projects.map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-xs font-medium text-foreground">{p.title}</p>
          <p className="text-[10px] leading-relaxed text-foreground/70">{p.desc}</p>
        </div>
      ))}
    </>
  )
}
function CertsList() {
  return (
    <>
      {resumeData.certifications.map((c, i) => (
        <div key={i} className="mt-1.5">
          <p className="text-[10px] font-medium text-foreground">{c.title}</p>
          <p className="text-[10px] text-muted-foreground">{c.date} &middot; {c.score}</p>
        </div>
      ))}
    </>
  )
}

// ── Template thumbnails (mini schematics) ─────────────────────────────────────
function TemplateThumb({ id }: { id: ResumeTemplateId }) {
  if (id === "modern") {
    return (
      <div className="flex h-full gap-1 p-1.5">
        <div className="flex w-1/3 flex-col gap-1 rounded bg-primary/15 p-1">
          <div className="h-1 w-full rounded-full bg-primary/50" />
          <div className="h-1 w-3/4 rounded-full bg-primary/30" />
          <div className="h-1 w-full rounded-full bg-primary/30" />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-1">
          <div className="h-1.5 w-2/3 rounded-full bg-foreground/40" />
          <div className="h-1 w-full rounded-full bg-foreground/15" />
          <div className="h-1 w-full rounded-full bg-foreground/15" />
          <div className="h-1 w-5/6 rounded-full bg-foreground/15" />
        </div>
      </div>
    )
  }
  if (id === "classic") {
    return (
      <div className="flex h-full flex-col items-center gap-1 p-1.5">
        <div className="h-1.5 w-1/2 rounded-full bg-foreground/40" />
        <div className="h-0.5 w-1/3 rounded-full bg-foreground/20" />
        <div className="my-0.5 h-px w-full bg-foreground/20" />
        <div className="h-1 w-full rounded-full bg-foreground/15" />
        <div className="h-1 w-full rounded-full bg-foreground/15" />
        <div className="h-1 w-4/5 rounded-full bg-foreground/15" />
      </div>
    )
  }
  if (id === "minimal") {
    return (
      <div className="flex h-full flex-col gap-1.5 p-2">
        <div className="h-2 w-1/2 rounded-full bg-foreground/40" />
        <div className="h-0.5 w-8 rounded-full bg-primary" />
        <div className="mt-1 h-1 w-full rounded-full bg-foreground/12" />
        <div className="h-1 w-full rounded-full bg-foreground/12" />
        <div className="h-1 w-2/3 rounded-full bg-foreground/12" />
      </div>
    )
  }
  // creative
  return (
    <div className="flex h-full flex-col p-1.5">
      <div className="flex flex-col gap-1 rounded-t bg-primary p-1.5">
        <div className="h-1.5 w-1/2 rounded-full bg-primary-foreground/80" />
        <div className="h-0.5 w-1/3 rounded-full bg-primary-foreground/50" />
      </div>
      <div className="flex flex-1 gap-1 rounded-b bg-muted/40 p-1">
        <div className="flex w-1/3 flex-col gap-1"><div className="h-1 w-full rounded-full bg-foreground/20" /><div className="h-1 w-3/4 rounded-full bg-foreground/15" /></div>
        <div className="flex flex-1 flex-col gap-1"><div className="h-1 w-full rounded-full bg-foreground/15" /><div className="h-1 w-full rounded-full bg-foreground/15" /></div>
      </div>
    </div>
  )
}

// ── Full resume templates ─────────────────────────────────────────────────────
function ModernTemplate() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 flex flex-col gap-4 rounded-lg bg-muted/40 p-4">
        <div>
          <p className="text-lg font-bold leading-tight text-foreground">{currentUser.name}</p>
          <p className="text-[11px] font-medium text-primary">{TITLE}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Contact</p>
          <p className="text-[11px] text-foreground/80">{currentUser.email}</p>
          <p className="text-[11px] text-foreground/80">{LOCATION}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Skills</p>
          <SkillPills />
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Certifications</p>
          <CertsList />
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Summary</p>
          <p className="text-xs leading-relaxed text-foreground/80">{resumeData.summary}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Projects</p>
          <ProjectsList />
        </div>
      </div>
    </div>
  )
}

function ClassicSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 border-b border-foreground/30 pb-1 text-[11px] font-bold uppercase tracking-widest text-foreground">{title}</p>
      {children}
    </div>
  )
}
function ClassicTemplate() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b-2 border-foreground pb-3 text-center">
        <p className="text-2xl font-bold tracking-wide text-foreground">{currentUser.name}</p>
        <p className="text-xs text-muted-foreground">{TITLE} &middot; Computer Science</p>
        <p className="text-[11px] text-muted-foreground">{currentUser.email} &middot; {LOCATION}</p>
      </div>
      <ClassicSection title="Summary">
        <p className="text-xs leading-relaxed text-foreground/80">{resumeData.summary}</p>
      </ClassicSection>
      <ClassicSection title="Skills">
        <p className="text-xs text-foreground/80">{resumeData.skills.join("  •  ")}</p>
      </ClassicSection>
      <ClassicSection title="Projects"><ProjectsList /></ClassicSection>
      <ClassicSection title="Certifications"><CertsList /></ClassicSection>
    </div>
  )
}

function MinimalLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{children}</p>
}
function MinimalTemplate() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-3xl font-light tracking-tight text-foreground">{currentUser.name}</p>
        <p className="text-sm text-muted-foreground">{TITLE}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{currentUser.email} &nbsp;·&nbsp; {LOCATION}</p>
        <div className="mt-3 h-0.5 w-12 bg-primary" />
      </div>
      <div>
        <MinimalLabel>Profile</MinimalLabel>
        <p className="text-xs leading-relaxed text-foreground/80">{resumeData.summary}</p>
      </div>
      <div>
        <MinimalLabel>Skills</MinimalLabel>
        <SkillPills />
      </div>
      <div>
        <MinimalLabel>Selected Projects</MinimalLabel>
        <ProjectsList />
      </div>
      <div>
        <MinimalLabel>Certifications</MinimalLabel>
        <CertsList />
      </div>
    </div>
  )
}

function CreativeTemplate() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="bg-primary px-6 py-5 text-primary-foreground">
        <p className="text-2xl font-bold">{currentUser.name}</p>
        <p className="text-sm opacity-90">{TITLE} &middot; Computer Science</p>
        <p className="mt-1 text-xs opacity-80">{currentUser.email} &middot; {LOCATION}</p>
      </div>
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="col-span-1 flex flex-col gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Skills</p>
            <SkillPills />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Certifications</p>
            <CertsList />
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Summary</p>
            <p className="text-xs leading-relaxed text-foreground/80">{resumeData.summary}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">Projects</p>
            <ProjectsList />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumePreview({ template }: { template: ResumeTemplateId }) {
  if (template === "classic") return <ClassicTemplate />
  if (template === "minimal") return <MinimalTemplate />
  if (template === "creative") return <CreativeTemplate />
  return <ModernTemplate />
}

export function ProfileView() {
  const { progressOf } = useProjects()
  const [certModal, setCertModal] = useState<string | null>(null)
  const [template, setTemplate] = useState<ResumeTemplateId>("modern")

  const startedProjects = catalogProjects
    .map((p) => ({ project: p, ...progressOf(p.id) }))
    .filter((p) => p.status !== "Not Started")
  const publicUrl = "https://skillbridge.ai/p/priya-sharma"

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl).catch(() => {})
    toast.success("Profile URL copied to clipboard!")
  }

  const handleExport = (format: string) => {
    toast.success(`Export queued as ${format} (demo)`)
  }

  const handleGenerate = () => {
    toast.success("Resume content generated with AI (demo)")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile & Resume</h1>
        <p className="text-sm text-muted-foreground">Manage your professional profile and resume</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="flex flex-col items-center gap-6 py-8 md:flex-row md:items-start md:px-8">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{currentUser.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.email} &middot; {currentUser.department}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {verifications.filter((v) => v.status === "Passed").map((v) => (
                <Badge key={v.id} className="gap-1 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
                  <ShieldCheck className="h-3 w-3" /> {v.skill} Verified
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
              <Input value={publicUrl} readOnly className="max-w-sm text-xs" />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">{currentUser.employabilityScore}</p>
            <p className="text-xs text-muted-foreground">Employability Score</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="skills">
        <TabsList>
          <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skillsMatrix.map((s) => (
                  <TableRow key={s.skill}>
                    <TableCell className="font-medium text-foreground">{s.skill}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{s.level}</Badge></TableCell>
                    <TableCell>
                      {s.verified
                        ? <Badge className="gap-1 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"><ShieldCheck className="h-3 w-3" /> Yes</Badge>
                        : <span className="text-xs text-muted-foreground">Not yet</span>}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">{s.score ? `${s.score}%` : "---"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          {startedProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {startedProjects.map(({ project, done, total, percent, status }) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="h-full transition-colors hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <FolderGit2 className="mt-1 h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{project.title}</CardTitle>
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${status === "Completed" ? "border-emerald-500/20 text-emerald-600" : "border-amber-500/20 text-amber-600"}`}
                            >
                              {status}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1">{project.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Progress value={percent} className="h-1.5 flex-1" />
                        <span className="text-xs font-medium text-muted-foreground">{done}/{total} steps</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
              <FolderGit2 className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">You haven&apos;t started any guided projects yet.</p>
              <Link href="/projects">
                <Button size="sm" className="gap-1.5">Browse Projects <ArrowRight className="h-3.5 w-3.5" /></Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="certificates" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-[hsl(var(--success))]/20">
                <CardContent className="flex items-start gap-4 pt-6">
                  <Award className="h-8 w-8 text-[hsl(var(--success))]" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{cert.skill} - {cert.tier}</p>
                    <p className="text-sm text-muted-foreground">Score: {cert.score}% &middot; {cert.issuedDate}</p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">{cert.authenticityId}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => setCertModal(cert.id)}>
                    <ShieldCheck className="h-3 w-3" /> Verify
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resume" className="mt-4 flex flex-col gap-6">
          {/* Template chooser */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Choose a Template</h2>
              <Badge variant="secondary" className="text-xs">{RESUME_TEMPLATES.length}</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {RESUME_TEMPLATES.map((t) => {
                const active = template === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`flex flex-col overflow-hidden rounded-xl border text-left transition-all ${
                      active ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="h-24 w-full border-b border-border bg-card">
                      <TemplateThumb id={t.id} />
                    </div>
                    <div className="flex items-center justify-between gap-2 p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-[11px] text-muted-foreground">{t.desc}</p>
                      </div>
                      {active && <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Selected template preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{RESUME_TEMPLATES.find((t) => t.id === template)?.name} Resume</CardTitle>
                    <CardDescription>ATS-optimized · live preview</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => handleExport("PDF")}>
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => handleExport("DOCX")}>
                      <Download className="h-3 w-3" /> DOCX
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                  <ResumePreview template={template} />
                </div>
              </CardContent>
            </Card>

            {/* AI Generate */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">AI Resume Assistant</CardTitle>
                <CardDescription>Generate optimized content for your resume using AI.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  The AI assistant analyzes your learning progress, verified skills, projects, and interview performance to generate a tailored, ATS-optimized resume — then drops it into the template you picked.
                </div>
                <Button onClick={handleGenerate} className="gap-1.5">
                  <Sparkles className="h-4 w-4" /> Generate with AI
                </Button>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Tips for a better resume:</p>
                  <ul className="mt-2 flex flex-col gap-1">
                    <li>Complete more skill verifications to add verified badges</li>
                    <li>Publish your guided projects to showcase real work</li>
                    <li>Complete mock interviews to demonstrate preparation</li>
                    <li>Keep your skills matrix up to date</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Certificate Verification Modal */}
      <Dialog open={!!certModal} onOpenChange={() => setCertModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Certificate Verification</DialogTitle>
            <DialogDescription>Blockchain-backed authenticity verification</DialogDescription>
          </DialogHeader>
          {certModal && (() => {
            const cert = certificates.find((c) => c.id === certModal)
            return cert ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/[0.03] p-4 text-center">
                  <ShieldCheck className="mx-auto h-8 w-8 text-[hsl(var(--success))]" />
                  <p className="mt-2 font-semibold text-foreground">Verified Authentic</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground">Holder</p><p className="font-medium text-foreground">{cert.holder}</p></div>
                  <div><p className="text-muted-foreground">Skill</p><p className="font-medium text-foreground">{cert.skill} ({cert.tier})</p></div>
                  <div><p className="text-muted-foreground">Score</p><p className="font-medium text-foreground">{cert.score}%</p></div>
                  <div><p className="text-muted-foreground">Issued</p><p className="font-medium text-foreground">{cert.issuedDate}</p></div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Authenticity ID</p>
                  <p className="font-mono text-xs text-foreground break-all">{cert.authenticityId}</p>
                </div>
              </div>
            ) : null
          })()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
