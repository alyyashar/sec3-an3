"use client"

import { BarChart3, Gift, Home, LayoutDashboard, Package, PieChart, Settings, ShoppingCart, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#161717]">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-8 bg-[#242424] border-r border-zinc-800">
        <div className="w-8 h-8 mb-8 rounded-full bg-gradient-to-r from-[#a178f1] to-[#4ee2b5]"></div>
        <nav className="flex flex-col items-center gap-6 mt-4">
          <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">
            <Home className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-800 text-white">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">
            <Package className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">
            <User className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white mt-auto">
            <PieChart className="w-5 h-5" />
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#161717]">
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Data Toys</h1>
              <p className="text-zinc-400">Visão Geral - Análise Comercial</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background_Dashboard_DataToys___Comunidade_Data_Driven__Community_-p2VwLCLD0FsUrwlEXhJgBRyO6Gmzqn.png"
                  alt="Building blocks"
                  width={150}
                  height={100}
                  className="absolute -top-10 -right-4"
                />
              </div>
            </div>
          </header>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
              <div className="h-1 bg-[#4ee2b5] w-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Receita</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-zinc-500">vs. meta</p>
                  <p className="text-xs text-zinc-500">vs. ano anterior</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#4ee2b5]/20 flex items-center justify-center">
                  <span className="text-[#4ee2b5] text-xl">$</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
              <div className="h-1 bg-[#a36bfd] w-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Pedidos</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-[#a36bfd]/20 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[#a36bfd]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242424] border-none rounded-xl overflow-hidden">
              <div className="h-1 bg-[#2ec9ff] w-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Itens Vendidos</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-[#2ec9ff]/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#2ec9ff]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#242424] border-none rounded-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white text-lg">Vendas ao longo do tempo</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="w-full h-full bg-[#242424] rounded-md flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">Gráfico de vendas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242424] border-none rounded-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Faça a análise do Ranking de Vendas por:</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="w-full h-full bg-[#242424] rounded-md flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">Ranking de vendas</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-[#242424] border-none rounded-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Representatividade Vendas</CardTitle>
                <p className="text-zinc-500 text-sm">Por categoria de produto</p>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="w-full h-full bg-[#242424] rounded-md flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">Gráfico de categorias</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242424] border-none rounded-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Atingimento de Meta</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="w-full h-full bg-[#242424] rounded-md flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">Gráfico de metas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242424] border-none rounded-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Localidades (UF e Região)</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="w-full h-full bg-[#242424] rounded-md flex items-center justify-center">
                  <p className="text-zinc-500 text-sm">Mapa de localidades</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

