'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Heart, FileText, Sparkles, Calendar, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ anotacoes: 0, diasConsecutivos: 7 })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (!session) {
        router.push('/login')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session) {
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  const versiculoDoDia = {
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    referencia: "João 3:16"
  }

  const features = [
    {
      icon: BookOpen,
      title: "Bíblia Completa",
      description: "Acesse todos os livros da Bíblia com explicações detalhadas",
      href: "/biblia",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Heart,
      title: "Devocional Diário",
      description: "Reflexões e orações para fortalecer sua fé todos os dias",
      href: "/devocional",
      gradient: "from-pink-600 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50"
    },
    {
      icon: FileText,
      title: "Minhas Anotações",
      description: "Registre suas reflexões e insights espirituais",
      href: "/anotacoes",
      gradient: "from-purple-600 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Bem-vindo de volta!</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Orações Diárias
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sua jornada espiritual começa aqui. Explore a Palavra, reflita e cresça na fé.
          </p>
        </div>

        {/* Versículo do Dia */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          <CardHeader className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <CardTitle className="text-xl">Versículo do Dia</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-lg sm:text-xl leading-relaxed mb-4 font-light">
              "{versiculoDoDia.texto}"
            </p>
            <p className="text-blue-100 font-semibold">— {versiculoDoDia.referencia}</p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Dias Consecutivos</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.diasConsecutivos}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Anotações</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.anotacoes}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tempo Hoje</p>
                  <p className="text-3xl font-bold text-pink-600">15min</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link key={index} href={feature.href}>
                <Card className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group h-full bg-gradient-to-br ${feature.bgGradient}`}>
                  <CardHeader>
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="ghost" 
                      className={`w-full bg-gradient-to-r ${feature.gradient} text-white hover:opacity-90 group-hover:shadow-lg transition-all`}
                    >
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 border-0 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardContent className="py-8 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Continue sua jornada espiritual</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Dedique alguns minutos hoje para fortalecer sua fé e conexão com Deus
            </p>
            <Link href="/devocional">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                Começar Devocional
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
