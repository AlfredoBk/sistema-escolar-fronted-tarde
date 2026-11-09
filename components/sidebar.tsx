"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/actions";

type Props = {
  activeItem: "perfil" | "alunos" | "cursos";
};

const links = [
  { href: "/perfil", label: "Meu perfil", item: "perfil", icon: "profile" },
  { href: "/alunos", label: "Alunos", item: "alunos", icon: "students" },
  { href: "/cursos", label: "Cursos", item: "cursos", icon: "courses" },
] as const;

function NavigationIcon({
  name,
}: {
  name: "profile" | "students" | "courses";
}) {
  if (name === "profile") {
    return (
      <svg
        aria-hidden="true"
        className="size-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    );
  }

  if (name === "students") {
    return (
      <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.5a3.5 3.5 0 0 1 0 6.8M18 14a6 6 0 0 1 3.5 5.5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" />
      <path d="m5 10 7 3.7 7-3.7M5 14l7 3.7 7-3.7" />
    </svg>
  );
}

export default function Sidebar({ activeItem }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`flex w-full shrink-0 flex-col border-b border-border bg-surface px-md py-md transition-[width] tablet:min-h-screen tablet:border-b-0 tablet:border-r tablet:px-sm tablet:py-lg ${
        expanded ? "tablet:w-56" : "tablet:w-16"
      }`}
    >
      <div className={`flex items-center ${expanded ? "mb-md justify-between" : "justify-start"}`}>
        {expanded && (
          <Link className="font-title text-h2 font-h2 text-text" href="/">
            Gestão Escolar
          </Link>
        )}
        <button
          aria-expanded={expanded}
          aria-label={expanded ? "Recolher menu" : "Expandir menu"}
          className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border-strong text-text hover:bg-background"
          onClick={() => setExpanded((current) => !current)}
          title={expanded ? "Recolher menu" : "Expandir menu"}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            {expanded ? (
              <path d="M4 6h16M4 12h16M4 18h16" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {expanded && (
        <>
          <nav aria-label="Navegação principal" className="flex flex-col gap-xs">
            {links.map(({ href, label, item, icon }) => (
              <Link
                aria-current={activeItem === item ? "page" : undefined}
                className={`flex items-center gap-md rounded-md px-md py-sm text-body ${
                  activeItem === item
                    ? "bg-primary text-button-text"
                    : "text-text-muted hover:bg-background hover:text-text"
                }`}
                href={href}
                key={item}
              >
                <NavigationIcon name={icon} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <form action={logout} className="mt-md tablet:mt-auto">
            <button
              className="flex w-full items-center gap-md rounded-md border border-border-strong px-md py-sm text-left text-body text-text-muted hover:bg-background hover:text-text"
              type="submit"
            >
              <svg
                aria-hidden="true"
                className="size-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M10 17l5-5-5-5M15 12H3m9-8h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" />
              </svg>
              <span>Sair</span>
            </button>
          </form>
        </>
      )}
    </aside>
  );
}
