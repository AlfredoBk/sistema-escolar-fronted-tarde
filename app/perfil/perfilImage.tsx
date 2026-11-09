"use client";

import { ChangeEvent, startTransition, useEffect, useState } from "react";

type Props = {
  funcionarioId: string;
  nome: string;
};

type ProfileMedia = {
  foto: string | null;
  banner: string | null;
};

const MAX_FILE_SIZE = 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function isStoredImage(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(value)
  );
}

export default function PerfilImage({ funcionarioId, nome }: Props) {
  const storageKey = `gestao-escolar:perfil-media:${funcionarioId}`;
  const [media, setMedia] = useState<ProfileMedia>({
    foto: null,
    banner: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;

      const parsed: unknown = JSON.parse(saved);
      if (typeof parsed !== "object" || parsed === null) return;

      const stored = parsed as Record<string, unknown>;
      startTransition(() => {
        setMedia({
          foto: isStoredImage(stored.foto) ? stored.foto : null,
          banner: isStoredImage(stored.banner) ? stored.banner : null,
        });
      });
    } catch {
      startTransition(() => {
        setError("Não foi possível carregar as imagens salvas neste navegador.");
      });
    }
  }, [storageKey]);

  function saveMedia(nextMedia: ProfileMedia) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextMedia));
      setMedia(nextMedia);
      setError("");
    } catch {
      setError("Não foi possível salvar. Libere espaço no navegador e tente novamente.");
    }
  }

  function handleUpload(kind: keyof ProfileMedia) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      event.currentTarget.value = "";
      if (!file) return;

      if (!IMAGE_TYPES.includes(file.type)) {
        setError("Use uma imagem nos formatos JPG, PNG ou WEBP.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("A imagem deve ter no máximo 1 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== "string" || !isStoredImage(reader.result)) {
          setError("Não foi possível ler a imagem selecionada.");
          return;
        }

        saveMedia({ ...media, [kind]: reader.result });
      };
      reader.onerror = () => {
        setError("Não foi possível ler a imagem selecionada.");
      };
      reader.readAsDataURL(file);
    };
  }

  function removeImage(kind: keyof ProfileMedia) {
    saveMedia({ ...media, [kind]: null });
  }

  return (
    <section
      aria-label="Imagens do perfil"
      className="mb-lg rounded-md border border-border bg-surface"
    >
      <div
        className="relative flex h-40 items-center justify-center rounded-t-md bg-primary-soft bg-cover bg-center tablet:h-48"
        style={
          media.banner
            ? { backgroundImage: `url("${media.banner}")` }
            : undefined
        }
      >
        <div className="absolute right-md top-md flex gap-sm">
          <label className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-surface text-text shadow-sm hover:bg-background">
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="m15 5 4 4M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" />
            </svg>
            <input
              accept="image/jpeg,image/png,image/webp"
              aria-label="Adicionar ou alterar banner"
              className="sr-only"
              onChange={handleUpload("banner")}
              type="file"
            />
          </label>
          <button
            aria-label="Remover banner"
            className="flex size-10 items-center justify-center rounded-full bg-surface text-text-muted shadow-sm hover:bg-background hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!media.banner}
            onClick={() => removeImage("banner")}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3" />
            </svg>
          </button>
        </div>

        <div
          aria-label={media.foto ? `Foto de ${nome}` : undefined}
          className="absolute bottom-0 left-lg z-10 flex size-20 translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-primary text-h2 font-h2 text-button-text"
          role={media.foto ? "img" : undefined}
          style={
            media.foto
              ? { backgroundImage: `url("${media.foto}")`, backgroundSize: "cover" }
              : undefined
          }
        >
          {!media.foto && (nome.trim().charAt(0).toUpperCase() || "?")}
        </div>
      </div>

      <div className="flex min-h-14 items-end gap-md px-lg pb-lg pt-10">
        <div className="flex items-center gap-sm pb-xs">
          <label className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface text-text shadow-sm hover:bg-background">
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="m15 5 4 4M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" />
            </svg>
            <input
              accept="image/jpeg,image/png,image/webp"
              aria-label="Adicionar ou alterar foto de perfil"
              className="sr-only"
              onChange={handleUpload("foto")}
              type="file"
            />
          </label>
          {media.foto && (
            <button
              aria-label="Remover foto de perfil"
              className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-surface text-text-muted shadow-sm hover:bg-background hover:text-error"
              onClick={() => removeImage("foto")}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {error && (
        <p aria-live="polite" className="px-lg pb-md text-caption text-error">
          {error}
        </p>
      )}
    </section>
  );
}
