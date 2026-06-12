import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const rankings = await db.quizResult.findMany({
      select: {
        id: true,
        score: true,
        totalQuestions: true,
        percentage: true,
        completedAt: true,
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { percentage: "desc" },
      take: 50,
    });

    return NextResponse.json(rankings);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar ranking" },
      { status: 500 }
    );
  }
}
