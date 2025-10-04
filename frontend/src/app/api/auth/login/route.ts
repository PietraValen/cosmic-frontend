// API Route para login (Next.js App Router)
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Simulação de banco de dados - substitua por sua implementação real
const users = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    password: "$2b$10$...", // Hash da senha "123456"
    role: "user",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar usuário no banco de dados
    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Gerar JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "seu-jwt-secret",
      { expiresIn: "7d" }
    );

    // Retornar usuário (sem senha) e token
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login realizado com sucesso",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
