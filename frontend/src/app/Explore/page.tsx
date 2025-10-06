import Link from "next/link";
import Footer from "@/components/Footer";

export default function Explore() {
  return (
    <main>
      <div className="min-h-screen bg-gray-900 text-white pt-32 px-6 md:px-16 lg:px-32">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explorar o Projeto
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Descubra como nossa plataforma detecta e analisa ondas
            gravitacionais usando tecnologias de ponta.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">
            🔬 Tecnologias de Detecção
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                titulo: "Machine Learning",
                descricao:
                  "Algoritmos avançados para identificar padrões em sinais gravitacionais",
                icone: "🤖",
              },
              {
                titulo: "Análise de Espectrogramas",
                descricao:
                  "Visualização e processamento de dados de frequência temporal",
                icone: "📊",
              },
              {
                titulo: "Processamento em Tempo Real",
                descricao: "Análise contínua de dados do LIGO e Virgo",
                icone: "⚡",
              },
              {
                titulo: "Neural Networks",
                descricao:
                  "Redes neurais especializadas em detectar glitches e sinais",
                icone: "🧠",
              },
              {
                titulo: "Visualização 3D",
                descricao:
                  "Mapas interativos mostrando propagação de ondas pelo espaço",
                icone: "🌌",
              },
              {
                titulo: "API RESTful",
                descricao:
                  "Interface robusta para acesso aos dados científicos",
                icone: "🔗",
              },
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:bg-gray-750"
              >
                <div className="text-3xl mb-3">{tech.icone}</div>
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                  {tech.titulo}
                </h3>
                <p className="text-gray-300 text-sm">{tech.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">🎯 Nossos Objetivos</h2>
          <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-8 rounded-xl border border-cyan-800/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                  Democratizar a Ciência
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Tornar a detecção de ondas gravitacionais acessível para
                  estudantes, pesquisadores e entusiastas da astronomia.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                  Acelerar Descobertas
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Usar IA e machine learning para identificar novos tipos de
                  eventos cósmicos e acelerar a pesquisa científica.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                  Educação Científica
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Fornecer ferramentas educacionais para ensinar sobre física
                  gravitacional e astronomia observacional.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-green-400">
                  Colaboração Global
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Conectar pesquisadores ao redor do mundo para compartilhar
                  dados e insights sobre ondas gravitacionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">
            🚀 Funcionalidades da Plataforma
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titulo: "Dashboard Interativo",
                descricao:
                  "Acompanhe detecções em tempo real com métricas e estatísticas atualizadas",
                link: "/dashboard",
                cor: "from-blue-600 to-cyan-600",
              },
              {
                titulo: "Análise de Dados",
                descricao:
                  "Ferramentas avançadas para analisar sinais e identificar eventos astronômicos",
                link: "/analysis",
                cor: "from-purple-600 to-pink-600",
              },
              {
                titulo: "Galeria de Espectrogramas",
                descricao:
                  "Explore diferentes tipos de sinais detectados pelos interferômetros",
                link: "/spectrograms",
                cor: "from-green-600 to-teal-600",
              },
              {
                titulo: "Relatórios Científicos",
                descricao:
                  "Gere relatórios detalhados sobre suas análises e descobertas",
                link: "/reports",
                cor: "from-orange-600 to-red-600",
              },
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.link}
                className={`block bg-gradient-to-r ${feature.cor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.titulo}
                </h3>
                <p className="text-white/90">{feature.descricao}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="text-center pb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Pronto para começar sua jornada científica?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/KnowMore"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              Saiba Mais
            </Link>
            <Link
              href="/auth/register"
              className="inline-block px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all duration-300 border border-slate-700"
            >
              Criar Conta
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
