import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import Sidebar from "@/components/sidebar";
import ListaAluno, { type Student } from "./listaAluno";

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

function readStudents(value: unknown): Student[] | null {
  const root = asRecord(value);
  const nestedData = asRecord(root?.data);
  const rows = Array.isArray(value)
    ? value
    : Array.isArray(root?.alunos)
      ? root.alunos
      : Array.isArray(root?.data)
        ? root.data
        : Array.isArray(nestedData?.alunos)
          ? nestedData.alunos
          : null;

  if (!rows) return null;

  return rows.map((row, index) => {
    const student = asRecord(row) ?? {};
    return {
      id: asText(student.id) || asText(student.matricula) || String(index),
      nome: asText(student.nome),
      matricula: asText(student.matricula),
      cpf: asText(student.cpf),
      nascimento: asText(student.nascimento),
      email: asText(student.email),
      telefone: asText(student.telefone),
      status: asText(student.status),
    };
  });
}

async function getStudents(): Promise<
  { ok: true; students: Student[] } | { ok: false; error: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("@gestao-escolar/token")?.value;
  if (!token) redirect("/");

  await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

  let response: Response;
  try {
    response = await fetch(`${process.env.API_URL}/alunos`, {
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
      error: "Não foi possível carregar a lista de alunos.",
    };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "O servidor retornou uma resposta inválida para a lista de alunos.",
    };
  }

  const students = readStudents(data);
  if (!students) {
    return {
      ok: false,
      error: "A resposta do servidor não contém uma lista de alunos válida.",
    };
  }

  return { ok: true, students };
}

async function StudentResults() {
  const result = await getStudents();

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

  return <ListaAluno students={result.students} />;
}

export default function AlunosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background tablet:flex-row">
      <Sidebar activeItem="alunos" />
      <main className="min-w-0 flex-1 px-md py-xl text-text tablet:px-xl">
        <div className="mx-auto max-w-6xl">
          <header className="mb-lg">
            <h1 className="font-title text-h1 font-h1">Alunos</h1>
          </header>

          <Suspense
            fallback={
              <p className="rounded-md border border-border bg-surface p-lg text-body text-text-muted">
                Carregando alunos...
              </p>
            }
          >
            <StudentResults />
            
          </Suspense>
        </div>
      </main>
    </div>
  );
}
