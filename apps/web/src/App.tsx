
import { useMemo, useState } from 'react'
import './App.css'

const jobs = [
  {
    company: 'Google',
    initial: 'G',
    title: 'Frontend Developer',
    location: 'Bengaluru, India',
    type: 'Full-time',
    mode: 'Hybrid',
    salary: '₹8–14 LPA',
    color: 'google',
    category: 'Development',
  },
  {
    company: 'Microsoft',
    initial: 'M',
    title: 'Software Engineer',
    location: 'Hyderabad, India',
    type: 'Full-time',
    mode: 'On-site',
    salary: '₹10–18 LPA',
    color: 'microsoft',
    category: 'Development',
  },
  {
    company: 'Figma',
    initial: 'F',
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Full-time',
    mode: 'Remote',
    salary: '₹6–12 LPA',
    color: 'figma',
    category: 'Design',
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = `${job.title} ${job.company} ${job.location}`
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesFilter =
        activeFilter === 'All' ||
        job.category === activeFilter ||
        job.mode === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  return (
    <main className="job-platform">
      <header className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon">J</span>
          Job<span>Platform</span>
        </a>

        <nav className="nav-links">
          <a href="#jobs">Find Jobs</a>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <div className="nav-actions">
          <button className="login-button" type="button">Log in</button>
          <button className="signup-button" type="button">Get Started</button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-glow" />

        <div className="hero-content">
          <span className="eyebrow">
            YOUR CAREER, YOUR NEXT CHAPTER
          </span>

          <h1>
            Find a job you
            <br />
            <span>love showing up for.</span>
          </h1>

          <p>
            Discover meaningful opportunities, connect with the right
            companies, and find a role that moves your career forward.
          </p>

          <form
            className="search-bar"
            onSubmit={(event) => {
              event.preventDefault()
              document.getElementById('jobs')?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
          >
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              aria-label="Search jobs"
              placeholder="Job title, company or keyword"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit">Find jobs <span>↗</span></button>
          </form>

          <div className="hero-note">
            <span className="status-dot" />
            A better opportunity starts with one search.
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orb" />

          <div className="preview-card preview-one">
            <div className="preview-company">
              <span className="preview-logo google">G</span>
              <span>
                <strong>Google</strong>
                <small>Technology</small>
              </span>
              <span className="preview-bookmark">♡</span>
            </div>
            <strong className="preview-title">Product Designer</strong>
            <small className="preview-location">Bengaluru · Hybrid</small>
            <div className="preview-tags">
              <span>Full-time</span>
              <span>Design</span>
            </div>
          </div>

          <div className="preview-card preview-two">
            <div className="preview-company">
              <span className="preview-logo figma">F</span>
              <span>
                <strong>Figma</strong>
                <small>Design tools</small>
              </span>
            </div>
            <strong className="preview-title">Frontend Developer</strong>
            <small className="preview-location">Remote · Full-time</small>
            <div className="preview-tags">
              <span>React</span>
              <span>Remote</span>
            </div>
          </div>

          <div className="preview-badge">
            <span className="status-dot" />
            Opportunities worth exploring
          </div>
        </div>
      </section>

      <section className="jobs-section" id="jobs">
        <div className="jobs-heading">
          <div>
            <span className="eyebrow">FIND YOUR NEXT MOVE</span>
            <h2>Opportunities waiting for you.</h2>
            <p>Explore roles from companies looking for people like you.</p>
          </div>
          <a href="#jobs" className="view-all">Explore all jobs ↗</a>
        </div>

        <div className="job-filters">
          {['All', 'Development', 'Design', 'Remote', 'Hybrid'].map(
            (filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ),
          )}
        </div>

        <div className="job-grid">
          {filteredJobs.map((job) => (
            <article className="job-card" key={job.title}>
              <div className="job-card-top">
                <span className={`company-logo ${job.color}`}>
                  {job.initial}
                </span>
                <button
                  className="bookmark-button"
                  type="button"
                  aria-label={`Save ${job.title}`}
                >
                  ♡
                </button>
              </div>

              <span className="company-name">{job.company}</span>
              <h3>{job.title}</h3>
              <p className="job-location">⌖ {job.location}</p>

              <div className="job-tags">
                <span>{job.type}</span>
                <span>{job.mode}</span>
              </div>

              <div className="job-card-bottom">
                <div>
                  <strong>{job.salary}</strong>
                  <small>Estimated salary</small>
                </div>
                <button type="button" className="apply-button">
                  View details ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="empty-jobs">No matching jobs found. Try another search.</p>
        )}
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span className="eyebrow">SIMPLE BY DESIGN</span>
          <h2>Your next move, made simple.</h2>
          <p>Three simple steps to get closer to your next opportunity.</p>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>Explore opportunities</h3>
            <p>Discover jobs across companies, roles and industries.</p>
          </article>

          <article className="step-card">
            <span className="step-number">02</span>
            <h3>Find your match</h3>
            <p>Explore the details and find roles that fit your goals.</p>
          </article>

          <article className="step-card">
            <span className="step-number">03</span>
            <h3>Take the next step</h3>
            <p>Apply through the confirmed application link and move forward.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="/">
          <span className="brand-icon">J</span>
          Job<span>Platform</span>
        </a>
        <p>Find your next opportunity.</p>
      </footer>
    </main>
  )
}

export default App
