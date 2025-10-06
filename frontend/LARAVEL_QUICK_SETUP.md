# Configuração Rápida do Laravel para Cosmic Frontend

## 1. CORS Configuration

Edite o arquivo `config/cors.php` no Laravel:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

## 2. Rotas de API

Crie ou edite `routes/api.php`:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Credenciais inválidas'
        ], 401);
    }

    $token = $user->createToken('cosmic-app')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Login realizado com sucesso',
        'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ?? 'user'
        ],
        'token' => $token
    ]);
});

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'user'
    ]);

    $token = $user->createToken('cosmic-app')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Usuário criado com sucesso',
        'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role
        ],
        'token' => $token
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso'
        ]);
    });

    Route::get('/user', function (Request $request) {
        $user = $request->user();
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ?? 'user'
            ]
        ]);
    });
});
```

## 3. Criar Usuário de Teste

Execute no Laravel:

```bash
php artisan tinker
```

Depois execute no tinker:

```php
use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::create([
    'name' => 'Usuario Teste',
    'email' => 'test@test.com',
    'password' => Hash::make('123456'),
    'role' => 'user'
]);
```

## 4. Adicionar Role na Migration (se necessário)

Se a coluna `role` não existe, crie uma migration:

```bash
php artisan make:migration add_role_to_users_table
```

```php
// migration file
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('role')->default('user');
    });
}
```

```bash
php artisan migrate
```

## 5. Configurar Sanctum

Certifique-se de que o Sanctum está instalado:

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

Adicione no `app/Models/User.php`:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];
}
```

## 6. Testar

Depois de fazer essas configurações:

1. Pare o servidor Laravel (Ctrl+C)
2. Execute novamente: `php artisan serve`
3. Teste no frontend: http://localhost:3000/test-connection