import katex from "katex"
import "katex/dist/katex.min.css"

/** Renders a single LaTeX expression with KaTeX (works in SSR — no DOM needed). */
export function Math({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    output: "html",
  })
  return display ? (
    <span className="my-3 block overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span className="inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

/**
 * Renders text that may contain LaTeX delimited by $$...$$ (block) or $...$ (inline).
 * Everything else is rendered as plain text.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  // Split while keeping the delimited math segments.
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$\n]+\$)/g)
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <Math key={i} display>{part.slice(2, -2).trim()}</Math>
        }
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return <Math key={i}>{part.slice(1, -1).trim()}</Math>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}
