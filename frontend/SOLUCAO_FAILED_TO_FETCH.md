# 🔧 Guia de Solução - Erro "Failed to fetch"

## 🚨 Problema Identificado
O erro "Failed to fetch" está ocorrendo tanto no API Service quanto no fetch direto, indicando um problema de conectividade fundamental entre o frontend (localhost:3000) e o backend Laravel (localhost:8000).

## ✅ Verificações Realizadas
- ✅ Laravel está rodando na porta 8000
- ✅ CORS está configurado (teste OPTIONS passou)
- ✅ Build do frontend está funcionando
- ✅ Código TypeScript está correto

## 🛠️ Soluções Possíveis

### 1. **Verificar Firewall/Antivírus** (MAIS PROVÁVEL)
```powershell
# No PowerShell como Administrador:
netsh advfirewall firewall add rule name="Laravel Dev Server" dir=in action=allow protocol=TCP localport=8000
```

### 2. **Tentar IP direto ao invés de localhost**
Editar `.env`:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 3. **Usar a mesma porta para frontend e backend**
```bash
# Opção A: Rodar Next.js na porta 8001
npm run dev -- -p 8001

# Opção B: Configurar Laravel para porta 3001
php artisan serve --port=3001
```

### 4. **Configurar Proxy no Next.js**
Adicionar no `next.config.js`:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/api/:path*',
    },
  ];
},
```

### 5. **Testar com curl/PowerShell** (Verificação)
```powershell
# Teste 1: Verificar se Laravel responde
Invoke-WebRequest -Uri "http://localhost:8000/api/login" -Method GET

# Teste 2: Testar POST
$body = '{"email":"admin@cosmic.com","password":"123456"}'
Invoke-WebRequest -Uri "http://localhost:8000/api/login" -Method POST -Body $body -ContentType "application/json"
```

## 🎯 Ação Recomendada

1. **Primeiro**: Teste a **Solução 2** (IP direto)
2. **Se não funcionar**: Teste a **Solução 1** (Firewall)
3. **Como última opção**: Teste a **Solução 4** (Proxy)

## 📱 Teste na Página de Debug

Acesse `http://localhost:3000/quick-debug` e teste os botões na seguinte ordem:

1. **"Testar Conectividade"** - Diagnóstico básico
2. **"Testar XMLHttpRequest"** - Alternativa ao fetch
3. **"Testar Fetch Direto"** - Depois das correções
4. **"Testar Login via API Service"** - Teste final

## 📞 Próximos Passos

Se nenhuma solução funcionar, precisaremos:
1. Verificar logs detalhados do Laravel
2. Testar com navegador diferente
3. Verificar configurações de rede da máquina