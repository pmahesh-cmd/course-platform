'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const visible = (id: string) => visibleSections.has(id)

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF8; color: #1a1a18; }
        a { text-decoration: none; color: inherit; }

        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }
        .fade-up.delay-5 { transition-delay: 0.5s; }

        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 7rem 2rem 5rem; text-align: center; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, #e8f4e8 0%, transparent 70%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: #fff; border: 1px solid #e8e6e0; border-radius: 100px; padding: 0.375rem 1rem; font-size: 0.8rem; color: #5a5a54; margin-bottom: 2rem; animation: fadeDown 0.8s ease forwards; }
        .hero-badge span { width: 6px; height: 6px; background: #3B6D11; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .hero h1 { font-family: 'DM Serif Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); line-height: 1.08; letter-spacing: -0.03em; color: #1a1a18; max-width: 700px; margin: 0 auto 1.5rem; animation: fadeUp 0.8s 0.2s ease both; }
        .hero h1 em { font-style: italic; color: #3B6D11; }
        .hero p { font-size: 1.125rem; color: #5a5a54; max-width: 500px; margin: 0 auto 2.5rem; line-height: 1.7; font-weight: 300; animation: fadeUp 0.8s 0.35s ease both; }
        .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; animation: fadeUp 0.8s 0.5s ease both; }
        .btn-primary { background: #1a1a18; color: #FAFAF8; padding: 0.875rem 2rem; border-radius: 100px; font-size: 0.9375rem; font-weight: 500; transition: opacity 0.2s, transform 0.2s; display: inline-block; }
        .btn-primary:hover { opacity: 0.8; transform: translateY(-1px); }
        .btn-secondary { background: transparent; color: #1a1a18; padding: 0.875rem 2rem; border-radius: 100px; font-size: 0.9375rem; font-weight: 500; border: 1px solid #d4d2cc; transition: border-color 0.2s, transform 0.2s; display: inline-block; }
        .btn-secondary:hover { border-color: #1a1a18; transform: translateY(-1px); }
        .hero-meta { margin-top: 4rem; display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap; animation: fadeUp 0.8s 0.65s ease both; }
        .hero-meta-item { text-align: center; }
        .hero-meta-item strong { display: block; font-size: 1.75rem; font-weight: 500; letter-spacing: -0.03em; }
        .hero-meta-item span { font-size: 0.8125rem; color: #888780; }

        .section-label { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #888780; margin-bottom: 1rem; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1rem; }
        .section-sub { font-size: 1.0625rem; color: #5a5a54; font-weight: 300; max-width: 480px; line-height: 1.7; margin-bottom: 4rem; }

        /* Marquee */
        .marquee-wrap { padding: 2.5rem 0; background: #fff; border-top: 1px solid #e8e6e0; border-bottom: 1px solid #e8e6e0; overflow: hidden; }
        .marquee-track { display: flex; gap: 4rem; animation: marquee 28s linear infinite; white-space: nowrap; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-item { font-family: 'DM Serif Display', serif; font-size: 1.125rem; color: #888780; display: flex; align-items: center; gap: 1.25rem; flex-shrink: 0; }
        .marquee-dot { width: 5px; height: 5px; background: #c8c6be; border-radius: 50%; flex-shrink: 0; }

        /* Features */
        .features { padding: 7rem 2rem; max-width: 1100px; margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5px; background: #e8e6e0; border: 1.5px solid #e8e6e0; border-radius: 16px; overflow: hidden; }
        .feature-card { background: #FAFAF8; padding: 2.5rem 2rem; transition: background 0.2s; }
        .feature-card:hover { background: #fff; }
        .feature-icon { width: 40px; height: 40px; background: #eaf3de; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; font-size: 18px; }
        .feature-card h3 { font-size: 1.0625rem; font-weight: 500; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .feature-card p { font-size: 0.9rem; color: #5a5a54; line-height: 1.65; font-weight: 300; }

        /* How it works */
        .how { padding: 7rem 2rem; background: #fff; }
        .how-inner { max-width: 1000px; margin: 0 auto; }
        .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; margin-top: 4rem; }
        .step { position: relative; }
        .step-number { font-family: 'DM Serif Display', serif; font-size: 3.5rem; color: #e8e6e0; line-height: 1; margin-bottom: 1rem; }
        .step h3 { font-size: 1.0625rem; font-weight: 500; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .step p { font-size: 0.9rem; color: #5a5a54; line-height: 1.65; font-weight: 300; }
        .step-connector { display: none; }

        /* Course cards */
        .courses-section { padding: 7rem 2rem; max-width: 1100px; margin: 0 auto; }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .course-card { border: 1px solid #e8e6e0; border-radius: 16px; overflow: hidden; background: #fff; transition: transform 0.2s, border-color 0.2s; cursor: pointer; }
        .course-card:hover { transform: translateY(-4px); border-color: #c8c6be; }
        .course-thumb { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
        .course-body { padding: 1.5rem; }
        .course-tag { display: inline-block; background: #eaf3de; color: #3B6D11; font-size: 0.75rem; font-weight: 500; padding: 0.25rem 0.75rem; border-radius: 100px; margin-bottom: 0.75rem; }
        .course-body h3 { font-size: 1rem; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 0.5rem; line-height: 1.4; }
        .course-body p { font-size: 0.875rem; color: #5a5a54; font-weight: 300; line-height: 1.6; margin-bottom: 1.25rem; }
        .course-meta { display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; color: #888780; }
        .course-rating { color: #3B6D11; font-weight: 500; }

        /* Pricing */
        .pricing { padding: 7rem 2rem; background: #FAFAF8; }
        .pricing-inner { max-width: 1000px; margin: 0 auto; }
        .pricing-header { text-align: center; margin-bottom: 4rem; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .plan-card { border: 1px solid #e8e6e0; border-radius: 16px; padding: 2.5rem 2rem; background: #fff; position: relative; transition: transform 0.2s; }
        .plan-card:hover { transform: translateY(-2px); }
        .plan-card.featured { border-color: #3B6D11; }
        .plan-badge { position: absolute; top: -13px; left: 50%; transform: translateX(-50%); background: #3B6D11; color: #EAF3DE; font-size: 0.75rem; font-weight: 500; padding: 0.25rem 1rem; border-radius: 100px; white-space: nowrap; }
        .plan-name { font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #888780; margin-bottom: 0.75rem; }
        .plan-price { font-family: 'DM Serif Display', serif; font-size: 3rem; letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.25rem; }
        .plan-price span { font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 300; color: #888780; letter-spacing: 0; }
        .plan-desc { font-size: 0.875rem; color: #888780; margin-bottom: 2rem; font-weight: 300; }
        .plan-features { list-style: none; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .plan-features li { font-size: 0.9rem; color: #5a5a54; display: flex; align-items: center; gap: 0.625rem; }
        .plan-features li::before { content: ''; width: 16px; height: 16px; background: #eaf3de; border-radius: 50%; display: inline-flex; flex-shrink: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 8l3.5 3.5L13 5' stroke='%233B6D11' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center; }
        .plan-btn { width: 100%; padding: 0.875rem; border-radius: 100px; font-size: 0.9375rem; font-weight: 500; text-align: center; display: block; transition: opacity 0.2s, transform 0.2s; cursor: pointer; border: none; }
        .plan-btn:hover { transform: translateY(-1px); }
        .plan-btn-outline { background: transparent; border: 1px solid #d4d2cc; color: #1a1a18; }
        .plan-btn-outline:hover { border-color: #1a1a18; }
        .plan-btn-filled { background: #1a1a18; color: #FAFAF8; }
        .plan-btn-filled:hover { opacity: 0.8; }

        /* Testimonials */
        .testimonials { padding: 7rem 2rem; max-width: 1100px; margin: 0 auto; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .testimonial-card { background: #fff; border: 1px solid #e8e6e0; border-radius: 16px; padding: 2rem; transition: transform 0.2s; }
        .testimonial-card:hover { transform: translateY(-2px); }
        .stars { color: #639922; font-size: 0.875rem; margin-bottom: 1rem; letter-spacing: 2px; }
        .testimonial-card blockquote { font-size: 0.9625rem; line-height: 1.7; color: #2c2c2a; margin-bottom: 1.5rem; font-weight: 300; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 500; flex-shrink: 0; }
        .testimonial-author-info strong { display: block; font-size: 0.875rem; font-weight: 500; }
        .testimonial-author-info span { font-size: 0.8rem; color: #888780; }

        /* FAQ */
        .faq { padding: 7rem 2rem; background: #fff; }
        .faq-inner { max-width: 720px; margin: 0 auto; }
        .faq-header { margin-bottom: 3rem; }
        .faq-item { border-bottom: 1px solid #e8e6e0; }
        .faq-question { width: 100%; background: none; border: none; padding: 1.5rem 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 1rem; font-weight: 500; text-align: left; color: #1a1a18; font-family: 'DM Sans', sans-serif; }
        .faq-icon { font-size: 1.25rem; color: #888780; transition: transform 0.3s; flex-shrink: 0; }
        .faq-icon.open { transform: rotate(45deg); }
        .faq-answer { font-size: 0.9375rem; color: #5a5a54; line-height: 1.7; font-weight: 300; padding-bottom: 1.5rem; display: none; }
        .faq-answer.open { display: block; }

        /* CTA */
        .cta { padding: 7rem 2rem; text-align: center; }
        .cta-inner { background: #1a1a18; border-radius: 24px; padding: 5rem 2rem; max-width: 800px; margin: 0 auto; position: relative; overflow: hidden; }
        .cta-inner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 100%, #3B6D11 0%, transparent 60%); opacity: 0.4; pointer-events: none; }
        .cta h2 { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 4vw, 3.25rem); color: #FAFAF8; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1rem; position: relative; }
        .cta p { color: #888780; font-size: 1.0625rem; font-weight: 300; margin-bottom: 2.5rem; position: relative; }
        .cta .btn-primary { background: #FAFAF8; color: #1a1a18; position: relative; }
        .cta .btn-primary:hover { opacity: 0.9; }

        footer { border-top: 1px solid #e8e6e0; padding: 3rem 2rem; }
        .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 1.5rem; }
        .footer-logo { font-family: 'DM Serif Display', serif; font-size: 1.125rem; }
        .footer-links { display: flex; gap: 2rem; }
        .footer-links a { font-size: 0.875rem; color: #888780; transition: color 0.2s; }
        .footer-links a:hover { color: #1a1a18; }
        .footer-copy { font-size: 0.8125rem; color: #888780; }

        @media (max-width: 640px) {
          .hero-meta { gap: 1.5rem; }
          .footer-inner { flex-direction: column; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; gap: 1rem; }
        }
      `}</style>

{/* Header Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2rem',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(250, 250, 248, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e8e6e0',
        zIndex: 100
      }}>
        <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', fontWeight: 'bold' }}>
          Skilld
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 500, color: '#5a5a54' }}>
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/sign-in" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      
      {/* Hero */}
      <section className="hero">
        <div>
          <div className="hero-badge">
            <span></span>
            New courses added every week
          </div>
          <h1>Learn skills that <em>actually</em> move the needle</h1>
          <p>Bite-sized, practical courses on productivity, focus, and personal growth — designed for people who are too busy to waste time.</p>
          <div className="hero-actions">
            <Link href="/sign-up" className="btn-primary">Start for free →</Link>
            <a href="#features" className="btn-secondary">See how it works</a>
          </div>
          <div className="hero-meta">
            {[['12k+', 'Active learners'], ['200+', 'Courses'], ['4.9★', 'Avg. rating']].map(([n, l]) => (
              <div className="hero-meta-item" key={l}>
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, r) =>
            ['Deep Work', 'Public Speaking', 'Time Management', 'Creative Writing', 'Financial Literacy', 'Leadership', 'Mindfulness', 'Data Thinking', 'Negotiation', 'Speed Reading'].map((t, i) => (
              <div className="marquee-item" key={`${r}-${i}`}>
                {t} <div className="marquee-dot" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Features */}
      <section className="features" id="features">
        <div id="feat-header" data-animate
          className={`fade-up ${visible('feat-header') ? 'visible' : ''}`}>
          <div className="section-label">Why Skilld</div>
          <div className="section-title">Everything you need to grow</div>
          <p className="section-sub">No fluff, no filler. Just practical skills you can apply the same day you learn them.</p>
        </div>
        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Learn in minutes, not months', desc: 'Courses are designed to fit into your real life — most lessons take under 10 minutes.' },
            { icon: '🎯', title: 'Focused on outcomes', desc: 'Every course starts with a clear outcome. You will always know what you are working toward.' },
            { icon: '📱', title: 'Learn anywhere', desc: 'Works beautifully on any device. Pick up exactly where you left off, any time.' },
            { icon: '🧠', title: 'Science-backed methods', desc: 'Spaced repetition, active recall, and habit stacking built right into the learning experience.' },
            { icon: '🤝', title: 'Expert instructors', desc: 'Learn from practitioners who have actually done what they teach — not just theorists.' },
            { icon: '📈', title: 'Track your progress', desc: 'Visual progress tracking and streaks keep you motivated and accountable every day.' },
          ].map((f, i) => (
            <div
              id={`feat-${i}`}
              data-animate
              key={i}
              className={`feature-card fade-up delay-${i % 3 + 1} ${visible(`feat-${i}`) ? 'visible' : ''}`}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="how-inner">
          <div id="how-header" data-animate className={`fade-up ${visible('how-header') ? 'visible' : ''}`}>
            <div className="section-label">How it works</div>
            <div className="section-title">From zero to skilled in four steps</div>
          </div>
          <div className="steps">
            {[
              { n: '01', title: 'Pick your goal', desc: 'Browse 200+ courses by category or take our 2-minute quiz to find your perfect starting point.' },
              { n: '02', title: 'Learn in micro-sessions', desc: 'Each lesson is 5–10 minutes. Perfect for lunch breaks, commutes, or whenever you have a spare moment.' },
              { n: '03', title: 'Apply what you learn', desc: 'Each course ends with a practical challenge designed to get the concept into your real life immediately.' },
              { n: '04', title: 'Track and repeat', desc: 'Your dashboard shows streaks, progress, and what to study next. Consistency becomes effortless.' },
            ].map((s, i) => (
              <div
                id={`step-${i}`}
                data-animate
                key={i}
                className={`step fade-up delay-${i + 1} ${visible(`step-${i}`) ? 'visible' : ''}`}
              >
                <div className="step-number">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="courses-section">
        <div id="courses-header" data-animate className={`fade-up ${visible('courses-header') ? 'visible' : ''}`}>
          <div className="section-label">Popular courses</div>
          <div className="section-title">Start with what works</div>
          <p className="section-sub">Our most loved courses, chosen by thousands of learners just like you.</p>
        </div>
        <div className="courses-grid">
          {[
            { thumb: '🧠', bg: '#eaf3de', tag: 'Productivity', title: 'Deep Work: The Complete System', desc: 'Build the ability to focus without distraction on cognitively demanding tasks.', duration: '4h 20m', rating: '4.9', students: '3.2k' },
            { thumb: '💬', bg: '#E1F5EE', tag: 'Communication', title: 'Speak With Confidence', desc: 'Eliminate filler words, structure your thoughts clearly, and command any room.', duration: '3h 10m', rating: '4.8', students: '2.8k' },
            { thumb: '💰', bg: '#EEEDFE', tag: 'Finance', title: 'Money Fundamentals', desc: 'Budgeting, investing, and building wealth — explained simply, without the jargon.', duration: '5h 00m', rating: '4.9', students: '4.1k' },
            { thumb: '🌿', bg: '#eaf3de', tag: 'Wellbeing', title: 'Stress-Proof Your Life', desc: 'Science-backed techniques to manage stress and protect your energy every day.', duration: '2h 45m', rating: '4.7', students: '1.9k' },
            { thumb: '✍️', bg: '#FAEEDA', tag: 'Writing', title: 'Write to Be Read', desc: 'Learn to write clearly, persuasively, and memorably — for any audience.', duration: '3h 30m', rating: '4.8', students: '2.3k' },
            { thumb: '🎯', bg: '#FAECE7', tag: 'Goals', title: 'Execution: Getting Things Done', desc: 'Turn your ambitions into daily habits with a system that actually sticks.', duration: '2h 50m', rating: '4.9', students: '3.7k' },
          ].map((c, i) => (
            <div
              id={`course-${i}`}
              data-animate
              key={i}
              className={`course-card fade-up delay-${(i % 3) + 1} ${visible(`course-${i}`) ? 'visible' : ''}`}
            >
              <div className="course-thumb" style={{ background: c.bg }}>{c.thumb}</div>
              <div className="course-body">
                <div className="course-tag">{c.tag}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="course-meta">
                  <span>{c.duration}</span>
                  <span className="course-rating">★ {c.rating}</span>
                  <span>{c.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="pricing-inner">
          <div id="pricing-header" data-animate className={`pricing-header fade-up ${visible('pricing-header') ? 'visible' : ''}`}>
            <div className="section-label">Pricing</div>
            <div className="section-title">Simple, honest pricing</div>
            <p className="section-sub" style={{ margin: '0 auto' }}>No hidden fees. Cancel anytime. Start free and upgrade when you are ready.</p>
          </div>
          <div className="pricing-grid">
            {[
              { name: 'Free', price: '$0', per: '/ forever', desc: 'Get a feel for the platform', featured: false, btn: 'plan-btn-outline', btnText: 'Get started free', href: '/sign-up', features: ['Access to 20 free courses', 'Progress tracking', 'Mobile app access', 'Community forum'] },
              { name: 'Pro', price: '$12', per: '/ month', desc: 'Everything you need to grow fast', featured: true, btn: 'plan-btn-filled', btnText: 'Start 7-day free trial', href: '/sign-up', features: ['All 200+ courses', 'New courses every week', 'Downloadable resources', 'Certificates of completion', 'Priority support'] },
              { name: 'Teams', price: '$29', per: '/ seat/mo', desc: 'Upskill your whole team', featured: false, btn: 'plan-btn-outline', btnText: 'Contact sales', href: '/contact', features: ['Everything in Pro', 'Team progress dashboard', 'Custom learning paths', 'Dedicated account manager', 'SSO & admin controls'] },
            ].map((p, i) => (
              <div
                id={`plan-${i}`}
                data-animate
                key={i}
                className={`plan-card fade-up delay-${i + 1} ${p.featured ? 'featured' : ''} ${visible(`plan-${i}`) ? 'visible' : ''}`}
              >
                {p.featured && <div className="plan-badge">Most popular</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price} <span>{p.per}</span></div>
                <p className="plan-desc">{p.desc}</p>
                <ul className="plan-features">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <Link href={p.href} className={`plan-btn ${p.btn}`}>{p.btnText}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div id="test-header" data-animate className={`fade-up ${visible('test-header') ? 'visible' : ''}`}>
          <div className="section-label">Testimonials</div>
          <div className="section-title">Real people, real results</div>
        </div>
        <div style={{ marginBottom: '1.5rem' }} />
        <div className="testimonials-grid">
          {[
            { quote: "I have tried dozens of learning platforms. Skilld is the only one where I actually finish courses. The bite-sized format is genius.", name: "Sarah K.", role: "Product Manager", initials: "SK", bg: "#eaf3de", color: "#3B6D11" },
            { quote: "Within two weeks of starting the productivity course, I reclaimed almost two hours every day. I wish I had found this sooner.", name: "Marcus T.", role: "Freelance Designer", initials: "MT", bg: "#E1F5EE", color: "#0F6E56" },
            { quote: "The quality of the instructors is unmatched. These are people who have actually lived what they teach, and it shows in every lesson.", name: "Priya M.", role: "Startup Founder", initials: "PM", bg: "#EEEDFE", color: "#534AB7" },
            { quote: "I am not a natural learner but Skilld made me one. The progress tracking and streaks kept me coming back every single day.", name: "James L.", role: "Software Engineer", initials: "JL", bg: "#FAEEDA", color: "#854F0B" },
            { quote: "Cancelled three other subscriptions after joining Skilld. Everything I need is right here. The value is unreal at this price.", name: "Amara N.", role: "Marketing Lead", initials: "AN", bg: "#FAECE7", color: "#993C1D" },
            { quote: "My team went through the communication course together and it genuinely changed how we run meetings. Highly recommend for teams.", name: "Chen W.", role: "Engineering Manager", initials: "CW", bg: "#e8f4f8", color: "#185FA5" },
          ].map((t, i) => (
            <div id={`test-${i}`} data-animate key={i}
              className={`testimonial-card fade-up delay-${(i % 3) + 1} ${visible(`test-${i}`) ? 'visible' : ''}`}>
              <div className="stars">★★★★★</div>
              <blockquote>{t.quote}</blockquote>
              <div className="testimonial-author">
                <div className="avatar" style={{ background: t.bg, color: t.color }}>{t.initials}</div>
                <div className="testimonial-author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="cta">
        <div id="cta-inner" data-animate className={`cta-inner fade-up ${visible('cta-inner') ? 'visible' : ''}`}>
          <h2>Start learning today.<br />Your future self will thank you.</h2>
          <p>Join 12,000+ learners already building better habits and sharper skills.</p>
          <Link href="/sign-up" className="btn-primary">Get started for free →</Link>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Skilld</div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="/courses">Courses</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-copy">© 2026 Skilld. Built with care.</div>
        </div>
      </footer>
    </main>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: 'Can I cancel anytime?', a: 'Yes — no contracts, no lock-ins. Cancel in two clicks from your dashboard and you will never be charged again.' },
    { q: 'Do I need any prior knowledge?', a: 'Not at all. Every course is designed to be accessible to beginners while still being valuable for those with experience.' },
    { q: 'How long does each course take?', a: 'Most courses are between 2–5 hours total, broken into short 5–10 minute lessons. You can go at whatever pace suits you.' },
    { q: 'Are there certificates?', a: 'Yes — Pro and Teams members receive a certificate of completion for every course they finish, shareable on LinkedIn.' },
    { q: 'Can I access Skilld on mobile?', a: 'Absolutely. Skilld is fully optimised for mobile and tablet. Your progress syncs automatically across all your devices.' },
  ]
  return (
    <section className="faq">
      <div className="faq-inner">
        <div className="faq-header">
          <div className="section-label">FAQ</div>
          <div className="section-title">Questions? Answered.</div>
        </div>
        {faqs.map((f, i) => (
          <div className="faq-item" key={i}>
            <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <span className={`faq-icon ${open === i ? 'open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer ${open === i ? 'open' : ''}`}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}