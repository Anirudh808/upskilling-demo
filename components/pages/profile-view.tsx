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
import { currentUser, certificates, verifications, projects as projectsData } from "@/lib/data"
import { toast } from "sonner"
import { ShieldCheck, Award, Copy, Download, Sparkles, ExternalLink, FolderGit2, Globe, Star } from "lucide-react"

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

export function ProfileView() {
  const [certModal, setCertModal] = useState<string | null>(null)
  const publicUrl = "https://talentverify.ai/p/priya-sharma"

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
          <div className="grid gap-4 md:grid-cols-2">
            {projectsData.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <FolderGit2 className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  {project.published && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Globe className="h-3 w-3" /> Published
                    </Badge>
                  )}
                  {project.aiReviewScore && (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Star className="h-3 w-3" /> AI Score: {project.aiReviewScore}/100
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {project.milestones.filter((m) => m.status === "Complete").length}/{project.milestones.length} milestones
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
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

        <TabsContent value="resume" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Resume Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">ATS Optimized Resume</CardTitle>
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
                <div className="rounded-lg border border-border bg-card p-6">
                  {/* Two-column resume layout */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-1 flex flex-col gap-4 border-r border-border pr-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</p>
                        <p className="mt-1 text-xs text-foreground">{currentUser.email}</p>
                        <p className="text-xs text-foreground">Bangalore, India</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {resumeData.skills.map((s) => (
                            <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Certifications</p>
                        {resumeData.certifications.map((c, i) => (
                          <div key={i} className="mt-1.5">
                            <p className="text-[10px] font-medium text-foreground">{c.title}</p>
                            <p className="text-[10px] text-muted-foreground">{c.date} &middot; {c.score}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-4">
                      <div>
                        <p className="text-base font-bold text-foreground">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground">Computer Science &middot; Full Stack Developer</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Summary</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/80">{resumeData.summary}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Projects</p>
                        {resumeData.projects.map((p, i) => (
                          <div key={i} className="mt-2">
                            <p className="text-xs font-medium text-foreground">{p.title}</p>
                            <p className="text-[10px] leading-relaxed text-foreground/70">{p.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Generate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Resume Assistant</CardTitle>
                <CardDescription>Generate optimized content for your resume using AI.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  The AI assistant analyzes your learning progress, verified skills, projects, and interview performance to generate a tailored, ATS-optimized resume.
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
