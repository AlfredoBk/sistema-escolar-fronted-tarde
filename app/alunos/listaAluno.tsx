"use client";

import { useMemo, useState } from "react";

export type Student = {
  id: string;
  nome: string;
  matricula: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;
  status: string;
};

export default function ListaAluno({ students }: { students: Student[] }) {
  const [query, setQuery] = useState("");
  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalizedQuery) return students;

    return students.filter((student) =>
      [student.nome, student.cpf, student.matricula].some((value) =>
        value.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
      ),
    );
  }, [query, students]);

  return (
    <section>
      <label
        className="mb-xs block text-label font-label"
        htmlFor="student-search"
      >
        Buscar aluno
      </label>
      <input
        className="mb-md box-border block min-h-11 w-full max-w-full rounded-md border border-border-strong bg-surface px-md py-sm text-body text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        id="student-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Digite o nome, matrícula ou CPF"
        size={40}
        style={{ width: "min(100%, 32rem)" }}
        type="search"
        value={query}
      />

      <p aria-live="polite" className="mb-sm text-caption text-text-muted">
        {filteredStudents.length}{" "}
        {filteredStudents.length === 1 ? "aluno" : "alunos"}
      </p>

      {filteredStudents.length === 0 ? (
        <p className="rounded-md border border-border bg-surface px-lg py-xl text-center text-body text-text-muted">
          {students.length === 0
            ? "Nenhum aluno cadastrado."
            : "Nenhum aluno encontrado para essa busca."}
        </p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-md border border-border bg-surface">
          {filteredStudents.map((student) => (
            <li
              className="flex flex-col gap-sm px-md py-md tablet:flex-row tablet:items-center tablet:justify-between tablet:px-lg"
              key={student.id}
            >
              <div className="flex min-w-0 items-center gap-md">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-label text-primary"
                >
                  {student.nome.trim().charAt(0).toUpperCase() || "A"}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-label text-text">
                    {student.nome || "Sem nome"}
                  </p>
                  <p className="mt-xs truncate text-caption text-text-muted">
                    Matrícula: {student.matricula || "—"}
                    {student.email ? ` · ${student.email}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-md pl-14 tablet:justify-end tablet:pl-0">
                {student.telefone && (
                  <span className="text-caption text-text-muted">
                    {student.telefone}
                  </span>
                )}
                {student.status && (
                  <span className="shrink-0 rounded-full bg-primary-soft px-sm py-xs text-caption text-text">
                    {student.status}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
