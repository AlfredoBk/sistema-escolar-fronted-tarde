import "./page-module.css";

export default function Login() {
  return (
    <main className="main">
      <div className="topBand" aria-hidden="true" />
      <header className="header" aria-hidden="true" />

      <section className="content" aria-labelledby="login-title">
        <div className="panel">
          <h1 className="title" id="login-title">
            Login
          </h1>

          <div className="loginFrame">
            <form className="form">
              <div className="fields">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu Email"
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Digite sua Senha"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button className="submit" type="button">
                Acessar
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="bottomPanels" aria-hidden="true">
        <div className="bottomPanelTop" />
        <div className="bottomPanelBase" />
      </div>
    </main>
  );
}