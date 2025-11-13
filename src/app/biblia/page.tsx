'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Search, ChevronRight, Info } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const livrosBiblia = [
  { nome: 'Gênesis', capitulos: 50, testamento: 'Antigo' },
  { nome: 'Êxodo', capitulos: 40, testamento: 'Antigo' },
  { nome: 'Levítico', capitulos: 27, testamento: 'Antigo' },
  { nome: 'Números', capitulos: 36, testamento: 'Antigo' },
  { nome: 'Deuteronômio', capitulos: 34, testamento: 'Antigo' },
  { nome: 'Mateus', capitulos: 28, testamento: 'Novo' },
  { nome: 'Marcos', capitulos: 16, testamento: 'Novo' },
  { nome: 'Lucas', capitulos: 24, testamento: 'Novo' },
  { nome: 'João', capitulos: 21, testamento: 'Novo' },
  { nome: 'Atos', capitulos: 28, testamento: 'Novo' },
  { nome: 'Romanos', capitulos: 16, testamento: 'Novo' },
  { nome: 'Salmos', capitulos: 150, testamento: 'Antigo' },
  { nome: 'Provérbios', capitulos: 31, testamento: 'Antigo' },
]

const versiculosExemplo = {
  'João': {
    3: [
      { numero: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', explicacao: 'Este é um dos versículos mais conhecidos da Bíblia. Ele resume o evangelho: o amor de Deus pela humanidade é tão grande que Ele enviou Jesus para nos salvar. A fé em Cristo é o caminho para a vida eterna.' },
      { numero: 17, texto: 'Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.', explicacao: 'Jesus não veio para julgar, mas para salvar. Sua missão era trazer redenção e esperança para toda a humanidade.' }
    ]
  },
  'Salmos': {
    23: [
      { numero: 1, texto: 'O Senhor é o meu pastor; nada me faltará.', explicacao: 'Davi expressa confiança total em Deus como seu guia e provedor. Como um pastor cuida de suas ovelhas, Deus cuida de nós com amor e atenção.' },
      { numero: 4, texto: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.', explicacao: 'Mesmo nos momentos mais difíceis, Deus está presente. Sua proteção e orientação nos trazem paz e segurança.' }
    ]
  }
}

export default function BibliaPage() {
  const [busca, setBusca] = useState('')
  const [livroSelecionado, setLivroSelecionado] = useState<string | null>(null)
  const [capituloSelecionado, setCapituloSelecionado] = useState<number | null>(null)
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<any>(null)
  const [dialogAberto, setDialogAberto] = useState(false)

  const livrosFiltrados = livrosBiblia.filter(livro =>
    livro.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const handleLivroClick = (livro: string) => {
    setLivroSelecionado(livro)
    setCapituloSelecionado(null)
  }

  const handleCapituloClick = (capitulo: number) => {
    setCapituloSelecionado(capitulo)
  }

  const handleVersiculoClick = (versiculo: any) => {
    setVersiculoSelecionado(versiculo)
    setDialogAberto(true)
  }

  const livroAtual = livrosBiblia.find(l => l.nome === livroSelecionado)
  const versiculosDoCapitulo = livroSelecionado && capituloSelecionado && versiculosExemplo[livroSelecionado as keyof typeof versiculosExemplo]?.[capituloSelecionado]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Bíblia Sagrada</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Explore a Palavra de Deus
          </h1>
          <p className="text-gray-600 text-lg">
            Leia, estude e compreenda as Escrituras Sagradas
          </p>
        </div>

        {/* Busca */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar livro da Bíblia..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Livros */}
          <Card className="border-0 shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Livros da Bíblia
              </CardTitle>
              <CardDescription>Selecione um livro para começar</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto">
              <div className="space-y-2">
                {livrosFiltrados.map((livro, index) => (
                  <Button
                    key={index}
                    variant={livroSelecionado === livro.nome ? "default" : "ghost"}
                    className={`w-full justify-between ${livroSelecionado === livro.nome ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`}
                    onClick={() => handleLivroClick(livro.nome)}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${livro.testamento === 'Antigo' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {livro.testamento}
                      </span>
                      {livro.nome}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capítulos e Versículos */}
          <div className="lg:col-span-2 space-y-6">
            {!livroSelecionado ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-20 text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Selecione um livro para começar a leitura</p>
                </CardContent>
              </Card>
            ) : !capituloSelecionado ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Capítulos de {livroSelecionado}</CardTitle>
                  <CardDescription>Escolha um capítulo para ler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {Array.from({ length: livroAtual?.capitulos || 0 }, (_, i) => i + 1).map((cap) => (
                      <Button
                        key={cap}
                        variant="outline"
                        className="h-12 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all"
                        onClick={() => handleCapituloClick(cap)}
                      >
                        {cap}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{livroSelecionado} {capituloSelecionado}</CardTitle>
                      <CardDescription>Clique em um versículo para ver a explicação</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setCapituloSelecionado(null)}>
                      Voltar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {versiculosDoCapitulo ? (
                    <div className="space-y-4">
                      {versiculosDoCapitulo.map((versiculo, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-blue-200"
                          onClick={() => handleVersiculoClick(versiculo)}
                        >
                          <div className="flex gap-3">
                            <span className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                              {versiculo.numero}
                            </span>
                            <p className="text-gray-700 leading-relaxed flex-1">
                              {versiculo.texto}
                            </p>
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Versículos disponíveis em breve para este capítulo
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Experimente João 3 ou Salmos 23
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Dialog de Explicação */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {livroSelecionado} {capituloSelecionado}:{versiculoSelecionado?.numero}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed italic">
                "{versiculoSelecionado?.texto}"
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Explicação
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {versiculoSelecionado?.explicacao}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
