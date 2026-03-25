import { NextResponse } from "next/server";
import { checkAndUpdateImportedRepository } from "@/lib/repo-import";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { repoId?: string };
    const repoId = body.repoId?.trim();

    if (!repoId) {
      return NextResponse.json({ error: "repoId is required." }, { status: 400 });
    }

    const result = await checkAndUpdateImportedRepository(repoId);
    console.log(`[RepoUpdate] ${repoId} trace: ${result.trace.join(" -> ")}`);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to check repository updates.";
    const status = message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
