"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { catalogProjects, getProjectSteps, type ProjectStatus } from "@/lib/data"

const STORAGE_KEY = "tv_project_steps"

// Seed a couple of projects so the catalogue shows all three statuses in the demo.
const seed = (id: string, count: number) => {
  const project = catalogProjects.find((p) => p.id === id)
  if (!project) return []
  return getProjectSteps(project).slice(0, count).map((s) => s.id)
}
const DEFAULT_DONE = [...seed("prj1", 3), ...seed("prj8", 7)]

export interface ProjectProgress {
  done: number
  total: number
  percent: number
  status: ProjectStatus
}

interface ProjectsContextType {
  completedSteps: string[]
  isStepDone: (id: string) => boolean
  toggleStep: (id: string) => void
  progressOf: (projectId: string) => ProjectProgress
}

const EMPTY: ProjectProgress = { done: 0, total: 0, percent: 0, status: "Not Started" }

const ProjectsContext = createContext<ProjectsContextType>({
  completedSteps: DEFAULT_DONE,
  isStepDone: () => false,
  toggleStep: () => {},
  progressOf: () => EMPTY,
})

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>(DEFAULT_DONE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setCompletedSteps(JSON.parse(stored))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps))
    } catch {
      /* ignore */
    }
  }, [completedSteps, hydrated])

  const isStepDone = (id: string) => completedSteps.includes(id)
  const toggleStep = (id: string) =>
    setCompletedSteps((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const progressOf = (projectId: string): ProjectProgress => {
    const project = catalogProjects.find((p) => p.id === projectId)
    if (!project) return EMPTY
    const steps = getProjectSteps(project)
    const done = steps.filter((s) => completedSteps.includes(s.id)).length
    const total = steps.length
    const percent = total ? Math.round((done / total) * 100) : 0
    const status: ProjectStatus = done === 0 ? "Not Started" : done === total ? "Completed" : "In Progress"
    return { done, total, percent, status }
  }

  return (
    <ProjectsContext.Provider value={{ completedSteps, isStepDone, toggleStep, progressOf }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectsContext)
}
