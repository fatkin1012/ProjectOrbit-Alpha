import { NextResponse } from "next/server";
import {
  deleteImportedRepository,
  importRepository,
  loadImportedRepos,
  updateImportedRepositoryCategory,
} from "@/lib/repo-import";

export const runtime = "nodejs";

export async function GET() {
  try {
    const repos = await loadImportedRepos();
    return NextResponse.json({ repos });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load imported repositories.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { repoUrl?: string; category?: string };
    const repoUrl = body.repoUrl?.trim();

    if (!repoUrl) {
      return NextResponse.json({ error: "repoUrl is required." }, { status: 400 });
    }

    const imported = await importRepository(repoUrl, { category: body.category });
    return NextResponse.json({ imported }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to import repository.";
    const status = message.includes("already imported") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { repoId?: string; category?: string };
    const repoId = body.repoId?.trim();

    if (!repoId) {
      return NextResponse.json({ error: "repoId is required." }, { status: 400 });
    }

    const updated = await updateImportedRepositoryCategory(repoId, body.category ?? "Imported");
    return NextResponse.json({ updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update repository category.";
    const status = message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { repoId?: string };
    const repoId = body.repoId?.trim();

    if (!repoId) {
      return NextResponse.json({ error: "repoId is required." }, { status: 400 });
    }

    const deleted = await deleteImportedRepository(repoId);
    return NextResponse.json({ deleted });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete repository.";
    const status = message.includes("not found")
      ? 404
      : message.includes("in use")
        ? 409
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
