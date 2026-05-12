import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import heroImg from "./assets/hero.png";
import "./App.css";
import Users from "./components/users";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app-shell">
        <nav className="glass-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#overview" aria-label="Auralis home">
            <span className="brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 15.5 10.5 4l3.2 8.2L19 8.7l-5.6 11.1-3.1-8.1L5 15.5Z" />
              </svg>
            </span>
            Auralis
          </a>

          <div className="nav-menu">
            <a href="#overview">Overview</a>
            <a href="#users">Users</a>
            <a href="#insights">Insights</a>
          </div>

          <button className="icon-action" type="button" aria-label="Open command menu">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </nav>

        <section className="hero-section" id="overview">
          <div className="hero-copy">
            <span className="eyebrow">Future-ready control room</span>
            <h1>Glass data workspace for calmer user operations.</h1>
            <p>
              Track users, inspect details, and move through paginated data in a
              focused interface with soft glass layers and responsive motion.
            </p>

            <div className="hero-actions" aria-label="Primary actions">
              <a className="button-primary" href="#users">
                Open dashboard
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
              <button className="button-ghost" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New view
              </button>
            </div>
          </div>

          <div className="visual-stage" aria-hidden="true">
            <img src={heroImg} className="hero-object" alt="" />
            <div className="signal-card card-one">
              <span>Latency</span>
              <strong>18ms</strong>
            </div>
            <div className="signal-card card-two">
              <span>Sync</span>
              <strong>98%</strong>
            </div>
            <div className="wave-progress">
              <span></span>
            </div>
          </div>
        </section>

        <section className="metric-strip" id="insights" aria-label="System metrics">
          <article>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 17 9 11l4 4 7-8" />
              <path d="M4 20h16" />
            </svg>
            <span>Active flow</span>
            <strong>24.8k</strong>
          </article>
          <article>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 4 7v6c0 5 3.5 7.5 8 8 4.5-.5 8-3 8-8V7l-8-4Z" />
              <path d="m9 12 2 2 4-5" />
            </svg>
            <span>Trust score</span>
            <strong>99.2%</strong>
          </article>
          <article>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12a8 8 0 1 1 8 8" />
              <path d="M4 12h4l2 3 4-7 2 4h4" />
            </svg>
            <span>Pulse load</span>
            <strong>42%</strong>
          </article>
        </section>

        <section className="dashboard-panel" id="users">
          <div className="section-heading">
            <span className="eyebrow">Live directory</span>
            <h2>User intelligence</h2>
            <p>Minimal controls, high contrast data, and glass overlays for focused scanning.</p>
          </div>

          <Users />
        </section>

        <footer className="app-footer">
          <span>Auralis interface system</span>
          <div className="footer-links" aria-label="Footer links">
            <a href="#overview">Top</a>
            <a href="#users">Directory</a>
          </div>
        </footer>
      </main>
    </QueryClientProvider>
  );
}

export default App;
