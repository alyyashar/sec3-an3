import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, Trophy, Users } from "lucide-react"

export default function N3STPage() {
  return (
    <>
    <title>N3ST</title>
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">N3ST</h1>
        <p className="text-zinc-400">Red Team & Bug Bounty Hub</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bug className="w-5 h-5" />
              Active Bounties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">18</div>
            <p className="text-sm text-zinc-400">Open for submission</p>
          </CardContent>
        </Card>

        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Trophy className="w-5 h-5" />
              Total Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4ee2b5]">$50K</div>
            <p className="text-sm text-zinc-400">Available in $AN3</p>
          </CardContent>
        </Card>

        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2ec9ff]">2.4K</div>
            <p className="text-sm text-zinc-400">Active researchers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="text-white">Latest Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Recent vulnerability reports will appear here</div>
          </CardContent>
        </Card>

        <Card className="bg-[#242424] border-none rounded-xl">
          <CardHeader>
            <CardTitle className="text-white">Active Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-400">Ongoing red team challenges will appear here</div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}

