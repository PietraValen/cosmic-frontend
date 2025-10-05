"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Users,
  Award,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Heart,
  Telescope,
  Brain,
  Target,
  Lightbulb,
  Coffee,
  Star,
} from "lucide-react";

export default function SobrePage() {
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
            <h1 className="text-2xl font-bold text-white">Sobre</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sobre o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Projeto
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conheça a história, a equipe e os valores que impulsionam nosso projeto 
            de detecção colaborativa de glitches em dados de ondas gravitacionais.
          </p>
        </div>

        {/* Nossa História */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nossa História
          </h3>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-semibold text-white mb-4">
                  Como Tudo Começou
                </h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  O projeto Caçadores de Falhas nasceu da necessidade de melhorar a qualidade 
                  dos dados de ondas gravitacionais detectados pelos observatórios LIGO e Virgo. 
                  Com o aumento exponencial na quantidade de dados coletados, tornou-se essencial 
                  desenvolver métodos mais eficientes para identificar e classificar interferências.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Inspirados pelo sucesso de projetos de ciência cidadã como Galaxy Zoo e 
                  Foldit, decidimos criar uma plataforma que combinasse o poder da inteligência 
                  artificial com a intuição e criatividade humana para resolver este desafio científico.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                  <Telescope className="w-32 h-32 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nossos Valores */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Excelência Científica
              </h4>
              <p className="text-gray-300 text-sm">
                Compromisso com rigor científico e qualidade em todas as análises.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Colaboração
              </h4>
              <p className="text-gray-300 text-sm">
                Acreditamos no poder da colaboração entre cientistas e cidadãos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Inovação
              </h4>
              <p className="text-gray-300 text-sm">
                Buscamos constantemente novas formas de avançar a ciência.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Acessibilidade
              </h4>
              <p className="text-gray-300 text-sm">
                Ciência aberta e acessível para pessoas de todo o mundo.
              </p>
            </div>
          </div>
        </div>

        {/* Equipe */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nossa Equipe
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Equipe de IA
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Especialistas em machine learning e processamento de sinais que desenvolvem 
                os algoritmos de detecção.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Python</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">TensorFlow</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Telescope className="w-10 h-10 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Físicos
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Especialistas em ondas gravitacionais que fornecem expertise científica 
                e validação dos resultados.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">LIGO</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Virgo</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Desenvolvedores
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Engenheiros de software que criam e mantêm a plataforma web 
                e suas funcionalidades.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Node.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Conquistas e Reconhecimentos
          </h3>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <span>Prêmios e Reconhecimentos</span>
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Prêmio de Inovação em Ciência Cidadã 2024</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Menção Honrosa na Conferência LIGO 2023</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Featured na revista Nature Astronomy</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <span>Impacto Científico</span>
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Coffee className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>15+ publicações científicas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Coffee className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>500,000+ glitches classificados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Coffee className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Melhoria de 40% na qualidade dos dados</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Comunidade */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Nossa Comunidade
          </h3>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Contamos com uma comunidade vibrante de cientistas cidadãos, pesquisadores 
              e entusiastas da astronomia de mais de 50 países ao redor do mundo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-300">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Países</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">1M+</div>
              <div className="text-gray-300">Classificações</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-gray-300">Instituições</div>
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Entre em Contato
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-xl font-semibold text-white mb-4">
                Informações Gerais
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">contato@cacadoresdefalhas.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">www.cacadoresdefalhas.org</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h4 className="text-xl font-semibold text-white mb-4">
                Redes Sociais
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Agradecimentos */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-2xl border border-white/10 p-8">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Agradecimentos
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Este projeto só é possível graças ao apoio incansável de nossa comunidade, 
              aos dados fornecidos pelas colaborações LIGO e Virgo, e ao financiamento 
              de agências de pesquisa ao redor do mundo.
            </p>
            <p className="text-gray-300">
              <span className="text-red-400">♥</span> Obrigado por fazer parte desta jornada científica!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}