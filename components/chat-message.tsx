"use client"

import { motion } from "framer-motion"
import type { Message } from "@/types"
import { CodeResponseFormatter } from "./code-response-formatter"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
          message.sender === "user"
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-secondary text-secondary-foreground rounded-tl-none"
        }`}
      >
        {message.sender === "ai" ? <CodeResponseFormatter response={message.content} /> : message.content}
      </div>
    </motion.div>
  )
}

