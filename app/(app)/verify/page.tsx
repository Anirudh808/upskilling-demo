"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLMS } from "@/lib/lms-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy, Award } from "lucide-react"
import { certifications } from "@/lib/mock-certs"

export default function VerifyPage() {
  const router = useRouter()
  const { certificates } = useLMS()
  const [certPreview, setCertPreview] = useState<any>(null)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
        <p className="text-muted-foreground">Prove your skills across various domains and earn verified certificates.</p>
      </div>

      {certificates.length > 0 && (
        <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500"/> Earned Certificates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map(c => (
              <Card 
                key={c.id} 
                className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all bg-background"
                onClick={() => setCertPreview(c)}
              >
                <CardHeader className="py-4">
                  <CardTitle className="text-md flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary"/> {c.courseName}
                  </CardTitle>
                  <CardDescription className="text-xs">ID: {c.id}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map(cert => {
          const hasEarned = certificates.some(c => c.courseName === cert.title)
          return (
            <Card key={cert.id} className="relative overflow-hidden flex flex-col justify-between">
              {hasEarned && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PASSED</div>}
              <div>
                <CardHeader>
                  <CardTitle>{cert.title}</CardTitle>
                  <CardDescription>Verify your expertise.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Pass Percentage:</span> <span className="font-medium text-foreground">{cert.passPercentage}%</span></div>
                  <div className="flex justify-between"><span>Time Limit:</span> <span className="font-medium text-foreground">{Math.floor(cert.timeLimit/60)}m {cert.timeLimit%60}s</span></div>
                  <div className="flex justify-between"><span>Question Types:</span> <span className="font-medium text-foreground">MCQ, Logic, Code</span></div>
                </CardContent>
              </div>
              <CardFooter>
                <Button variant={hasEarned ? "outline" : "default"} className="w-full" onClick={() => router.push(`/verify/${cert.id}`)}>
                  {hasEarned ? "Retake Exam" : "Start Exam"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Certificate Preview Popup */}
      <Dialog open={!!certPreview} onOpenChange={(val) => !val && setCertPreview(null)}>
        <DialogContent className="max-w-3xl border-8 border-double border-muted">
          {certPreview && (
            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center text-yellow-500 mb-6"><Trophy className="w-24 h-24" /></div>
              <h2 className="text-5xl font-serif font-bold uppercase tracking-widest text-primary">Certificate of Completion</h2>
              <p className="text-xl text-muted-foreground italic">This officially verifies the successful accomplishment of</p>
              <h3 className="text-3xl font-bold">{certPreview.courseName}</h3>
              <p className="text-lg">Issued on: {new Date(certPreview.issueDate).toLocaleDateString()}</p>
              <div className="mt-8 pt-8 border-t border-muted-foreground/30 flex justify-between items-end">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Certificate ID</p>
                  <p className="font-mono text-sm font-semibold">{certPreview.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif italic font-bold">TalentVerify AI Inc.</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
