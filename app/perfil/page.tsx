import { Suspense } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Sidebar from "@/components/sidebar";
import editFuncionarioData, { getFuncionarioData } from "./actions";
import PerfilImage from "./perfilImage";

async function ProfileForm() {
  const funcionario = await getFuncionarioData();
  const editAction = editFuncionarioData.bind(null, funcionario.id);

  return (
    <>
      <PerfilImage
        funcionarioId={String(funcionario.id)}
        nome={funcionario.nome ?? ""}
      />

      <form
        action={editAction}
        className="rounded-md border border-border bg-surface p-xl"
      >
        <div className="grid gap-md tablet:grid-cols-2">
            <Input
              id="nome"
              label="Nome Completo"
              required
              defaultValue={funcionario.nome}
              name="nome"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="email"
              label="Email"
              type="email"
              required
              defaultValue={funcionario.email}
              name="email"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="telefone"
              label="Telefone"
              defaultValue={funcionario.telefone}
              name="telefone"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="nascimento"
              label="Data de Nascimento"
              defaultValue={funcionario.nascimento}
              name="nascimento"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="cpf"
              label="CPF"
              required
              defaultValue={funcionario.cpf}
              name="cpf"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="endereco"
              label="Endereço"
              defaultValue={funcionario.endereco}
              name="endereco"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="cargo"
              label="Cargo"
              required
              defaultValue={funcionario.cargo}
              name="cargo"
              labelClassName="mb-xs"
              className="w-full"
            />
            <Input
              id="senha"
              label="Nova Senha"
              name="senha"
              type="password"
              labelClassName="mb-xs"
              className="w-full"
            />
        </div>

        <div className="mt-lg flex justify-end">
          <Button type="submit" className="w-full px-xl tablet:w-auto">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </>
  );
}

export default function Perfil() {
  return (
    <div className="flex min-h-screen flex-col bg-background tablet:flex-row">
      <Sidebar activeItem="perfil" />
      <main className="min-h-screen flex-1 px-md py-xl text-text">
        <div className="mx-auto max-w-[700px]">
          <h1 className="mb-lg text-center font-title text-h1 font-h1">
            Perfil
          </h1>

          <Suspense
            fallback={
              <p className="rounded-md border border-border bg-surface p-lg text-body text-text-muted">
                Carregando perfil...
              </p>
            }
          >
            <ProfileForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}