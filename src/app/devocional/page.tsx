'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Calendar, Clock, Sparkles, ChevronRight, BookOpen } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const devocionais = [
  {
    id: 1,
    titulo: 'A Paz que Excede Todo Entendimento',
    data: new Date().toLocaleDateString('pt-BR'),
    tempo: '5 min',
    versiculo: 'Filipenses 4:6-7',
    versiculoTexto: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará o vosso coração e a vossa mente em Cristo Jesus.',
    reflexao: 'Em meio às tempestades da vida, Deus nos convida a depositar nossas ansiedades aos Seus pés. A paz que Ele oferece não depende das circunstâncias externas, mas da confiança em Sua soberania e amor. Quando entregamos nossas preocupações a Deus através da oração, Ele nos concede uma paz que vai além da nossa compreensão humana.',
    oracao: 'Senhor, hoje entrego a Ti todas as minhas ansiedades e preocupações. Ajuda-me a confiar plenamente em Teu cuidado e provisão. Que Tua paz, que excede todo entendimento, guarde meu coração e minha mente. Em nome de Jesus, amém.',
    categoria: 'Paz'
  },
  {
    id: 2,
    titulo: 'O Amor Incondicional de Deus',
    data: new Date(Date.now() - 86400000).toLocaleDateString('pt-BR'),
    tempo: '7 min',
    versiculo: 'Romanos 8:38-39',
    versiculoTexto: 'Porque eu estou bem certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as coisas do presente, nem do porvir, nem os poderes, nem a altura, nem a profundidade, nem qualquer outra criatura poderá separar-nos do amor de Deus, que está em Cristo Jesus, nosso Senhor.',
    reflexao: 'O amor de Deus por nós é inabalável e eterno. Não há nada que possamos fazer para perdê-lo, e não há circunstância que possa nos separar dele. Este amor foi demonstrado de forma suprema na cruz, onde Jesus deu Sua vida por nós. Hoje, descanse nesta verdade: você é profundamente amado por Deus.',
    oracao: 'Pai celestial, obrigado por Teu amor incondicional. Ajuda-me a compreender a profundidade deste amor e a viver à luz dele. Que eu possa compartilhar este amor com outros hoje. Em nome de Jesus, amém.',
    categoria: 'Amor'
  },
  {
    id: 3,
    titulo: 'Força na Fraqueza',
    data: new Date(Date.now() - 172800000).toLocaleDateString('pt-BR'),
    tempo: '6 min',
    versiculo: '2 Coríntios 12:9',
    versiculoTexto: 'Mas ele me disse: A minha graça te basta, porque o poder se aperfeiçoa na fraqueza. De boa vontade, pois, mais me gloriarei nas fraquezas, para que sobre mim repouse o poder de Cristo.',
    reflexao: 'Deus não nos chama para sermos perfeitos ou autossuficientes. Ele nos convida a reconhecer nossas limitações e depender completamente dEle. É justamente em nossos momentos de fraqueza que o poder de Deus se manifesta de forma mais evidente. Quando nos rendemos a Ele, Sua graça nos capacita a fazer o impossível.',
    oracao: 'Senhor, reconheço minhas fraquezas e limitações. Ajuda-me a depender de Ti em todas as coisas. Que Tua graça seja suficiente para mim e que Teu poder se manifeste através da minha vida. Amém.',
    categoria: 'Força'
  }
]

const oracoesDiarias = [
  {
    titulo: 'Oração da Manhã',
    texto: 'Senhor, obrigado por este novo dia. Que eu possa viver cada momento consciente de Tua presença. Guia meus passos, ilumina meu caminho e usa-me para Tua glória. Amém.'
  },
  {
    titulo: 'Oração pela Família',
    texto: 'Pai celestial, abençoa minha família. Protege cada membro, fortalece nossos laços e ajuda-nos a refletir Teu amor em nosso lar. Amém.'
  },
  {
    titulo: 'Oração de Gratidão',
    texto: 'Senhor, meu coração transborda de gratidão. Obrigado por Tua fidelidade, provisão e amor constante. Que eu nunca esqueça de Te agradecer. Amém.'
  },
  {
    titulo: 'Oração pela Sabedoria',
    texto: 'Deus de toda sabedoria, concede-me discernimento para tomar decisões sábias. Ajuda-me a buscar Tua vontade em todas as coisas. Amém.'
  }
]

export default function DevocionalPage() {
  const [devocionalSelecionado, setDevocionalSelecionado] = useState<any>(null)
  const [dialogAberto, setDialogAberto] = useState(false)

  const handleDevocionalClick = (devocional: any) => {
    setDevocionalSelecionado(devocional)
    setDialogAberto(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
            <Heart className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">Devocional Diário</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Fortaleça sua Fé
          </h1>
          <p className="text-gray-600 text-lg">
            Reflexões e orações para cada dia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Devocionais */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                  Devocionais Recentes
                </CardTitle>
                <CardDescription>Reflexões para fortalecer sua caminhada com Deus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {devocionais.map((devocional) => (
                  <div
                    key={devocional.id}
                    className="p-6 rounded-xl bg-gradient-to-br from-white to-pink-50 hover:shadow-lg transition-all cursor-pointer border border-pink-100 hover:border-pink-200 group"
                    onClick={() => handleDevocionalClick(devocional)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                          {devocional.titulo}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {devocional.data}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {devocional.tempo}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium">
                            {devocional.categoria}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-pink-600 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
                      <BookOpen className="w-4 h-4 text-pink-600" />
                      <span className="font-medium">{devocional.versiculo}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Orações Diárias */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Orações Diárias
                </CardTitle>
                <CardDescription>Modelos de oração para seu dia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {oracoesDiarias.map((oracao, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      {oracao.titulo}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {oracao.texto}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Card de Motivação */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white">
              <CardContent className="py-6">
                <Sparkles className="w-10 h-10 mb-3" />
                <h3 className="text-lg font-bold mb-2">Mantenha a Constância</h3>
                <p className="text-pink-100 text-sm leading-relaxed">
                  Dedique alguns minutos todos os dias para estar com Deus. Sua fé crescerá e você experimentará transformação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog de Devocional Completo */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl mb-4">
              {devocionalSelecionado?.titulo}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {devocionalSelecionado?.data}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {devocionalSelecionado?.tempo}
              </span>
              <span className="px-2 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium">
                {devocionalSelecionado?.categoria}
              </span>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Versículo */}
            <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-pink-600" />
                <h4 className="font-semibold text-lg text-gray-800">
                  {devocionalSelecionado?.versiculo}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "{devocionalSelecionado?.versiculoTexto}"
              </p>
            </div>

            {/* Reflexão */}
            <div>
              <h4 className="font-semibold text-xl mb-3 flex items-center gap-2 text-gray-800">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Reflexão
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {devocionalSelecionado?.reflexao}
              </p>
            </div>

            {/* Oração */}
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
              <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Oração
              </h4>
              <p className="leading-relaxed">
                {devocionalSelecionado?.oracao}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
