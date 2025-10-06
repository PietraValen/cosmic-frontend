# Guia de Conexão Laravel Backend

## Configuração Backend Laravel

### 1. Configuração de CORS

Certifique-se de que o Laravel tem CORS configurado adequadamente:

```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

### 2. Rotas de API

As seguintes rotas devem estar configuradas no Laravel:

```php
// routes/api.php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});
```

### 3. Estrutura de Resposta Esperada

O Laravel deve retornar respostas no seguinte formato:

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "id": 1,
    "name": "Usuário Teste",
    "email": "test@test.com",
    "role": "user"
  },
  "token": "jwt_token_aqui"
}
```

### 4. Modelo User

```php
// app/Models/User.php
protected $fillable = [
    'name',
    'email',
    'password',
    'role'
];

protected $hidden = [
    'password',
    'remember_token',
];
```

### 5. Controller de Autenticação

```php
// app/Http/Controllers/AuthController.php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('cosmic-app')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login realizado com sucesso',
            'data' => $user,
            'token' => $token
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Credenciais inválidas'
    ], 401);
}
```

## Configuração Frontend

### 1. Variáveis de Ambiente

```env
# URL do backend Laravel
NEXT_PUBLIC_API_URL=http://localhost:8000

# Endpoints da API
NEXT_PUBLIC_API_AUTH_LOGIN=/api/login
NEXT_PUBLIC_API_AUTH_REGISTER=/api/register
NEXT_PUBLIC_API_AUTH_LOGOUT=/api/logout
```

### 2. Headers Configurados

O frontend envia automaticamente:
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Requested-With: XMLHttpRequest`
- `Authorization: Bearer {token}` (quando logado)

## Teste de Conexão

### 1. Verificar se o Laravel está rodando:
```bash
php artisan serve
# Deve estar em http://localhost:8000
```

### 2. Testar endpoint de login:
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

### 3. Verificar logs:
- Frontend: Console do navegador (F12)
- Backend: `storage/logs/laravel.log`

## Usuário de Teste

Certifique-se de ter um usuário criado no banco:

```php
// database/seeders/UserSeeder.php
User::create([
    'name' => 'Usuário Teste',
    'email' => 'test@test.com',
    'password' => Hash::make('123456'),
    'role' => 'user'
]);
```

## Solução de Problemas

### CORS Errors:
- Verificar configuração do CORS no Laravel
- Certificar que a origem está permitida

### 404 Not Found:
- Verificar se as rotas estão definidas
- Confirmar que o prefixo `/api` está correto

### 401 Unauthorized:
- Verificar se o usuário existe no banco
- Confirmar se a senha está correta
- Verificar configuração do Sanctum

### Token Issues:
- Verificar se o Sanctum está configurado
- Confirmar que o token está sendo enviado nos headers
- Verificar se o middleware auth:sanctum está aplicado