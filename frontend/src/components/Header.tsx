"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="text-white font-semibold text-lg">
                Caçadores de Falhas
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Início
            </Link>
            <Link
              href="#projeto"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Projeto
            </Link>
            <Link
              href="#como-funciona"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="#sobre"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Sobre
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
            <Link
              href="/auth/register"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
              <span>Cadastrar</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-800">
              <Link
                href="/"
                className="block px-3 py-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="#projeto"
                className="block px-3 py-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projeto
              </Link>
              <Link
                href="#como-funciona"
                className="block px-3 py-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link
                href="#sobre"
                className="block px-3 py-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-slate-800 mt-4">
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 w-full px-3 py-2 text-slate-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center space-x-2 w-full px-3 py-2 mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Cadastrar</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
