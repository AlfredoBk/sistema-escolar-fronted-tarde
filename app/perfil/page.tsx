export default function Perfil() {

    
  const funcionario = {
    nome: "Marco Orelhas",
    email: "Adimin@gmail.com",
    cargo: "Funcionario",
    matricula: "6767",
    status: "Vivo com salario de R$ - 676767",
  };

  return (
    <main className="min-h-screen w-full bg-background text-text">
      <header className="h-8 border-b border-primary-strong bg-primary-strong">
        <div className="h-full border-b-[3px] border-text bg-primary" />
      </header>

      <section className="flex min-h-[calc(100vh-32px)] flex-col items-center px-md pb-lg pt-[clamp(64px,9vh,112px)] tablet:px-xl">
        <div className="w-full max-w-[360px]">
          <h1 className="mb-sm font-title text-h1 font-h1 text-text-muted">
            Perfil 👤
          </h1>

          <div className="w-full rounded-md border border-primary-strong bg-primary-soft px-xl py-xl">
            <div className="mb-lg flex items-center gap-lg rounded-md bg-surface px-lg py-lg">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary-strong text-h1 text-button-text">
                M
              </div>

              <div>
                <h2 className="font-title text-h2 font-h2 text-text">
                  {funcionario.nome}
                </h2>
                <p className="mt-xs text-body text-text-muted">
                  {funcionario.cargo}
                </p>
              </div>
            </div>

              <div className="space-y-md">
                <div className="rounded-md bg-surface px-lg py-lg">
                  <p className="text-label font-label text-text-muted">Nome completo</p>
                  <p className="mt-xs break-words text-body text-text">{funcionario.nome}</p>
                </div>

                <div className="rounded-md bg-surface px-lg py-lg">
                  <p className="text-label font-label text-text-muted">Email</p>
                  <p className="mt-xs break-words text-body text-text">{funcionario.email}</p>
                </div>

                <div className="rounded-md bg-surface px-lg py-lg">
                  <p className="text-label font-label text-text-muted">Cargo</p>
                  <p className="mt-xs text-body text-text">{funcionario.cargo}</p>
                </div>

                <div className="rounded-md bg-surface px-lg py-lg">
                  <p className="text-label font-label text-text-muted">Matrícula</p>
                  <p className="mt-xs text-body text-text">{funcionario.matricula}</p>
                </div>

                <div className="rounded-md bg-surface px-lg py-lg">
                  <p className="text-label font-label text-text-muted">Status</p>
                  <p className="mt-xs text-body text-text">{funcionario.status}</p>
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
