import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
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
        .auth-proof {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .auth-proof-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #888780;
        }
        .auth-proof-dot {
          width: 8px;
          height: 8px;
          background: #3B6D11;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .auth-testimonial {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
        }
        .auth-testimonial blockquote {
          font-size: 0.9375rem;
          color: #d4d2cc;
          line-height: 1.7;
          font-weight: 300;
          font-style: italic;
          margin-bottom: 1rem;
        }
        .auth-testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .auth-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #eaf3de;
          color: #3B6D11;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 500;
        }
        .auth-testimonial-author strong { font-size: 0.875rem; color: #FAFAF8; }
        .auth-testimonial-author span { font-size: 0.8rem; color: #888780; }

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

        /* Clerk override hints */
        .cl-rootBox { width: 100% !important; }
        .cl-card { box-shadow: none !important; border: 1px solid #e8e6e0 !important; border-radius: 16px !important; background: #fff !important; }

        @media (max-width: 768px) {
          .auth-wrap { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { min-height: 100vh; }
        }
      `}</style>

      <div className="auth-wrap">
        {/* Left decorative panel */}
        <div className="auth-left">
          <Link href="/" className="auth-logo">Skilld</Link>

          <div className="auth-left-content">
            <h2>Welcome back.<br />Keep <em>growing</em> today.</h2>
            <p>Pick up right where you left off. Your progress, streaks, and courses are all waiting for you.</p>
            <div className="auth-proof">
              <div className="auth-proof-item"><div className="auth-proof-dot" /> 12,000+ active learners</div>
              <div className="auth-proof-item"><div className="auth-proof-dot" /> 200+ expert-led courses</div>
              <div className="auth-proof-item"><div className="auth-proof-dot" /> Learn in under 10 minutes a day</div>
            </div>
          </div>

          <div className="auth-testimonial">
            <blockquote>
              "I log in every morning before coffee. It has become my favourite part of the day."
            </blockquote>
            <div className="auth-testimonial-author">
              <div className="auth-avatar">RJ</div>
              <div>
                <strong>Ravi J.</strong><br />
                <span>UX Designer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right sign-in panel */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-form-header">
              <h1>Sign in</h1>
              <p>No account yet? <Link href="/sign-up">Sign up free →</Link></p>
            </div>
            <SignIn
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
          </div>
        </div>
      </div>
    </main>
  )
}