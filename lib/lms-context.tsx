"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import coursesData from "@/data/courses.json"

export interface LMSCourse {
  id: string
  title: string
  isLMS: boolean
  outcomes?: string[]
  syllabus?: {
    module: string
    chapters: {
      title: string
      lessons: {
        title: string
        topics: { title: string; subtopics: { id: string; title: string }[] }[]
      }[]
    }[]
  }[]
  duration?: string
  metadata?: Record<string, string>
}

export interface EnrolledCourse extends LMSCourse {
  progress: number
}

export interface Certificate {
  id: string
  courseName: string
  issueDate: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  age: string
  userName?: string
  education: {
    school: string
    university: string
    cgpa: string
    completionYear: string
  }[]
  skills: string[]
  socialMedia: {
    linkedin?: string
    github?: string
    portfolio?: string
  }
  bio?: string
  preferredJobRole?: string
}

interface LMSContextType {
  courses: LMSCourse[]
  enrolledCourses: EnrolledCourse[]
  certificates: Certificate[]
  userProfile: UserProfile | null
  enrollCourse: (course: LMSCourse) => void
  addCertificate: (cert: Certificate) => void
  updateProfile: (profile: UserProfile) => void
}

const LMSContext = createContext<LMSContextType | undefined>(undefined)

export function LMSProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  
  // Real LMS Courses parsed from JSON (Deduplicated, picking the last one for newest drafts)
  const dedupedCourses = Array.from(
    new Map(coursesData.map((c: any) => [c.course.id, c])).values()
  )

  const initialLMSCourses: LMSCourse[] = dedupedCourses.map((c: any) => ({
    id: c.course.id,
    title: c.course.title,
    isLMS: true,
    duration: "Flexible", // JSON doesn't specify duration
    outcomes: [c.course.description],
    syllabus: (c.module || []).map((m: any) => ({
      module: m.title || "Untitled Module",
      chapters: (m.chapter || []).map((ch: any) => ({
        title: ch.title || "Untitled Chapter",
        lessons: (ch.lesson || []).map((l: any) => ({
          title: l.title || "Untitled Lesson",
          topics: (l.topic || []).map((t: any) => ({
            title: t.title || "Untitled Topic",
            subtopics: (t.subTopic || []).map((st: any) => ({ id: st.id || st.title, title: st.title }))
          }))
        }))
      }))
    }))
  }))

  // Generate 200 AI courses
  const initialAICourses: LMSCourse[] = Array.from({ length: 200 }, (_, i) => ({
    id: `ai-${i + 1}`,
    title: `AI Course Masterclass: Topic ${i + 1}`,
    isLMS: false,
    duration: "4 Weeks",
  }))

  const [courses] = useState<LMSCourse[]>([...initialLMSCourses, ...initialAICourses])
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    setIsClient(true)
    const storedEnrolled = localStorage.getItem("lms_enrolled")
    const storedCerts = localStorage.getItem("lms_certs")
    const storedProfile = localStorage.getItem("lms_profile")

    if (storedEnrolled) setEnrolledCourses(JSON.parse(storedEnrolled))
    if (storedCerts) setCertificates(JSON.parse(storedCerts))
    if (storedProfile) setUserProfile(JSON.parse(storedProfile))
  }, [])

  const enrollCourse = (course: LMSCourse) => {
    if (enrolledCourses.find(c => c.id === course.id)) return
    const newEnrolled = [...enrolledCourses, { ...course, progress: 0 }]
    setEnrolledCourses(newEnrolled)
    localStorage.setItem("lms_enrolled", JSON.stringify(newEnrolled))
  }

  const addCertificate = (cert: Certificate) => {
    const newCerts = [...certificates, cert]
    setCertificates(newCerts)
    localStorage.setItem("lms_certs", JSON.stringify(newCerts))
  }

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile)
    localStorage.setItem("lms_profile", JSON.stringify(profile))
  }

  if (!isClient) return <>{children}</> // Prevent hydration mismatch

  return (
    <LMSContext.Provider
      value={{
        courses,
        enrolledCourses,
        certificates,
        userProfile,
        enrollCourse,
        addCertificate,
        updateProfile
      }}
    >
      {children}
    </LMSContext.Provider>
  )
}

export function useLMS() {
  const context = useContext(LMSContext)
  if (!context) throw new Error("useLMS must be used within LMSProvider")
  return context
}
