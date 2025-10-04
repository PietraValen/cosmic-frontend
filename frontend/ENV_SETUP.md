# Configuração do Environment (.env)

Este documento explica como configurar as variáveis de ambiente para o frontend do projeto **Caçadores de Falhas**.

## 📋 Pré-requisitos

1. **Backend em execução** em `http://localhost:3001` (ou configure a URL correta)
2. **Banco de dados** configurado (PostgreSQL ou MongoDB)
3. **Node.js** e **npm** instalados

## 🚀 Configuração Inicial

### 1. Copiar o arquivo de exemplo
```bash
cp .env.example .env
```

### 2. Configurar as variáveis obrigatórias

Edite o arquivo `.env` e configure pelo menos estas variáveis:

```bash
# JWT Secret (OBRIGATÓRIO - gere uma chave forte)
JWT_SECRET=sua_chave_jwt_super_secreta_aqui

# URL do Backend (ajuste conforme seu backend)
NEXT_PUBLIC_API_URL=http://localhost:3001

# URL do Frontend (para CORS)
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## 🔧 Variáveis Principais

### Autenticação
```bash
JWT_SECRET=sua_chave_jwt_super_secreta_aqui
JWT_EXPIRES_IN=7d
```

### API Backend
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_AUTH_LOGIN=/api/auth/login
NEXT_PUBLIC_API_AUTH_REGISTER=/api/auth/register
```

### Banco de Dados (para o backend)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/cosmic_database
# OU
MONGODB_URI=mongodb://localhost:27017/cosmic_database
```

## 🌐 APIs Externas Disponíveis

O projeto está configurado para usar APIs públicas de dados de ondas gravitacionais:

```bash
NEXT_PUBLIC_GRAVITATIONAL_WAVE_API=https://www.gw-openscience.org/api/
NEXT_PUBLIC_LIGO_OPEN_DATA_API=https://www.gw-openscience.org/eventapi/
```

## 🔗 URLs dos Detectores

As URLs dos detectores já estão pré-configuradas:

- **LIGO Hanford & Livingston**: https://www.ligo.caltech.edu/
- **Virgo**: https://www.virgo-gw.eu/
- **KAGRA**: https://gwcenter.icrr.u-tokyo.ac.jp/en/
- **GEO600**: https://www.geo600.org/

## 🛠️ Como Testar a Configuração

### 1. Verificar se o backend está rodando
```bash
curl http://localhost:3001/api/health
```

### 2. Testar o frontend
```bash
npm run dev
```

### 3. Testar autenticação
Acesse `http://localhost:3000/auth/login` e tente fazer login.

## 🔐 Segurança

### ❌ NUNCA faça:
- Commit do arquivo `.env` no Git
- Use senhas fracas ou padrões
- Exponha `JWT_SECRET` em variáveis `NEXT_PUBLIC_`

### ✅ SEMPRE faça:
- Use chaves JWT fortes (32+ caracteres)
- Configure CORS corretamente
- Use HTTPS em produção
- Rotacione secrets periodicamente

## 📝 Exemplo de .env Completo

```bash
# =============================================================================
# CONFIGURAÇÕES DE AUTENTICAÇÃO
# =============================================================================
JWT_SECRET=minha_chave_jwt_super_forte_e_aleatoria_de_32_chars_ou_mais
JWT_EXPIRES_IN=7d

# =============================================================================
# CONFIGURAÇÕES DA API BACKEND
# =============================================================================
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# =============================================================================
# CONFIGURAÇÕES DE DESENVOLVIMENTO
# =============================================================================
NODE_ENV=development
PORT=3000

# =============================================================================
# BANCO DE DADOS (Backend)
# =============================================================================
DATABASE_URL=postgresql://cosmic_user:cosmic_pass@localhost:5432/cosmic_db
```

## 🆘 Solução de Problemas

### Erro: "Cannot connect to backend"
- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Confirme se o backend está rodando na porta especificada

### Erro: "JWT token invalid"
- Verifique se `JWT_SECRET` é o mesmo no frontend e backend
- Confirme se o token não expirou

### Erro: "CORS policy"
- Configure `ALLOWED_ORIGINS` no backend
- Verifique `NEXT_PUBLIC_FRONTEND_URL`

## 📞 Suporte

Se você está configurando o projeto pela primeira vez e precisa de ajuda:

1. Verifique se todas as variáveis obrigatórias estão configuradas
2. Confirme se o backend está rodando corretamente  
3. Teste as conexões individuais (frontend → backend → banco)

---

**Nota**: Este arquivo contém informações sensíveis. Mantenha-o seguro e nunca o compartilhe publicamente.