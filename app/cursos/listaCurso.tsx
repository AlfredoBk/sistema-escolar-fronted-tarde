"use client";

import { useMemo, useState } from "react";

export type Course = {
  id: string;
  nome: string;
  descricao: string;
  cargaHoraria: string;
  status: string;
};

export default function ListaCurso({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalizedQuery) return courses;

    return courses.filter((course) =>
      [course.nome, course.descricao, course.status].some((value) =>
        value.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
      ),
    );
  }, [courses, query]);

  return (
    <section>
      <label
        className="mb-xs block text-label font-label"
        htmlFor="course-search"
      >
        Buscar curso
      </label>
      <input
        className="mb-md box-border block min-h-11 w-full max-w-full rounded-md border border-border-strong bg-surface px-md py-sm text-body text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        id="course-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Digite o nome ou descrição do curso"
        size={40}
        style={{ width: "min(100%, 32rem)" }}
        type="search"
        value={query}
      />

      <p aria-live="polite" className="mb-sm text-caption text-text-muted">
        {filteredCourses.length}{" "}
        {filteredCourses.length === 1 ? "curso" : "cursos"}
      </p>

      {filteredCourses.length === 0 ? (
        <p className="rounded-md border border-border bg-surface px-lg py-xl text-center text-body text-text-muted">
          {courses.length === 0
            ? "Nenhum curso cadastrado."
            : "Nenhum curso encontrado para essa busca."}
        </p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-md border border-border bg-surface">
          {filteredCourses.map((course) => (
            <li
              className="flex flex-col gap-sm px-md py-md tablet:flex-row tablet:items-center tablet:justify-between tablet:px-lg"
              key={course.id}
            >
              <div className="flex min-w-0 items-center gap-md">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-label text-primary"
                >
                  {course.nome.trim().charAt(0).toUpperCase() || "C"}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-label text-text">
                    {course.nome || "Curso sem nome"}
                  </p>
                  {course.descricao && (
                    <p className="mt-xs line-clamp-2 text-caption text-text-muted">
                      {course.descricao}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-md pl-14 tablet:justify-end tablet:pl-0">
                {course.cargaHoraria && (
                  <span className="text-caption text-text-muted">
                    Carga horária: {course.cargaHoraria}
                  </span>
                )}
                {course.status && (
                  <span className="shrink-0 rounded-full bg-primary-soft px-sm py-xs text-caption text-text">
                    {course.status}
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
