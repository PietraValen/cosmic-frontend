# 🌌 Caçadores de Falhas - Sistema de Detecção de Ondas Gravitacionais

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)
![Laravel](https://img.shields.io/badge/Laravel-API-red)

**Sistema avançado para detecção e análise de ondas gravitacionais**

[Demo Live](https://cosmic-frontend.vercel.app) • [Documentação](#documentação) • [Contribuir](#contribuição)

</div>

---

## 📖 Sobre o Projeto

O **Caçadores de Falhas** é um sistema web moderno e interativo desenvolvido para detectar, analisar e visualizar ondas gravitacionais. O projeto combina tecnologias de ponta para oferecer uma experiência única na exploração do cosmos através da detecção de perturbações no espaço-tempo.

### 🎯 Objetivos

- 🔍 **Detecção em Tempo Real**: Análise de dados de detectores como LIGO e Virgo
- 📊 **Visualização Avançada**: Gráficos interativos e mapas 3D do cosmos
- 🤖 **Inteligência Artificial**: Algoritmos de ML para identificação de padrões
- 🌐 **Colaboração Global**: Plataforma para pesquisadores e entusiastas
- 📚 **Educação**: Interface intuitiva para divulgação científica

---

## 🚀 Tecnologias

### Frontend
- **Next.js 15.5.4** - Framework React com App Router
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Three.js** - Visualizações 3D e WebGL
- **React Three Fiber** - React renderer para Three.js
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações fluidas

### Backend (API)
- **Laravel** - Framework PHP para API REST
- **MySQL** - Banco de dados relacional
- **JWT Authentication** - Autenticação segura
- **API RESTful** - Endpoints padronizados

### Otimizações
- **Lazy Loading** - Carregamento sob demanda
- **Code Splitting** - Divisão inteligente de bundles
- **Cache Strategy** - Sistema de cache avançado
- **Bundle Optimization** - Otimização de performance
- **SSR/SSG** - Renderização server-side

---

## 📁 Estrutura do Projeto

```
cosmic-frontend/
├── frontend/                  # Aplicação Next.js
│   ├── src/
│   │   ├── app/              # App Router (Next.js 13+)
│   │   │   ├── auth/         # Páginas de autenticação
│   │   │   ├── dashboard/    # Painel principal
│   │   │   ├── analysis/     # Análise de dados
│   │   │   ├── activity/     # Feed de atividades
│   │   │   ├── profile/      # Perfil do usuário
│   │   │   ├── reports/      # Relatórios
│   │   │   ├── spectrograms/ # Visualização espectrogramas
│   │   │   └── ...
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── ui/           # Componentes de interface
│   │   │   ├── visualizations/ # Visualizações 3D
│   │   │   └── ...
│   │   ├── hooks/            # Custom React Hooks
│   │   │   ├── useApi.tsx    # Hook para API calls
│   │   │   ├── useAuth.tsx   # Hook de autenticação
│   │   │   └── ...
│   │   ├── services/         # Serviços externos
│   │   │   └── api.ts        # Cliente API
│   │   ├── contexts/         # React Contexts
│   │   │   └── AuthContext.tsx
│   │   ├── config/           # Configurações
│   │   └── styles/           # Estilos globais
│   ├── public/               # Assets estáticos
│   ├── package.json
│   ├── next.config.ts        # Configuração Next.js
│   ├── tailwind.config.js    # Configuração Tailwind
│   └── tsconfig.json         # Configuração TypeScript
└── README.md                 # Esta documentação
```

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Git**

### 1. Clone o Repositório

```bash
git clone https://github.com/PietraValen/cosmic-frontend.git
cd cosmic-frontend
```

### 2. Instale as Dependências

```bash
cd frontend
npm install
# ou
yarn install
```

### 3. Configuração de Ambiente

Crie o arquivo `.env.local` na pasta `frontend`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_PREFIX=/api

# Authentication
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_here

# Environment
NODE_ENV=development

# Optional: Analytics, monitoring, etc.
```

### 4. Execute o Projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start

# Linting
npm run lint
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🎨 Principais Funcionalidades

### 🏠 Dashboard Interativo
- **Estatísticas em Tempo Real**: Detectores ativos, glitches identificados, eventos descobertos
- **Visualizações Dinâmicas**: Gráficos e mapas interativos
- **Feed de Atividades**: Últimas descobertas e análises
- **Status do Sistema**: Monitoramento de detectores globais

### 🔍 Análise de Dados
- **Análise em Tempo Real**: Processamento de sinais gravitacionais
- **Detecção de Glitches**: Identificação automática de anomalias
- **Algoritmos ML**: Classificação inteligente de eventos
- **Histórico Completo**: Acesso a análises anteriores

### 👤 Perfil de Usuário
- **Gerenciamento de Conta**: Edição de perfil e configurações
- **Histórico de Atividades**: Análises realizadas pelo usuário
- **Preferências**: Customização da interface
- **Upload de Avatar**: Personalização visual

### 📊 Relatórios e Visualizações
- **Espectrogramas**: Visualização de frequências
- **Mapas 3D**: Localização de eventos no cosmos
- **Gráficos Interativos**: Análise temporal de dados
- **Exportação**: Download de relatórios e dados

### 🌌 Visualizações 3D
- **Globo Interativo**: Rede mundial de detectores
- **Propagação de Ondas**: Simulação 3D de ondas gravitacionais
- **Mapa Científico**: Visualização de descobertas
- **Galáxia Virtual**: Exploração do universo

---

## 🔧 Arquitetura Técnica

### Performance Optimizations

#### 🚀 Lazy Loading
```typescript
// Componentes carregados sob demanda
const LazyGlobeVisualization = dynamic(
  () => import("./GlobeVisualization"),
  { loading: () => <LoadingSpinner />, ssr: false }
);
```

#### 💾 Cache Strategy
```typescript
// Sistema de cache para API calls
const { data } = useApi(() => api.getDashboardStats(), {
  cacheKey: "dashboard-stats",
  cacheTTL: 2 * 60 * 1000, // 2 minutos
});
```

#### ⚡ Bundle Optimization
```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ["lucide-react"],
}
```

### Estado Global
- **React Context**: Gerenciamento de autenticação
- **Custom Hooks**: Lógica reutilizável
- **Local Storage**: Persistência de preferências

### Comunicação com API
- **REST Client**: Cliente HTTP otimizado
- **Error Handling**: Tratamento robusto de erros
- **Retry Logic**: Tentativas automáticas
- **Loading States**: Estados de carregamento

---

## 🎯 Roadmap

### ✅ Fase 1 - Fundação (Concluída)
- [x] Setup inicial do projeto
- [x] Sistema de autenticação
- [x] Dashboard básico
- [x] Integração com API
- [x] Otimizações de performance

### 🔄 Fase 2 - Análise Avançada (Em Progresso)
- [ ] Algoritmos ML avançados
- [ ] Análise de espectrogramas
- [ ] Sistema de relatórios
- [ ] Notificações em tempo real

### 🔮 Fase 3 - Colaboração (Planejada)
- [ ] Sistema de comentários
- [ ] Compartilhamento de descobertas
- [ ] API pública
- [ ] Mobile app

### 🚀 Fase 4 - Expansão (Futuro)
- [ ] Realidade virtual/aumentada
- [ ] Integração com telescópios
- [ ] Processamento distribuído
- [ ] Marketplace de algoritmos

---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run type-check   # Verificação de tipos

# Análise
npm run analyze      # Análise de bundle
npm run test         # Execução de testes
npm run test:watch   # Testes em modo watch
```

---

## 🌐 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```bash
# Build da imagem
docker build -t cosmic-frontend .

# Executar container
docker run -p 3000:3000 cosmic-frontend
```

### Manual
```bash
# Build estático
npm run build
npm run export

# Servir arquivos estáticos
```

---

## 🔒 Segurança

- **JWT Authentication**: Tokens seguros para autenticação
- **CORS Policy**: Controle de acesso entre origens
- **Input Validation**: Validação rigorosa de entradas
- **XSS Protection**: Proteção contra scripts maliciosos
- **CSRF Protection**: Proteção contra ataques cross-site

---

## 📈 Monitoramento

### Performance
- **Core Web Vitals**: Métricas de performance
- **Bundle Analysis**: Análise de tamanho de bundles
- **Lighthouse Scores**: Auditoria de qualidade

### Analytics
- **User Tracking**: Análise de comportamento
- **Error Monitoring**: Rastreamento de erros
- **Performance Metrics**: Métricas de performance

---

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para sua branch
6. **Abra** um Pull Request

### Padrões de Código

- **ESLint**: Linting automático
- **Prettier**: Formatação de código
- **TypeScript**: Tipagem obrigatória
- **Conventional Commits**: Padrão de commits

### Estrutura de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração sem mudança de funcionalidade
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

---

## 📞 Suporte

### Comunidade
- **GitHub Issues**: Reportar bugs e sugerir features
- **Discussions**: Perguntas e discussões gerais
- **Wiki**: Documentação detalhada

### Contato
- **Email**: pietra.valen@example.com
- **LinkedIn**: [PietraValen](https://linkedin.com/in/pietravalen)
- **Website**: [pietravalen.dev](https://pietravalen.dev)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Pietra Valen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Agradecimentos

- **LIGO Scientific Collaboration**: Dados de detectores
- **Virgo Collaboration**: Tecnologia de detecção
- **Next.js Team**: Framework excepcional
- **Vercel**: Plataforma de deploy
- **Comunidade Open Source**: Ferramentas e bibliotecas

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

**🌌 Explorando o cosmos, uma onda gravitacional por vez**

Made with ❤️ by [Pietra Valen], [Nei Agripino], [Derick Silva]

</div>