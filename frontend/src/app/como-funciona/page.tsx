"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Users,
  CheckCircle,
  Play,
  BarChart3,
  Eye,
  Download,
  Share2,
  Zap,
  Target,
  Layers,
} from "lucide-react";

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <div className="relative bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-white">Como Funciona</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Como Funciona a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Detecção
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Entenda o processo completo desde a coleta de dados dos detectores de ondas 
            gravitacionais até a identificação e classificação de interferências através 
            da colaboração entre IA e ciência cidadã.
          </p>
        </div>

        {/* Processo Principal */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Processo de Detecção
          </h3>
          
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center mb-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h4 className="text-2xl font-bold text-white">Coleta de Dados</h4>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Os detectores LIGO e Virgo capturam dados contínuos de ondas gravitacionais. 
                  Estes dados contêm tanto sinais científicos genuínos quanto interferências 
                  técnicas (glitches) que precisam ser identificadas e removidas.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Dados em tempo real dos detectores</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Múltiplos canais de informação</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Processamento contínuo 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                <Layers className="w-32 h-32 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-12">
            <ArrowRight className="w-8 h-8 text-blue-400" />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center mb-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h4 className="text-2xl font-bold text-white">Análise por IA</h4>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Algoritmos de inteligência artificial analisam os dados automaticamente, 
                  identificando padrões suspeitos que podem indicar glitches. O sistema 
                  usa redes neurais treinadas com milhões de exemplos.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span>Redes neurais convolucionais</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span>Classificação automática</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span>Aprendizado contínuo</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                <Brain className="w-32 h-32 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-12">
            <ArrowRight className="w-8 h-8 text-purple-400" />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center mb-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h4 className="text-2xl font-bold text-white">Validação Humana</h4>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cientistas cidadãos revisam as detecções da IA, validando ou corrigindo 
                  as classificações. Esta colaboração homem-máquina garante alta precisão 
                  e melhora continuamente o sistema.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span>Revisão por especialistas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span>Interface intuitiva</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span>Feedback para treinamento</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                <Users className="w-32 h-32 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Ferramentas Disponíveis */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Ferramentas da Plataforma
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <Eye className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">
                Visualizador de Espectrogramas
              </h4>
              <p className="text-gray-300 text-sm">
                Interface interativa para visualizar e analisar dados de ondas 
                gravitacionais em formato de espectrograma.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">
                Dashboard de Análise
              </h4>
              <p className="text-gray-300 text-sm">
                Painel completo com estatísticas, métricas de performance e 
                histórico de detecções em tempo real.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <Target className="w-8 h-8 text-green-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">
                Sistema de Classificação
              </h4>
              <p className="text-gray-300 text-sm">
                Ferramentas para classificar diferentes tipos de glitches e 
                contribuir para o treinamento da IA.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <Share2 className="w-8 h-8 text-yellow-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">
                Colaboração
              </h4>
              <p className="text-gray-300 text-sm">
                Recursos para colaborar com outros cientistas cidadãos e 
                compartilhar descobertas.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <Download className="w-8 h-8 text-red-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">
                Relatórios
              </h4>
              <p className="text-gray-300 text-sm">
                Geração de relatórios detalhados sobre análises realizadas 
                e resultados obtidos.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <Zap className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">
                Tempo Real
              </h4>
              <p className="text-gray-300 text-sm">
                Monitoramento em tempo real dos detectores e notificações 
                imediatas de eventos importantes.
              </p>
            </div>
          </div>
        </div>

        {/* Como Participar */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Como Participar
          </h3>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-6">
                  Para Iniciantes
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                    <div>
                      <p className="text-white font-medium">Crie sua conta</p>
                      <p className="text-gray-300 text-sm">Registre-se gratuitamente na plataforma</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                    <div>
                      <p className="text-white font-medium">Faça o tutorial</p>
                      <p className="text-gray-300 text-sm">Aprenda sobre ondas gravitacionais e glitches</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                    <div>
                      <p className="text-white font-medium">Comece a classificar</p>
                      <p className="text-gray-300 text-sm">Analise seus primeiros espectrogramas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-6">
                  Para Avançados
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                    <div>
                      <p className="text-white font-medium">Acesse dados brutos</p>
                      <p className="text-gray-300 text-sm">Trabalhe com dados não processados</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                    <div>
                      <p className="text-white font-medium">Desenvolva algoritmos</p>
                      <p className="text-gray-300 text-sm">Contribua com novos métodos de detecção</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                    <div>
                      <p className="text-white font-medium">Colabore em pesquisas</p>
                      <p className="text-gray-300 text-sm">Participe de projetos de pesquisa científica</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Pronto para Começar?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de cientistas cidadãos ao redor do mundo na busca 
            por descobertas revolucionárias sobre o universo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              <span>Criar Conta Gratuita</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors font-medium border border-white/20"
            >
              <Play className="w-5 h-5" />
              <span>Ver Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}