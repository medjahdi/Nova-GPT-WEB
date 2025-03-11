"use client"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatMessage } from "@/components/chat-message"
import { LoadingDots } from "@/components/loading-dots"
import { useChat } from "@/hooks/use-chat"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Home() {
  const { messages, input, setInput, handleSubmit, isLoading } = useChat()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background-100 transition-colors duration-300">
      <ErrorBoundary>
        {/* Header */}
        <motion.header
          className="py-6 px-4 sm:px-6 border-b border-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <motion.div className="flex items-center gap-2 text-foreground" whileHover={{ scale: 1.05 }}>
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Nova GPT</h1>
            </motion.div>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://medjahdi.github.io"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary hover:text-primary-hover text-sm"
              >
                Contact @medjahdi
              </motion.a>
              <ThemeToggle />
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6">
          {/* Welcome message when no messages */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                className="flex-1 flex flex-col items-center justify-center text-center p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Bot className="h-16 w-16 text-primary mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Welcome to Nova GPT</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Ask me anything and I'll provide intelligent, creative responses. Each conversation starts fresh.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["How does AI work?", "Tell me a joke", "Write a poem about stars"].map((suggestion) => (
                    <motion.button
                      key={suggestion}
                      className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-4 py-2 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          {messages.length > 0 && (
            <motion.div
              className="flex-1 overflow-y-auto py-4 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              <AnimatePresence>{isLoading && <LoadingDots />}</AnimatePresence>
            </motion.div>
          )}

          {/* Input form */}
          <motion.div
            className="mt-auto pt-4 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-input border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          className="py-4 px-4 sm:px-6 border-t border-border text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} @medjahdi. All rights reserved.</p>
            <motion.a
              href="https://medjahdi.github.io"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-primary hover:text-primary-hover"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.footer>
      </ErrorBoundary>
    </div>
  )
}

