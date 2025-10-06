import Link from "next/link";
import Footer from "@/components/Footer";

export default function KnowMore() {
  return (
    <main>
      <div className="min-h-screen bg-gray-900 text-white pt-32 px-6 md:px-16 lg:px-32">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Caçadores de Falhas
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Desvendando os mistérios do universo através da detecção inteligente
            de ondas gravitacionais
          </p>
          <div className="mt-8 text-6xl">🌌</div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            🔬 Nossa Missão
          </h2>
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl border border-blue-800/30">
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Revolucionar a detecção de ondas gravitacionais usando
              inteligência artificial e machine learning. Nossa plataforma
              analisa dados dos detectores LIGO e Virgo para identificar eventos
              cósmicos extraordinários, desde fusões de buracos negros até
              estrelas de nêutrons em colisão.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">
            🌟 O que são Ondas Gravitacionais?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                Descoberta Revolucionária
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                As ondas gravitacionais são ondulações no tecido do
                espaço-tempo, previstas por Einstein em 1915 e detectadas pela
                primeira vez em 2015 pelo LIGO.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Elas são criadas por eventos cósmicos extremos, como a colisão
                de buracos negros ou estrelas de nêutrons.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Nova Era da Astronomia
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Essas detecções abriram uma janela completamente nova para
                observar o universo, permitindo estudar fenômenos impossíveis de
                ver com telescópios tradicionais.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Cada detecção conta uma história única sobre os eventos mais
                violentos do cosmos.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">🤖 Nossa Tecnologia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                titulo: "Detecção Inteligente",
                descricao:
                  "Algoritmos de IA especializados em identificar sinais gravitacionais em meio ao ruído",
                icone: "🎯",
                cor: "from-blue-600 to-cyan-600",
              },
              {
                titulo: "Análise de Glitches",
                descricao:
                  "Identificação e classificação automática de ruídos instrumentais que podem mascarar sinais reais",
                icone: "🔍",
                cor: "from-purple-600 to-pink-600",
              },
              {
                titulo: "Visualização Avançada",
                descricao:
                  "Espectrogramas interativos e mapas 3D para explorar dados gravitacionais",
                icone: "📊",
                cor: "from-green-600 to-teal-600",
              },
              {
                titulo: "Processamento Tempo Real",
                descricao:
                  "Análise contínua de dados dos detectores com alertas instantâneos",
                icone: "⚡",
                cor: "from-orange-600 to-red-600",
              },
              {
                titulo: "Machine Learning",
                descricao:
                  "Redes neurais treinadas com milhares de eventos para máxima precisão",
                icone: "🧠",
                cor: "from-indigo-600 to-purple-600",
              },
              {
                titulo: "Colaboração Científica",
                descricao:
                  "Plataforma para pesquisadores compartilharem descobertas e análises",
                icone: "🤝",
                cor: "from-pink-600 to-rose-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${item.cor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="text-4xl mb-4">{item.icone}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {item.titulo}
                </h3>
                <p className="text-white/90 text-sm">{item.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">📈 Impacto Científico</h2>
          <div className="bg-gradient-to-r from-gray-800 to-gray-750 p-8 rounded-xl border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-lg font-semibold mb-2">
                  Eventos Detectados
                </div>
                <div className="text-gray-400 text-sm">
                  Ondas gravitacionais confirmadas desde 2015
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
                <div className="text-lg font-semibold mb-2">
                  Detectores Ativos
                </div>
                <div className="text-gray-400 text-sm">
                  LIGO (2x) e Virgo trabalhando em conjunto
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  Nobel
                </div>
                <div className="text-lg font-semibold mb-2">Prêmio 2017</div>
                <div className="text-gray-400 text-sm">
                  Reconhecimento pela descoberta histórica
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">
            🎓 Para Educadores e Estudantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800/50">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                Recursos Educacionais
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-3">📚</span> Tutoriais interativos sobre
                  física gravitacional
                </li>
                <li className="flex items-center">
                  <span className="mr-3">🎮</span> Simulações em tempo real de
                  eventos cósmicos
                </li>
                <li className="flex items-center">
                  <span className="mr-3">📊</span> Dados reais para projetos de
                  pesquisa
                </li>
                <li className="flex items-center">
                  <span className="mr-3">🏆</span> Certificações em análise de
                  dados gravitacionais
                </li>
              </ul>
            </div>
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-800/50">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Para Pesquisadores
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-3">🔬</span> API completa para análise
                  científica
                </li>
                <li className="flex items-center">
                  <span className="mr-3">📈</span> Ferramentas avançadas de
                  visualização
                </li>
                <li className="flex items-center">
                  <span className="mr-3">🤝</span> Rede colaborativa
                  internacional
                </li>
                <li className="flex items-center">
                  <span className="mr-3">📝</span> Publicação de descobertas na
                  plataforma
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center pb-16">
          <h2 className="text-3xl font-semibold mb-6">
            Junte-se à Nossa Missão
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Seja parte da próxima grande descoberta científica. Explore o
            universo conosco!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              Começar Agora
            </Link>
            <Link
              href="/Explore"
              className="inline-block px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all duration-300 border border-slate-700"
            >
              Explorar Projeto
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
