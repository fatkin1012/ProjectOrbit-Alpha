import { NextResponse } from "next/server";
import { activateImportedRepository } from "@/lib/repo-import";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      repoId?: string;
      transformLevel?: "strict" | "balanced" | "safe";
    };
    const repoId = body.repoId?.trim();

    if (!repoId) {
      return NextResponse.json({ error: "repoId is required." }, { status: 400 });
    }

    const activated = await activateImportedRepository(repoId, body.transformLevel);
    return NextResponse.json({ activated }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to activate repository.";
    const status =
      message.includes("already activated") || message.includes("already exists") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
