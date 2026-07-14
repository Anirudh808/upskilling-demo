import { ProblemView } from "@/components/pages/problem-view"
import { EngineeringProblemView } from "@/components/pages/engineering-problem-view"
import { getProblem } from "@/lib/data"

export default async function ProblemPage({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params
  const problem = getProblem(problemId)
  // Coding problems open the code editor; numerical/MCQ problems open the worked-answer view.
  if (problem && problem.type && problem.type !== "coding") {
    return <EngineeringProblemView key={problemId} problemId={problemId} />
  }
  return <ProblemView key={problemId} problemId={problemId} />
}
