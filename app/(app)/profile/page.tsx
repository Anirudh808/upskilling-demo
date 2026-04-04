"use client"

import { useState, useEffect, useRef } from "react"
import { useLMS, UserProfile } from "@/lib/lms-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Upload, X, Trophy } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { userProfile, updateProfile, certificates } = useLMS()
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    firstName: "", lastName: "", email: "", age: "", userName: "", bio: "", preferredJobRole: "",
    skills: [], education: [{ school: "", university: "", cgpa: "", completionYear: "" }],
    socialMedia: { linkedin: "", github: "", portfolio: "" }
  })
  const [skillInput, setSkillInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (userProfile) setProfile(userProfile)
  }, [userProfile])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!profile.firstName) newErrors.firstName = "First name is required"
    if (!profile.lastName) newErrors.lastName = "Last name is required"
    if (!profile.email) newErrors.email = "Email is required"
    if (!profile.age) newErrors.age = "Age is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields.")
      return
    }
    updateProfile(profile as UserProfile)
    toast.success("Profile saved successfully!")
  }

  const handleSkillAdd = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault()
      if (!profile.skills?.includes(skillInput.trim())) {
        setProfile(prev => ({ ...prev, skills: [...(prev.skills || []), skillInput.trim()] }))
      }
      setSkillInput("")
    }
  }

  const removeSkill = (sk: string) => {
    setProfile(prev => ({ ...prev, skills: prev.skills?.filter(s => s !== sk) }))
  }

  const updateEducation = (index: number, field: string, val: string) => {
    const newEd = [...(profile.education || [])]
    newEd[index] = { ...newEd[index], [field]: val }
    setProfile(prev => ({ ...prev, education: newEd }))
  }

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...(prev.education || []), { school: "", university: "", cgpa: "", completionYear: "" }]
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast.success(`Mock Upload: ${e.target.files[0].name} uploaded!`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile & Resume</h1>
          <p className="text-muted-foreground">Manage your personal information and track your achievements.</p>
        </div>
        <Button onClick={handleSave}>Save Profile</Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
             <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input value={profile.firstName} onChange={e => { setProfile({...profile, firstName: e.target.value}); setErrors(prev => ({ ...prev, firstName: "" })) }} />
                    {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input value={profile.lastName} onChange={e => { setProfile({...profile, lastName: e.target.value}); setErrors(prev => ({ ...prev, lastName: "" })) }} />
                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" value={profile.email} onChange={e => { setProfile({...profile, email: e.target.value}); setErrors(prev => ({ ...prev, email: "" })) }} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Age *</Label>
                    <Input type="number" value={profile.age} onChange={e => { setProfile({...profile, age: e.target.value}); setErrors(prev => ({ ...prev, age: "" })) }} />
                    {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
                  </div>
                  <div className="space-y-2"><Label>Username</Label><Input value={profile.userName} onChange={e => setProfile({...profile, userName: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Preferred Job Role</Label><Input value={profile.preferredJobRole} onChange={e => setProfile({...profile, preferredJobRole: e.target.value})} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Bio / About Me</Label>
                  <Textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Tell us about yourself..." />
                </div>
             </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Education</CardTitle>
              <Button variant="outline" size="sm" onClick={addEducation}><PlusCircle className="w-4 h-4 mr-2"/>Add</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.education?.map((ed, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 p-4 border rounded-md relative">
                  {profile.education!.length > 1 && (
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" 
                      onClick={() => setProfile({...profile, education: profile.education?.filter((_, idx) => idx !== i)})}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="space-y-2"><Label>School/College Name</Label><Input value={ed.school} onChange={e => updateEducation(i, "school", e.target.value)} /></div>
                  <div className="space-y-2"><Label>University</Label><Input value={ed.university} onChange={e => updateEducation(i, "university", e.target.value)} /></div>
                  <div className="space-y-2"><Label>CGPA / Percentage</Label><Input value={ed.cgpa} onChange={e => updateEducation(i, "cgpa", e.target.value)} /></div>
                  <div className="space-y-2"><Label>Completion Year</Label><Input value={ed.completionYear} onChange={e => updateEducation(i, "completionYear", e.target.value)} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Skills & Resume</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Skills (Press Enter)</Label>
                <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillAdd} placeholder="e.g. React, Node.js" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills?.map((sk, idx) => (
                    <Badge key={idx} variant="secondary" className="pl-3 py-1 flex items-center gap-1">
                      {sk} <button onClick={() => removeSkill(sk)} className="hover:text-destructive"><X className="w-3 h-3 hover:bg-muted-foreground/20 rounded-full" /></button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Resume (PDF)</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Click to upload resume</span>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label>Social Links</Label>
                <Input placeholder="LinkedIn URL" value={profile.socialMedia?.linkedin} onChange={e => setProfile({...profile, socialMedia: {...profile.socialMedia, linkedin: e.target.value}})} />
                <Input placeholder="GitHub URL" value={profile.socialMedia?.github} onChange={e => setProfile({...profile, socialMedia: {...profile.socialMedia, github: e.target.value}})} />
                <Input placeholder="Portfolio URL" value={profile.socialMedia?.portfolio} onChange={e => setProfile({...profile, socialMedia: {...profile.socialMedia, portfolio: e.target.value}})} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5"/> Earned Certificates</CardTitle></CardHeader>
            <CardContent>
              {certificates.length === 0 ? (
                <p className="text-sm text-muted-foreground">No certificates earned yet.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {certificates.map(c => (
                    <div key={c.id} className="text-sm font-medium p-2 bg-background border rounded flex items-center justify-between">
                      {c.courseName} <Badge variant="outline">Verified</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
