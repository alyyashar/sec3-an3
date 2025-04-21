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

interface SecurityCopilotProps {
  auditId: string;
}

export function SecurityCopilot({ auditId }: SecurityCopilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your N3XUS Security Copilot. I can help you understand security vulnerabilities specific to your scanned contract. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendQuery() {
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg.content,
          audit_id: auditId,
        }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, aiMsg]);
    } catch (err) {
      console.error("Copilot error:", err);
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Error: Could not retrieve answer.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              <div className="flex items-center space-x-2 mb-1">
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4 text-primary" />}
                <span className="text-xs font-medium">{msg.role === "user" ? "You" : "N3XUS Copilot"}</span>
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className="text-xs mt-1 opacity-70">{msg.timestamp.toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-secondary">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
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
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                sendQuery();
              }
            }}
          />
          <Button onClick={sendQuery} disabled={isLoading || !inputValue.trim()}>
            {isLoading ? <Brain className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm"><Zap className="h-3 w-3 mr-1" />Explain Vulnerability</Button>
            <Button variant="outline" size="sm"><Zap className="h-3 w-3 mr-1" />Suggest Fix</Button>
          </div>
          <Button variant="link" size="sm" className="text-xs" onClick={() => setMessages([])}>Clear conversation</Button>
        </div>
      </div>
    </div>
  );
}
