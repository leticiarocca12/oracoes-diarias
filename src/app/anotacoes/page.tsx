'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Plus, Edit, Trash2, Save, X, BookOpen, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface Anotacao {
  id: string
  titulo: string
  conteudo: string
  versiculo?: string
  data_criacao: string
  data_atualizacao: string
}

export default function AnotacoesPage() {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [editando, setEditando] = useState(false)
  const [anotacaoAtual, setAnotacaoAtual] = useState<Partial<Anotacao>>({})
  const { toast } = useToast()

  useEffect(() => {
    carregarAnotacoes()
  }, [])

  const carregarAnotacoes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para ver suas anotações",
          variant: "destructive"
        })
        return
      }

      const { data, error } = await supabase
        .from('anotacoes')
        .select('*')
        .eq('user_id', user.id)
        .order('data_criacao', { ascending: false })

      if (error) throw error

      setAnotacoes(data || [])
    } catch (error: any) {
      console.error('Erro ao carregar anotações:', error)
      toast({
        title: "Erro",
        description: error.message || "Não foi possível carregar as anotações",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNovaAnotacao = () => {
    setAnotacaoAtual({})
    setEditando(false)
    setDialogAberto(true)
  }

  const handleEditarAnotacao = (anotacao: Anotacao) => {
    setAnotacaoAtual(anotacao)
    setEditando(true)
    setDialogAberto(true)
  }

  const handleSalvarAnotacao = async () => {
    try {
      if (!anotacaoAtual.titulo || !anotacaoAtual.conteudo) {
        toast({
          title: "Atenção",
          description: "Preencha o título e o conteúdo da anotação",
          variant: "destructive"
        })
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado",
          variant: "destructive"
        })
        return
      }

      if (editando && anotacaoAtual.id) {
        const { error } = await supabase
          .from('anotacoes')
          .update({
            titulo: anotacaoAtual.titulo,
            conteudo: anotacaoAtual.conteudo,
            versiculo: anotacaoAtual.versiculo,
            data_atualizacao: new Date().toISOString()
          })
          .eq('id', anotacaoAtual.id)

        if (error) throw error

        toast({
          title: "Sucesso!",
          description: "Anotação atualizada com sucesso"
        })
      } else {
        const { error } = await supabase
          .from('anotacoes')
          .insert({
            user_id: user.id,
            titulo: anotacaoAtual.titulo,
            conteudo: anotacaoAtual.conteudo,
            versiculo: anotacaoAtual.versiculo
          })

        if (error) throw error

        toast({
          title: "Sucesso!",
          description: "Anotação criada com sucesso"
        })
      }

      setDialogAberto(false)
      carregarAnotacoes()
    } catch (error: any) {
      console.error('Erro ao salvar anotação:', error)
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar a anotação",
        variant: "destructive"
      })
    }
  }

  const handleDeletarAnotacao = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta anotação?')) return

    try {
      const { error } = await supabase
        .from('anotacoes')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Sucesso!",
        description: "Anotação deletada com sucesso"
      })

      carregarAnotacoes()
    } catch (error: any) {
      console.error('Erro ao deletar anotação:', error)
      toast({
        title: "Erro",
        description: error.message || "Não foi possível deletar a anotação",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
          <p className="text-gray-600">Carregando anotações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
            <FileText className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Minhas Anotações</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Registre suas Reflexões
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Guarde seus insights e aprendizados espirituais
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-lg"
            onClick={handleNovaAnotacao}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Anotação
          </Button>
        </div>

        {/* Lista de Anotações */}
        {anotacoes.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-20 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Você ainda não tem anotações</p>
              <Button
                variant="outline"
                onClick={handleNovaAnotacao}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar primeira anotação
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anotacoes.map((anotacao) => (
              <Card
                key={anotacao.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all group bg-gradient-to-br from-white to-purple-50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                      {anotacao.titulo}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditarAnotacao(anotacao)}
                        className="hover:bg-purple-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletarAnotacao(anotacao.id)}
                        className="hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {anotacao.versiculo && (
                    <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full w-fit">
                      <BookOpen className="w-3 h-3" />
                      {anotacao.versiculo}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-4 mb-4">
                    {anotacao.conteudo}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(anotacao.data_criacao).toLocaleDateString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog de Criar/Editar */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editando ? 'Editar Anotação' : 'Nova Anotação'}
            </DialogTitle>
            <DialogDescription>
              {editando ? 'Atualize sua anotação' : 'Registre suas reflexões e insights espirituais'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Título *
              </label>
              <Input
                placeholder="Ex: Reflexão sobre João 3:16"
                value={anotacaoAtual.titulo || ''}
                onChange={(e) => setAnotacaoAtual({ ...anotacaoAtual, titulo: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Versículo (opcional)
              </label>
              <Input
                placeholder="Ex: João 3:16"
                value={anotacaoAtual.versiculo || ''}
                onChange={(e) => setAnotacaoAtual({ ...anotacaoAtual, versiculo: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Conteúdo *
              </label>
              <Textarea
                placeholder="Escreva suas reflexões, aprendizados e insights..."
                value={anotacaoAtual.conteudo || ''}
                onChange={(e) => setAnotacaoAtual({ ...anotacaoAtual, conteudo: e.target.value })}
                className="min-h-[200px] resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDialogAberto(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                onClick={handleSalvarAnotacao}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
