"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { catalogCourses, type CatalogCourse } from "@/lib/data"

const STORAGE_KEY = "tv_enrolled_courses"
// Priya starts already enrolled in the flagship Backend course (has real content).
const DEFAULT_ENROLLED = ["c1"]

interface EnrollmentContextType {
  enrolledIds: string[]
  enrolledCourses: CatalogCourse[]
  isEnrolled: (id: string) => boolean
  enroll: (id: string) => void
  unenroll: (id: string) => void
  toggle: (id: string) => void
}

const EnrollmentContext = createContext<EnrollmentContextType>({
  enrolledIds: DEFAULT_ENROLLED,
  enrolledCourses: [],
  isEnrolled: () => false,
  enroll: () => {},
  unenroll: () => {},
  toggle: () => {},
})

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [enrolledIds, setEnrolledIds] = useState<string[]>(DEFAULT_ENROLLED)
  const [hydrated, setHydrated] = useState(false)

  // Load persisted enrollments on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setEnrolledIds(JSON.parse(stored))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  // Persist on change (after initial hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolledIds))
    } catch {
      /* ignore */
    }
  }, [enrolledIds, hydrated])

  const enroll = (id: string) => setEnrolledIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  const unenroll = (id: string) => setEnrolledIds((prev) => prev.filter((x) => x !== id))
  const toggle = (id: string) =>
    setEnrolledIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const isEnrolled = (id: string) => enrolledIds.includes(id)

  // Preserve enrollment order (most recent last)
  const enrolledCourses = enrolledIds
    .map((id) => catalogCourses.find((c) => c.id === id))
    .filter((c): c is CatalogCourse => Boolean(c))

  return (
    <EnrollmentContext.Provider value={{ enrolledIds, enrolledCourses, isEnrolled, enroll, unenroll, toggle }}>
      {children}
    </EnrollmentContext.Provider>
  )
}

export function useEnrollment() {
  return useContext(EnrollmentContext)
}
