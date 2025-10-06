"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Users,
  Brain,
  Telescope,
  Globe,
  Lightbulb,
  Zap,
  Award,
  BookOpen,
  Code,
  Database,
} from "lucide-react";

export default function ProjetoPage() {
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
            <h1 className="text-2xl font-bold text-white">Projeto</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Caçadores de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Falhas
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Um projeto revolucionário que combina Inteligência Artificial e Ciência Cidadã 
            para detectar e classificar interferências (glitches) em dados de ondas gravitacionais, 
            contribuindo para descobertas científicas fundamentais.
          </p>
        </div>

        {/* Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Nossa Missão</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Democratizar a pesquisa científica através da ciência cidadã, permitindo que 
              pessoas de todo o mundo contribuam para a detecção de ondas gravitacionais e 
              avancem nossa compreensão do universo.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Nossa Visão</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Ser a principal plataforma global para ciência cidadã em astronomia gravitacional, 
              conectando cidadãos cientistas com pesquisadores para acelerar descobertas 
              revolucionárias sobre o cosmos.
            </p>
          </div>
        </div>

        {/* Objetivos do Projeto */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Objetivos do Projeto
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                IA Avançada
              </h4>
              <p className="text-gray-300">
                Desenvolver algoritmos de inteligência artificial capazes de identificar 
                padrões complexos em dados de ondas gravitacionais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Ciência Cidadã
              </h4>
              <p className="text-gray-300">
                Engajar o público geral na pesquisa científica, fornecendo ferramentas 
                intuitivas para análise de dados astronômicos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Telescope className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Descobertas
              </h4>
              <p className="text-gray-300">
                Acelerar descobertas científicas através da colaboração entre 
                humanos e máquinas na análise de dados astronômicos.
              </p>
            </div>
          </div>
        </div>

        {/* Tecnologias Utilizadas */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Tecnologias e Metodologias
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <Code className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Machine Learning</h4>
              <p className="text-sm text-gray-300">
                Redes neurais convolucionais e algoritmos de deep learning
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <Database className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Big Data</h4>
              <p className="text-sm text-gray-300">
                Processamento de terabytes de dados dos detectores LIGO/Virgo
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Tempo Real</h4>
              <p className="text-sm text-gray-300">
                Análise em tempo real para detecção imediata de eventos
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <Globe className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Colaboração</h4>
              <p className="text-sm text-gray-300">
                Plataforma web para colaboração global entre cientistas
              </p>
            </div>
          </div>
        </div>

        {/* Impacto e Resultados */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Impacto e Resultados Esperados
          </h3>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">
                  Impacto Científico
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Award className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Melhoria na qualidade dos dados de ondas gravitacionais</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Award className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Aceleração de descobertas astronômicas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Award className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Contribuição para a compreensão do universo</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-4">
                  Impacto Social
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Educação e divulgação científica</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Engajamento público com a ciência</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <BookOpen className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Democratização da pesquisa científica</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Colaboradores e Instituições */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Colaboradores e Instituições
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Este projeto é fruto da colaboração entre universidades, institutos de pesquisa 
            e a comunidade científica global, unindo esforços para avançar nosso conhecimento 
            sobre ondas gravitacionais.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-lg font-semibold text-white mb-2">LIGO Scientific Collaboration</h4>
              <p className="text-sm text-gray-300">Dados e expertise em ondas gravitacionais</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Virgo Collaboration</h4>
              <p className="text-sm text-gray-300">Dados complementares do detector europeu</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Universidades Parceiras</h4>
              <p className="text-sm text-gray-300">Pesquisadores e estudantes envolvidos</p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            <span>Explore a Plataforma</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}