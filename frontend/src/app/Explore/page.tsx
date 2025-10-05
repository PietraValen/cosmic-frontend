import Link from "next/link";
import Footer from "@/components/Footer";

export default function Explore() {
  return (
    <main>
      <div className="min-h-screen bg-gray-900 text-white pt-32 px-6 md:px-16 lg:px-32">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explorar o Projeto</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Conheça os recursos, tecnologias e objetivos por trás do nosso projeto.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Tecnologias</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300">
            {[
              "Next.js 13+ (App Router)",
              "TypeScript",
              "TailwindCSS",
              "API REST / GraphQL",
              "Autenticação com JWT",
              "Banco de dados PostgreSQL / Prisma",
            ].map((tech, i) => (
              <li
                key={i}
                className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Objetivos</h2>
          <p className="text-gray-400 leading-relaxed">
            O projeto visa criar uma plataforma moderna, rápida e escalável,
            oferecendo uma ótima experiência ao usuário final. Queremos mostrar como
            aplicar boas práticas de desenvolvimento com tecnologias atuais, mantendo
            o foco em acessibilidade, performance e organização do código.
          </p>
        </section>

        <section className="text-center pb-32">
          <h2 className="text-2xl font-semibold mb-4">Quer saber mais?</h2>
          <Link
            href="/saiba-mais"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Ir para Saiba Mais
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
