'use client';

import { useRequireAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout, isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Verificando autenticação...</div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAuth will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">
                🌌 Cosmic Frontend
              </h1>
              <span className="text-blue-300">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-gray-300">Bem-vindo, </span>
                <span className="font-semibold">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bem-vindo ao Sistema, {user.name}! 👋
          </h2>
          <p className="text-blue-200 text-lg">
            Sistema de Caçadores de Falhas - Detecção de Ondas Gravitacionais
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <div className="text-blue-300 font-semibold">Status</div>
              <div className="text-white">Sistema Online</div>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <div className="text-green-300 font-semibold">Usuário</div>
              <div className="text-white">{user.email}</div>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <div className="text-purple-300 font-semibold">Permissão</div>
              <div className="text-white capitalize">{user.role}</div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Galaxy Visualization */}
          <Link
            href="/galaxy"
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-200 group"
          >
            <div className="text-4xl mb-4">🌌</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300">
              Visualização Galáctica
            </h3>
            <p className="text-gray-300">
              Explore anomalias espaciais em uma visualização 3D interativa da galáxia.
            </p>
          </Link>

          {/* Debug Tools */}
          <Link
            href="/debug-login"
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-200 group"
          >
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300">
              Ferramentas de Debug
            </h3>
            <p className="text-gray-300">
              Acesse ferramentas de debug e teste para desenvolvimento.
            </p>
          </Link>

          {/* Test Login */}
          <Link
            href="/test-login"
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-200 group"
          >
            <div className="text-4xl mb-4">🧪</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300">
              Página de Teste
            </h3>
            <p className="text-gray-300">
              Página de teste de login para validação do sistema.
            </p>
          </Link>

          {/* System Status */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Status do Sistema
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">API:</span>
                <span className="text-green-400">✅ Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Autenticação:</span>
                <span className="text-green-400">✅ Ativa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Visualização 3D:</span>
                <span className="text-green-400">✅ Funcionando</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
