"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, User, Zap } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
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
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendQuery() {
    if (!inputValue.trim()) return;

    // Append user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call your backend endpoint for AI response
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const answer = data.answer || "Sorry, I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error fetching AI answer:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Error: Could not retrieve answer.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendQuery();
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      {/* Messages list */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? // OLD color scheme for user
                    "bg-primary text-primary-foreground"
                  : // OLD color scheme for assistant
                    "bg-secondary"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Brain className="h-4 w-4 text-primary" />
                )}
                <span className="text-xs font-medium">
                  {message.role === "user" ? "You" : "N3XUS Copilot"}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </div>
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

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about security vulnerabilities..."
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button onClick={sendQuery} disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <div className="animate-spin">
                <Brain className="h-4 w-4" />
              </div>
            ) : (
              <Send className="h-4 w-4" />
            )}
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
          <Button
            variant="link"
            size="sm"
            className="text-xs"
            onClick={() => setMessages([])}
          >
            Clear conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
