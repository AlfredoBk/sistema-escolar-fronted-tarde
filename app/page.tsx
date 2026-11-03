import Button from "@/components/Button";
import { login } from "./actions";
import Input from "@/components/Input";

export default function Login() {
  return (
    <main className="min-h-screen w-full bg-background text-text">
      <header className="h-8 border-b border-primary-strong bg-primary-strong">
        <div className="h-full border-b-[3px] border-text bg-primary" />
      </header>

      <section className="flex min-h-[calc(100vh-32px)] flex-col items-center px-md pb-lg pt-[clamp(64px,9vh,112px)] tablet:px-xl">
        <div className="w-full max-w-[360px]">
          <h1 className="mb-sm font-title text-h1 font-h1 text-text-muted">
            Login 👤
          </h1>

          <form
            className="w-full rounded-md border border-primary-strong bg-primary-soft px-xl py-xl"
            action={login}
          >
            <div className="mx-auto mb-lg rounded-md bg-surface px-lg py-xl">
              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Digite Seu Email"
                wrapperClassName="mb-sm"
                labelClassName="mb-xs text-[12px]"
                className="w-full"
              />
              <Input
                id="password"
                label="Senha"
                name="senha"
                type="password"
                placeholder="Digite Sua Senha"
                wrapperClassName="mb-0"
                labelClassName="mb-xs text-[12px]"
                className="w-full"
              />
            </div>

            <div className="mx-auto flex justify-center">
              <Button
                type="submit"
                variant="primary"
                className="h-8 min-w-[110px] rounded-sm px-xl py-xs text-body font-body text-white"
              >
                Acessar
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-auto w-full max-w-[360px] space-y-md pt-xl">
          <div className="h-11 w-full rounded-md border border-primary-strong bg-surface" />
          <div className="h-28 w-full rounded-md border border-primary-strong bg-primary-soft" />
        </div>
      </section>
    </main>
  );
}