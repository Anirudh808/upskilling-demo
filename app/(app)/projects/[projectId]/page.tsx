import { ProjectDetailView } from "@/components/pages/project-detail-view"

export default async function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  return <ProjectDetailView key={projectId} projectId={projectId} />
}
