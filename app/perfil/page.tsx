export default function Perfil() {
  const funcionario = {
    nome: "Marco",
    email: "Adimin@gmail.com",
    cargo: "Funcionario",
    matricula: "00240",
    status: "Ativo",
  };

  const informacoes = [
    { titulo: "Nome completo", valor: funcionario.nome },
    { titulo: "Email", valor: funcionario.email },
    { titulo: "Cargo", valor: funcionario.cargo },
    { titulo: "Matrícula", valor: funcionario.matricula },
    { titulo: "Status", valor: funcionario.status },
  ];
  const inicial = funcionario.nome.charAt(0).toUpperCase();

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
                {inicial}
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
              {informacoes.map((item) => (
                <div
                  key={item.titulo}
                  className="rounded-md border border-border bg-surface px-lg py-lg"
                >
                  <p className="text-label font-label text-text-muted">
                    {item.titulo}
                  </p>
                  <p className="mt-xs break-words text-body text-text">
                    {item.valor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
