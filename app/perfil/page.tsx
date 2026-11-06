import Button from "@/components/Button";
import Input from "@/components/Input";
import editFuncionarioData, { getFuncionarioData } from "./actions";

export default async function Perfil() {
  const funcionario = await getFuncionarioData();
  const editAction = editFuncionarioData.bind(null, funcionario.id);

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text">
      <div className="mx-auto max-w-[700px]">
        <h1 className="mb-lg font-title text-h1 font-h1">Meu Perfil🫓</h1>

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
      </div>
    </main>
  );
}