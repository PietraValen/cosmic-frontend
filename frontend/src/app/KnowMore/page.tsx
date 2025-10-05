// app/saiba-mais/page.tsx
import Link from "next/link";
import Footer from "@/components/Footer";

export default function KnowMore() {
  return (
    <main>
      <div className="min-h-screen bg-gray-900 text-white pt-32 px-6 md:px-16 lg:px-32">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Saiba Mais Sobre Nosso Projeto
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Descubra nossa missão, valores e tudo que podemos oferecer para você.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-4">Quem Somos</h2>
          <p className="text-gray-400 leading-relaxed">
            Somos uma equipe apaixonada por tecnologia e inovação. Nosso objetivo é
            entregar soluções que realmente façam diferença para nossos usuários,
            combinando usabilidade, performance e design moderno.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">O que oferecemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titulo: "Interface Amigável",
                descricao:
                  "Navegação simples, layout limpo e tudo pensado para que você encontre o que precisa sem complicação.",
              },
              {
                titulo: "Desempenho e Otimização",
                descricao:
                  "Tempo de carregamento rápido, recursos otimizados e compatibilidade com diversos dispositivos.",
              },
              {
                titulo: "Atualizações Constantes",
                descricao:
                  "Estamos sempre evoluindo: novas funcionalidades, melhorias e correções com foco em atender você.",
              },
              {
                titulo: "Suporte Dedicado",
                descricao:
                  "Você não fica sozinho — oferecemos suporte para dúvidas, problemas ou sugestões.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-medium mb-3">{item.titulo}</h3>
                <p className="text-gray-400">{item.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center pb-32">
          <h2 className="text-3xl font-semibold mb-6">Quer ir além?</h2>
          <Link
            href="/contato"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Fale Conosco
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
