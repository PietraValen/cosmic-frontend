// Dashboard protegido - exemplo de uso
"use client";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { LogOut, User, Settings, Bell } from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-white">
              Caçadores de Falhas - Dashboard
            </h1>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>

                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de boas-vindas */}
          <div className="md:col-span-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Bem-vindo, {user?.name}!
            </h2>
            <p className="text-slate-300">
              Você está logado no sistema Caçadores de Falhas. Explore as
              funcionalidades disponíveis no painel.
            </p>
          </div>

          {/* Card de perfil */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Perfil</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Role: {user?.role}</p>
              <p className="text-sm text-slate-400">ID: {user?.id}</p>
            </div>
          </div>
        </div>

        {/* Conteúdo adicional do dashboard */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Atividades Recentes
            </h3>
            <p className="text-slate-400">
              Nenhuma atividade recente encontrada.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Estatísticas
            </h3>
            <p className="text-slate-400">
              Dados estatísticos serão exibidos aqui.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
