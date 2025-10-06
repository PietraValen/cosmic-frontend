"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { config, buildApiUrl } from "@/config";

interface TestResult {
  test: string;
  result: unknown;
  timestamp: string;
}

export default function ApiTestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, result: unknown) => {
    setResults((prev) => [
      ...prev,
      { test, result, timestamp: new Date().toISOString() },
    ]);
  };

  const testApiConnection = async () => {
    setLoading(true);
    setResults([]);

    // Test 1: Basic fetch to API base URL
    try {
      addResult("Config API URL", config.api.baseUrl);
      addResult("Built API URL for /login", buildApiUrl("/api/login"));

      const response = await fetch(buildApiUrl("/api/login"), {
        method: "HEAD",
        mode: "cors",
      });
      addResult("HEAD /api/login", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
    } catch (error) {
      addResult("HEAD /api/login ERROR", error);
    }

    // Test 2: OPTIONS request to check CORS
    try {
      const response = await fetch(buildApiUrl("/api/login"), {
        method: "OPTIONS",
        mode: "cors",
      });
      addResult("OPTIONS /api/login", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
    } catch (error) {
      addResult("OPTIONS /api/login ERROR", error);
    }

    // Test 3: POST with invalid credentials
    try {
      const response = await fetch(buildApiUrl("/api/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "wrongpassword",
        }),
        mode: "cors",
      });

      const data = await response.json();
      addResult("POST /api/login (invalid)", {
        status: response.status,
        statusText: response.statusText,
        data,
      });
    } catch (error) {
      addResult("POST /api/login ERROR", error);
    }

    // Test 4: Using API service
    try {
      const result = await api.login({
        email: "test@example.com",
        password: "wrongpassword",
      });
      addResult("API Service login", result);
    } catch (error) {
      addResult("API Service login ERROR", error);
    }

    setLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          API Connection Test
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Configuration</h2>
          <pre className="bg-black/30 p-4 rounded text-green-400 text-sm overflow-x-auto">
            {JSON.stringify(
              {
                baseUrl: config.api.baseUrl,
                loginEndpoint: buildApiUrl("/api/login"),
                environment: config.app.environment,
              },
              null,
              2
            )}
          </pre>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={testApiConnection}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {loading ? "Testing..." : "Test API Connection"}
            </button>
            <button
              onClick={clearResults}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Test Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-black/30 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-blue-400">
                      {result.test}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {result.timestamp}
                    </span>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                    {typeof result.result === "object"
                      ? JSON.stringify(result.result, null, 2)
                      : String(result.result)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
