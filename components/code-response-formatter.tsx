import type React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown from "react-markdown"

interface CodeResponseFormatterProps {
  response: string
}

export const CodeResponseFormatter: React.FC<CodeResponseFormatterProps> = ({ response }) => {
  const extractContent = (text: string): string => {
    try {
      // Attempt to parse as JSON
      const parsed = JSON.parse(text)
      return parsed.response || text
    } catch (error) {
      // If parsing fails, assume it's plain text
      return text
    }
  }

  const formatContent = (content: string) => {
    // Extract code block and language
    const codeBlockMatch = content.match(/```(\w+)?\n([\s\S]*?)```/)
    const language = codeBlockMatch ? codeBlockMatch[1] || "text" : "text"
    const codeBlock = codeBlockMatch ? codeBlockMatch[2].trim() : ""

    // Remove code block from content for further processing
    const textContent = content.replace(/```[\s\S]*?```/, "").trim()

    // Split content into introduction and explanation
    const [introduction, ...explanationParts] = textContent.split("\n\n")

    return (
      <div className="space-y-4">
        <ReactMarkdown>{introduction}</ReactMarkdown>

        {codeBlock && (
          <SyntaxHighlighter language={language} style={vscDarkPlus}>
            {codeBlock}
          </SyntaxHighlighter>
        )}

        <ReactMarkdown>{explanationParts.join("\n\n")}</ReactMarkdown>
      </div>
    )
  }

  try {
    const content = extractContent(response)
    return formatContent(content)
  } catch (error) {
    console.error("Error formatting response:", error)
    return (
      <div className="text-red-500">
        An error occurred while formatting the response. Please try again or contact support if the issue persists.
      </div>
    )
  }
}

