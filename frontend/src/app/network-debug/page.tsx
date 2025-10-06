"use client";

import { useState } from "react";
import { buildApiUrl, buildAuthHeaders, getAuthToken } from "@/config";

interface TestResult {
  test: string;
  result: unknown;
  timestamp: string;
}

export default function NetworkDebugPage() {
  const [results, setResults] = useState<TestResult[]>([]);

  const addResult = (test: string, result: unknown) => {
    setResults((prev) => [
      ...prev,
      { test, result, timestamp: new Date().toISOString() },
    ]);
  };

  const testDirectFetch = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "test", password: "test" }),
      });

      const data = await response.text();
      addResult("Direct Fetch", { status: response.status, data });
    } catch (error) {
      addResult("Direct Fetch", {
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  const testBuildApiUrl = () => {
    const url = buildApiUrl("/glitches");
    addResult("Build API URL", { url });
  };

  const testAuthHeaders = () => {
    const headers = buildAuthHeaders();
    const token = getAuthToken();
    addResult("Auth Headers", {
      headers,
      token: token ? "Present" : "Missing",
    });
  };

  const testGlitchesEndpoint = async () => {
    try {
      const url = buildApiUrl("/glitches");
      const headers = buildAuthHeaders();

      console.log("Making request to:", url);
      console.log("With headers:", headers);

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.text();
      addResult("Glitches Endpoint", {
        url,
        status: response.status,
        data: data.substring(0, 500) + (data.length > 500 ? "..." : ""),
      });
    } catch (error) {
      addResult("Glitches Endpoint", {
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  };

  const clearResults = () => setResults([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Debug de Rede</h1>

      <div className="space-y-4 mb-8">
        <button
          onClick={testDirectFetch}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-4"
        >
          Teste Direto Fetch
        </button>

        <button
          onClick={testBuildApiUrl}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mr-4"
        >
          Teste Build URL
        </button>

        <button
          onClick={testAuthHeaders}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded mr-4"
        >
          Teste Headers Auth
        </button>

        <button
          onClick={testGlitchesEndpoint}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded mr-4"
        >
          Teste Endpoint Glitches
        </button>

        <button
          onClick={clearResults}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Limpar
        </button>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              {result.test}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{result.timestamp}</p>
            <pre className="text-sm bg-gray-700 p-3 rounded overflow-auto">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
