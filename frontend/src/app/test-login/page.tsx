"use client";

import { useState } from "react";
import apiService from "@/services/api";
import type { ApiResponse, User } from "@/services/api";

export default function TestLoginPage() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    ApiResponse<User> | { error: string } | null
  >(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await apiService.login({ email, password });
      setResult(response);
      console.log("Resposta do login:", response);
    } catch (error) {
      console.error("Erro no login:", error);
      setResult({
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Teste de Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Fazendo Login..." : "Login"}
          </button>
        </form>

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Resultado:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <h3 className="font-medium">Usuários de teste:</h3>
          <div>
            <strong>Email:</strong> test@test.com
            <br />
            <strong>Senha:</strong> 123456
          </div>
          <div>
            <strong>Email:</strong> joao@example.com
            <br />
            <strong>Senha:</strong> 123456
          </div>
        </div>
      </div>
    </div>
  );
}
