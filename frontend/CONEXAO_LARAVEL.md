# 🔗 Guia de Conexão Frontend Next.js ↔️ Backend Laravel

## ✅ Configuração Aplicada no Frontend

O arquivo `.env` foi atualizado com as configurações do seu backend Laravel:

### 🔑 **JWT Secret Sincronizado**
```bash
# Agora usa o MESMO JWT_SECRET do backend
JWT_SECRET=apdT52iD4nalTK2WMleIVppt4Y0UISspQug9RaaXnVMyZXMPBZZwPKXRtJtUxGtl
```

### 🌐 **URL do Backend**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## ⚙️ Configurações Necessárias no Backend Laravel

### 1. **Configurar CORS (Obrigatório)**

No arquivo `config/cors.php` do Laravel:

```php
<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',  // Frontend Next.js
        'http://127.0.0.1:3000',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 2. **Rotas de API no Laravel**

Crie as rotas em `routes/api.php`:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas de autenticação
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::get('user', [AuthController::class, 'user'])->middleware('auth:api');
});

// Rotas protegidas para dados científicos
Route::middleware('auth:api')->group(function () {
    Route::get('glitches', [GlitchController::class, 'index']);
    Route::post('glitches', [GlitchController::class, 'store']);
    Route::get('classifications', [ClassificationController::class, 'index']);
    Route::post('classifications', [ClassificationController::class, 'store']);
    Route::get('spectrograms', [SpectrogramController::class, 'index']);
    Route::post('spectrograms', [SpectrogramController::class, 'store']);
    Route::get('detectors', [DetectorController::class, 'index']);
});
```

### 3. **Configurar JWT no Laravel**

Instale o JWT (se ainda não instalou):

```bash
composer require tymon/jwt-auth
```

Configure no `config/jwt.php`:

```php
'secret' => env('JWT_SECRET'),
'ttl' => 60 * 24 * 7, // 7 dias
```

### 4. **AuthController Exemplo**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
        
        return response()->json([
            'message' => 'Login realizado com sucesso',
            'token' => $token,
            'user' => Auth::user()
        ]);
    }
    
    public function register(Request $request)
    {
        // Implementar lógica de registro
        // Validar dados, criar usuário, retornar token
    }
    
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
    
    public function refresh()
    {
        return response()->json([
            'token' => Auth::refresh(),
            'user' => Auth::user()
        ]);
    }
    
    public function user()
    {
        return response()->json(Auth::user());
    }
}
```

## 🚀 **Como Testar a Conexão**

### 1. **Inicie o backend Laravel:**
```bash
cd /caminho/para/seu/backend
php artisan serve
# Deve rodar em http://localhost:8000
```

### 2. **Frontend já está configurado:**
- Frontend: http://localhost:3000
- Página de teste: http://localhost:3000/test-env

### 3. **Teste a conexão:**
```bash
# Teste se o backend está respondendo
curl http://localhost:8000/api/health

# Teste autenticação
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## 🛠️ **Solução de Problemas**

### ❌ **Erro CORS**
- Verifique se configurou o `config/cors.php`
- Confirme se o middleware CORS está ativo

### ❌ **Erro 404 nas rotas**
- Verifique se as rotas estão em `routes/api.php`
- Confirme se o prefixo `/api` está correto

### ❌ **Erro JWT Token**
- Confirme se `JWT_SECRET` é idêntico no frontend e backend
- Verifique se o package JWT está instalado no Laravel

### ❌ **Erro de conexão**
- Confirme se o Laravel está rodando na porta 8000
- Teste a URL manualmente: http://localhost:8000

## ✅ **Status da Configuração**

- ✅ **Frontend**: Configurado para http://localhost:8000
- ✅ **JWT Secret**: Sincronizado entre frontend e backend
- ✅ **Endpoints**: Mapeados para as rotas Laravel
- ✅ **CORS**: Instruções fornecidas
- ✅ **Estrutura**: Pronta para comunicação

---

**🎯 Próximo passo**: Configure o CORS no Laravel e inicie o servidor com `php artisan serve`!