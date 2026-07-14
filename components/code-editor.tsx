"use client"

import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs"
// Grammar imports (order matters: clike → js/java, c → cpp)
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/themes/prism-tomorrow.css"
import type { CodeLanguage } from "@/lib/data"

const PRISM_LANG: Record<CodeLanguage, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
}

export function CodeEditor({
  value,
  onValueChange,
  language,
}: {
  value: string
  onValueChange: (code: string) => void
  language: CodeLanguage
}) {
  const prismLang = PRISM_LANG[language]
  return (
    <Editor
      value={value}
      onValueChange={onValueChange}
      highlight={(code) => highlight(code, languages[prismLang] ?? languages.javascript, prismLang)}
      padding={16}
      tabSize={2}
      insertSpaces
      textareaClassName="code-editor-textarea"
      className="min-h-full font-mono text-[13px] leading-6"
      style={{
        fontFamily: 'var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, monospace',
        color: "#ccc",
        outline: "none",
        minHeight: "100%",
      }}
    />
  )
}
