import { CourseLearnView } from "@/components/pages/course-learn-view"

export default async function CourseLearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  return <CourseLearnView key={courseId} courseId={courseId} />
}
