"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { problems, type Problem } from "@/lib/data"

const STORAGE_KEY = "tv_solved_problems"
// Seed from the problems already marked solved in the demo data.
const DEFAULT_SOLVED = problems.filter((p) => p.status === "Solved").map((p) => p.id)

interface PracticeContextType {
  solvedIds: string[]
  isSolved: (id: string) => boolean
  markSolved: (id: string) => void
  /** Effective status for a problem, factoring in the user's solved set. */
  statusOf: (problem: Problem) => Problem["status"]
}

const PracticeContext = createContext<PracticeContextType>({
  solvedIds: DEFAULT_SOLVED,
  isSolved: () => false,
  markSolved: () => {},
  statusOf: (p) => p.status,
})

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [solvedIds, setSolvedIds] = useState<string[]>(DEFAULT_SOLVED)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSolvedIds(JSON.parse(stored))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(solvedIds))
    } catch {
      /* ignore */
    }
  }, [solvedIds, hydrated])

  const isSolved = (id: string) => solvedIds.includes(id)
  const markSolved = (id: string) => setSolvedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  const statusOf = (p: Problem): Problem["status"] => (solvedIds.includes(p.id) ? "Solved" : p.status)

  return (
    <PracticeContext.Provider value={{ solvedIds, isSolved, markSolved, statusOf }}>
      {children}
    </PracticeContext.Provider>
  )
}

export function usePractice() {
  return useContext(PracticeContext)
}
