import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const bestResult = await db.quizResult.findFirst({
      where: { userId: session.user.id },
      orderBy: { percentage: "desc" },
    });

    return NextResponse.json(bestResult);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar resultado" },
      { status: 500 }
    );
  }
}
