// API Route para registro (Next.js App Router)
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Simulação de banco de dados - substitua por sua implementação real
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validações básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Formato de email inválido" },
        { status: 400 }
      );
    }

    // Validar força da senha
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Senha deve ter pelo menos 8 caracteres" },
        { status: 400 }
      );
    }

    // Verificar se usuário já existe
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já existe com este email" },
        { status: 409 }
      );
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(), // Em produção, use UUID
      name,
      email,
      password: hashedPassword,
      role: "user",
    };

    // Salvar no "banco de dados"
    users.push(newUser);

    // Gerar JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "seu-jwt-secret",
      { expiresIn: "7d" }
    );

    // Retornar usuário (sem senha) e token
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return NextResponse.json(
      {
        message: "Conta criada com sucesso",
        token,
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
