"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Construction, Sparkles } from "lucide-react"

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Construction className="h-7 w-7 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-lg font-semibold text-foreground">This section is coming soon</p>
            <p className="max-w-md text-sm text-muted-foreground">
              {title} is on the roadmap. The underlying data and workflows are being wired up next.
            </p>
          </div>
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="h-3 w-3" /> In development
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
