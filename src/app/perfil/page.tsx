"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Loader2, Mail, Calendar, Shield, Save } from "lucide-react"

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [nome, setNome] = useState("")
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (!session) {
        router.push('/login')
      } else {
        setNome(session.user.user_metadata?.name || "")
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

  const salvarPerfil = async () => {
    setSalvando(true)
    setMensagem("")

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: nome }
      })

      if (error) throw error

      setMensagem("Perfil atualizado com sucesso!")
      setTimeout(() => setMensagem(""), 3000)
    } catch (error: any) {
      setMensagem("Erro ao atualizar perfil: " + error.message)
    } finally {
      setSalvando(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Meu Perfil
          </h1>
          <p className="text-gray-600 text-lg">
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Mensagem de Feedback */}
        {mensagem && (
          <Card className={`p-4 ${mensagem.includes('sucesso') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-sm font-medium ${mensagem.includes('sucesso') ? 'text-green-800' : 'text-red-800'}`}>
              {mensagem}
            </p>
          </Card>
        )}

        {/* Card de Informações */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Informações da Conta</CardTitle>
            <CardDescription>
              Visualize e edite suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
              />
            </div>

            {/* Email (somente leitura) */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                value={user.email}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">
                O email não pode ser alterado
              </p>
            </div>

            {/* Data de Criação */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Membro desde
              </Label>
              <Input
                value={new Date(user.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* ID do Usuário */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                ID do Usuário
              </Label>
              <Input
                value={user.id}
                disabled
                className="bg-gray-100 cursor-not-allowed font-mono text-sm"
              />
            </div>

            {/* Botão Salvar */}
            <Button
              onClick={salvarPerfil}
              disabled={salvando || !nome.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {salvando ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Card de Estatísticas */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl">📊 Suas Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Devocionais Lidos</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-3xl font-bold text-indigo-600">
                {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('anotacoes') || '[]').length : 0}
              </p>
              <p className="text-sm text-gray-600">Anotações Criadas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
