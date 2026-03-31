import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAFAF8; color: #1a1a18; }
        a { text-decoration: none; color: inherit; }

        .auth-wrap {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* Left panel */
        .auth-left {
          background: #1a1a18;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .auth-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 110%, #3B6D11 0%, transparent 60%);
          opacity: 0.5;
          pointer-events: none;
        }
        .auth-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #FAFAF8;
          position: relative;
        }
        .auth-left-content { position: relative; }
        .auth-left-content h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: #FAFAF8;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .auth-left-content h2 em { font-style: italic; color: #97C459; }
        .auth-left-content p {
          font-size: 1rem;
          color: #888780;
          line-height: 1.7;
          font-weight: 300;
          max-width: 360px;
          margin-bottom: 2.5rem;
        }
        .auth-perks { display: flex; flex-direction: column; gap: 1.25rem; }
        .auth-perk {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .perk-icon {
          width: 36px;
          height: 36px;
          background: rgba(59, 109, 17, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .perk-text strong {
          display: block;
          font-size: 0.9rem;
          color: #FAFAF8;
          font-weight: 500;
          margin-bottom: 0.2rem;
        }
        .perk-text span { font-size: 0.825rem; color: #888780; font-weight: 300; }

        .auth-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 2rem 0;
          position: relative;
        }
        .auth-free-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(59, 109, 17, 0.15);
          border: 1px solid rgba(59, 109, 17, 0.3);
          border-radius: 100px;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          color: #97C459;
          position: relative;
        }
        .free-dot { width: 6px; height: 6px; background: #97C459; border-radius: 50%; }

        /* Right panel */
        .auth-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          background: #FAFAF8;
        }
        .auth-form-wrap { width: 100%; max-width: 400px; }
        .auth-form-header { margin-bottom: 2.5rem; }
        .auth-form-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }
        .auth-form-header p { font-size: 0.9375rem; color: #888780; font-weight: 300; }
        .auth-form-header a { color: #3B6D11; font-weight: 500; }
        .auth-form-header a:hover { text-decoration: underline; }
        .auth-disclaimer {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: #888780;
          text-align: center;
          line-height: 1.6;
        }
        .auth-disclaimer a { color: #3B6D11; }

        @media (max-width: 768px) {
          .auth-wrap { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { min-height: 100vh; }
        }
      `}</style>

      <div className="auth-wrap">
        {/* Left panel */}
        <div className="auth-left">
          <Link href="/" className="auth-logo">Skilld</Link>

          <div className="auth-left-content">
            <h2>Your learning journey <em>starts</em> here.</h2>
            <p>Join thousands of curious people who are building better skills, one lesson at a time.</p>
            <div className="auth-perks">
              {[
                { icon: '⚡', title: 'Instant access', sub: 'Start your first course in under 2 minutes.' },
                { icon: '🎯', title: '20 free courses included', sub: 'No credit card needed, ever.' },
                { icon: '📱', title: 'Learn anywhere', sub: 'Works on any device, any time.' },
                { icon: '📈', title: 'Track your progress', sub: 'Streaks and insights keep you on track.' },
              ].map((p) => (
                <div className="auth-perk" key={p.title}>
                  <div className="perk-icon">{p.icon}</div>
                  <div className="perk-text">
                    <strong>{p.title}</strong>
                    <span>{p.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-free-badge">
            <div className="free-dot" />
            Free forever — no credit card required
          </div>
        </div>

        {/* Right sign-up panel */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-form-header">
              <h1>Create your account</h1>
              <p>Already have one? <Link href="/sign-in">Sign in →</Link></p>
            </div>
            <SignUp
              appearance={{
                elements: {
                  rootBox: { width: '100%' },
                  card: { boxShadow: 'none', border: '1px solid #e8e6e0', borderRadius: '16px', background: '#fff' },
                  headerTitle: { display: 'none' },
                  headerSubtitle: { display: 'none' },
                  socialButtonsBlockButton: { borderRadius: '100px', border: '1px solid #e8e6e0', fontFamily: "'DM Sans', sans-serif" },
                  formButtonPrimary: { background: '#1a1a18', borderRadius: '100px', fontFamily: "'DM Sans', sans-serif" },
                  footerActionLink: { color: '#3B6D11' },
                }
              }}
            />
            <p className="auth-disclaimer">
              By creating an account you agree to our{' '}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}