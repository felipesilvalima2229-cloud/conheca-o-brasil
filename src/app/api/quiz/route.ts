import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { score, totalQuestions, percentage } = await req.json();

    if (typeof score !== "number" || typeof totalQuestions !== "number") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const result = await db.quizResult.create({
      data: {
        userId: session.user.id,
        score,
        totalQuestions,
        percentage: percentage || (score / totalQuestions) * 100,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao salvar resultado" },
      { status: 500 }
    );
  }
}
