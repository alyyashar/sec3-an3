"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Send, User, Zap } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function SecurityCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your N3XUS Security Copilot. I can help you understand security vulnerabilities, suggest fixes, and answer questions about smart contract security. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(inputValue),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, responseMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateResponse = (query: string): string => {
    if (query.toLowerCase().includes("reentrancy")) {
      return "Reentrancy vulnerabilities occur when external contract calls are allowed to make new calls to the calling contract before the first execution is complete. To fix this:\n\n1. Use the Checks-Effects-Interactions pattern\n2. Implement a reentrancy guard\n3. Update state variables before making external calls\n\nWould you like me to show you an example of a reentrancy guard implementation?"
    } else if (query.toLowerCase().includes("overflow") || query.toLowerCase().includes("underflow")) {
      return "Integer overflow/underflow vulnerabilities have been largely mitigated in Solidity 0.8.0+ which includes built-in overflow checking. For earlier versions, use SafeMath library to perform arithmetic operations. Always validate inputs and consider the maximum possible values your variables might reach."
    } else {
      return "I can help you understand and fix various smart contract vulnerabilities. You can ask me about specific issues like reentrancy, integer overflow/underflow, access control problems, or any other security concerns you have with your contract."
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.role === "user" ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4 text-primary" />}
                <span className="text-xs font-medium">{message.role === "user" ? "You" : "N3XUS Copilot"}</span>
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-secondary">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about security vulnerabilities..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Zap className="h-3 w-3 mr-1" />
              Explain Vulnerability
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="h-3 w-3 mr-1" />
              Suggest Fix
            </Button>
          </div>
          <Button variant="link" size="sm" className="text-xs">
            Clear conversation
          </Button>
        </div>
      </div>
    </div>
  )
}

