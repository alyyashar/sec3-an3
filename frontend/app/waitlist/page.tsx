"use client"

import type React from "react"

import { useState } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import An3Logo from "@/public/an3-logo.png"
import { joinWaitlist } from "@/api/backend-methods"

// Custom icons for social media
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [alreadyJoined, setAlreadyJoined] = useState(false)
  const [justJoined, setJustJoined] = useState(false)

  // Simulate backend check for already joined
  // Replace this with your real backend check
  // useEffect(() => { ... }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await joinWaitlist(email)
    } catch (err: any) {
      if (err?.response?.data?.detail === "Already Joined") {
        setAlreadyJoined(true)
        setJustJoined(false)
      } else {
        // Optionally handle other errors
        setJustJoined(true)
        setAlreadyJoined(false)
      }
    }
    setEmail("")
  }

  const products = [
    {
      name: "N3XUS",
      title: "AI-Enhanced Smart Contract Audit",
      available: false,
      href: "#",
      color: "#68E06F", // Green
    },
    {
      name: "N3RV",
      title: "Real-Time Threat Monitoring",
      available: false, // Changed to false as requested
      href: "/dashboard",
      color: "#A855F7", // Purple
    },
    {
      name: "N3ST",
      title: "Red Teaming & Bug Bounties",
      available: false,
      href: "#",
      color: "#3B82F6", // Blue
    },
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center w-[100vw] justify-center p-6 relative font-manrope">
      {/* AN3 Logo top left */}
      <a href="https://an3.io" rel="noopener noreferrer" className="fixed top-6 left-6 z-30 flex items-center group">
        <Image src={An3Logo} alt="AN3 Logo" width={120} height={60} className="h-16 w-auto transition-transform group-hover:scale-105" />
        <span className="sr-only">AN3 Home</span>
      </a>
      <div className="w-full max-w-7xl mx-auto relative mt-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-lg md:text-6xl font-bold mb-4 flex items-center justify-center">
            <span style={{ color: "#68E06F", fontFamily: "var(--font-rajdhani)" }}>
              N3
            </span>
            <span className="ml-2 text-white font-semibold" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Security Suite
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-manrope">
            AN3's full-stack cybersecurity suite built for securing Web3 from code to consensus.
          </p>
        </div>

        {/* Waitlist Section - Popup Style with Gradient Background */}
        <div className="flex justify-center z-20 mb-8">
          {/* Gradient Background */}
          <div
            className="absolute inset-0 rounded-2xl blur-lg opacity-20 scale-110"
            style={{
              background: `radial-gradient(ellipse at center, #68E06F 0%, rgba(104, 224, 111, 0.3) 40%, transparent 70%)`,
            }}
          />

          {/* Popup Card: show different card based on state */}
          {alreadyJoined ? (
            <div className="bg-black/90 backdrop-blur-xl border border-[#1F1F23] rounded-2xl p-8 max-w-2xl w-full mx-auto text-center shadow-2xl relative z-10">
              <div className="w-16 h-16 bg-[#68E06F] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">
                You're already on the waitlist!
              </h1>
              <p className="text-gray-400 mb-6">
                Thank you for your interest. We'll notify you when we launch.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://x.com/AN3_io"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/an3-io/"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
                <a
                  href="https://t.me/an3io"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
              </div>
            </div>
          ) : justJoined ? (
            <div className="bg-black/90 backdrop-blur-xl border border-[#1F1F23] rounded-2xl p-8 max-w-2xl w-full mx-auto text-center shadow-2xl relative z-10">
              <div className="w-16 h-16 bg-[#68E06F] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">
                Thank you for joining the waitlist!
              </h1>
              <p className="text-gray-400 mb-6">
                We're excited to have you on board. Stay tuned for updates.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://x.com/AN3_io"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/an3-io/"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
                <a
                  href="https://t.me/an3io"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
              </div>
            </div>
          ) : (
            // Default: Waitlist form
            <div className="bg-black/90 backdrop-blur-xl border border-[#1F1F23] rounded-2xl p-8 max-w-2xl w-full mx-auto text-center shadow-2xl relative z-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white font-manrope mb-2">
                  Get Early Access to the Future of Web3 Security
                </h3>
                <p className="text-sm text-gray-400">Secure your spot today.</p>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1F1F23] border-[#1F1F23] text-white placeholder-gray-500 focus:ring-[#68E06F]"
                  required
                />
                <Button
                  type="submit"
                  className="w-full text-black border-none shadow-md bg-[#68E06F] hover:bg-[#5bc75f] font-medium"
                >
                  Join Waitlist
                </Button>
              </form>
              <div className="mb-6">
                <p className="text-sm text-gray-400">
                  Join <span className="font-medium text-[#68E06F]">140+</span> others on the waitlist.
                </p>
              </div>
              {/* Social Icons */}
              <div className="flex justify-center space-x-4">
                <a
                  href="https://x.com/AN3_io"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/an3-io/"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
                <a
                  href="https://t.me/an3io"
                  className="p-2 bg-[#1F1F23] rounded-full hover:bg-[#68E06F]/20 transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="h-4 w-4 text-gray-400 hover:text-[#68E06F]" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Product Cards - Background Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className={`bg-black  rounded-lg p-8 relative shadow-sm transition-all duration-300 opacity-50 transform scale-110 hover:scale-125 hover:opacity-70 hover:shadow-xl`}
              style={{ borderColor: product.color }}
            >
              {/* Lock overlay for unavailable products */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                  <span className="text-sm text-gray-400 font-medium">Coming Soon</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-white font-rajdhani mb-6">
                  {product.name === "N3RV" ? (
                    <>
                      N<span style={{ color: "#A855F7" }}>3</span>RV
                    </>
                  ) : product.name === "N3XUS" ? (
                    <>
                      N<span style={{ color: "#68E06F" }}>3</span>XUS
                    </>
                  ) : (
                    <>
                      N<span style={{ color: "#3B82F6" }}>3</span>ST
                    </>
                  )}
                </h3>
                <h4 className="text-xl font-medium text-gray-300 mb-8">{product.title}</h4>

                <Button
                  disabled
                  className="w-full bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed py-3"
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-xs text-gray-500">© 2024 AN3. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
