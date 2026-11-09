import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import Sidebar from "@/components/sidebar";
import ListaCurso, { type Course } from "./listaCurso";

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function asText(value: unknown): string {
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : "";
}

function readCourses(value: unknown): Course[] | null {
  const root = asRecord(value);
  const nestedData = asRecord(root?.data);
  const rows = Array.isArray(value)
    ? value
    : Array.isArray(root?.cursos)
      ? root.cursos
      : Array.isArray(root?.data)
        ? root.data
        : Array.isArray(nestedData?.cursos)
          ? nestedData.cursos
          : null;

  if (!rows) return null;

  return rows.map((row, index) => {
    const course = asRecord(row) ?? {};
    return {
      id: asText(course.id) || String(index),
      nome: asText(course.nome) || asText(course.titulo),
      descricao: asText(course.descricao),
      cargaHoraria:
        asText(course.cargaHoraria) ||
        asText(course.carga_horaria) ||
        asText(course.duracao),
      status: asText(course.status),
    };
  });
}

async function getCourses(): Promise<
  { ok: true; courses: Course[] } | { ok: false; error: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("@gestao-escolar/token")?.value;
  if (!token) redirect("/");

  await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

  let response: Response;
  try {
    response = await fetch(`${process.env.API_URL}/cursos`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
    };
  }

  if (response.status === 401) redirect("/");
  if (!response.ok) {
    return {
      ok: false,
      error: "Não foi possível carregar a lista de cursos.",
    };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "O servidor retornou uma resposta inválida para a lista de cursos.",
    };
  }

  const courses = readCourses(data);
  if (!courses) {
    return {
      ok: false,
      error: "A resposta do servidor não contém uma lista de cursos válida.",
    };
  }

  return { ok: true, courses };
}

async function CourseResults() {
  const result = await getCourses();

  if (!result.ok) {
    return (
      <p
        aria-live="polite"
        className="rounded-md border border-error bg-surface p-lg text-body text-error"
      >
        {result.error}
      </p>
    );
  }

  return <ListaCurso courses={result.courses} />;
}

export default function CursosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background tablet:flex-row">
      <Sidebar activeItem="cursos" />
      <main className="min-w-0 flex-1 px-md py-xl text-text tablet:px-xl">
        <div className="mx-auto max-w-6xl">
          <header className="mb-lg">
            <h1 className="font-title text-h1 font-h1">Cursos</h1>
          </header>

          <Suspense
            fallback={
              <p className="rounded-md border border-border bg-surface p-lg text-body text-text-muted">
                Carregando cursos...
              </p>
            }
          >
            <CourseResults />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
