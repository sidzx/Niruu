import { useEffect, useRef, useState } from "react";

type IconName = "arrow" | "book" | "code" | "heart" | "location" | "star";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-3 3 3 3" />
        <path d="m16 9 3 3-3 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    star: <path d="m12 3 2.5 5.8 6.3.6-4.8 4.2 1.4 6.1-5.4-3.2-5.4 3.2L8 13.6 3.2 9.4l6.3-.6z" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true">✦</span>
      {children}
      <span aria-hidden="true">✦</span>
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {["♡", "♥", "♡", "♥", "♡", "♡"].map((heart, index) => (
        <span key={index} style={{ "--i": index } as React.CSSProperties}>
          {heart}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [verdict, setVerdict] = useState<{ text: string; tone: string } | null>(null);
  const [heartClicks, setHeartClicks] = useState(0);
  const [effortVisible, setEffortVisible] = useState(false);
  const effortRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = effortRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEffortVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const chooseVerdict = (text: string, tone: string) => {
    setVerdict({ text, tone });
    window.setTimeout(() => document.getElementById("verdict-response")?.focus(), 50);
  };

  return (
    <main>
      <section className="hero" id="top">
        <FloatingHearts />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="official-tag">
          <span>Official communication</span>
          <b>Case no. 01/KNJ</b>
        </div>
        <div className="hero-content">
          <p className="hero-kicker">A matter requiring your immediate attention</p>
          <h1>
            <span>Attention,</span> Niranjana!
          </h1>
          <p className="hero-lead">
            Your complaint regarding <em>insufficient effort</em> has officially been received.
          </p>
          <div className="corrective-note">
            <span className="note-icon">
              <Icon name="star" size={18} />
            </span>
            <p>The Kannurkkaran has decided to take corrective action.</p>
          </div>
          <button className="primary-button" onClick={() => scrollTo("candidate")}>
            Review my effort <Icon name="arrow" />
          </button>
        </div>
        <div className="hero-footer">
          <span>Filed by Sidharth</span>
          <i />
          <span>Made with code &amp; questionable confidence</span>
        </div>
      </section>

      <section className="paper-section candidate-section" id="candidate">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Application 01"
            title="Meet the Candidate"
            intro="Applying for the highly competitive position of: Person Who Impresses Niranjana."
          />
          <div className="candidate-card">
            <div className="candidate-visual">
              <div className="portrait">
                <div className="portrait-head">
                  <span />
                  <i />
                </div>
                <div className="portrait-body" />
                <div className="portrait-book">
                  <Icon name="book" size={27} />
                </div>
              </div>
              <div className="candidate-label">
                <span>Candidate</span>
                <strong>Sidharth</strong>
                <small>Also answers to “Kannurkkara”</small>
              </div>
            </div>
            <div className="candidate-details">
              <div className="detail-row">
                <span>Full name</span>
                <strong>Sidharth</strong>
              </div>
              <div className="detail-row">
                <span>Headquarters</span>
                <strong>
                  <Icon name="location" size={17} /> Kannur, Kerala
                </strong>
              </div>
              <div className="detail-row">
                <span>Political orientation</span>
                <strong>
                  Communist <small>Father-in-law compatibility: HIGH</small>
                </strong>
              </div>
              <div className="detail-row">
                <span>Hobbies</span>
                <strong>Reading, coding &amp; occasionally thinking about you.</strong>
              </div>
              <div className="detail-row">
                <span>Special designation</span>
                <strong>The Kannurkkaran™</strong>
              </div>
              <div className="compatibility-block">
                <div>
                  <span>Compatibility with your father</span>
                  <strong>Potentially promising</strong>
                </div>
                <div className="meter">
                  <i />
                </div>
                <div className="meter-labels">
                  <span>“Who is this?”</span>
                  <span>“Let him sit.”</span>
                </div>
              </div>
            </div>
            <div className="approval-stamp">
              Approved <span>by the ideological</span> committee
            </div>
          </div>
        </div>
      </section>

      <section className="family-section">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Evidence submitted"
            title="The Family Impression Department"
            intro="Early indicators are encouraging. Formal results remain pending."
          />
          <div className="family-grid">
            <article className="family-card father-card">
              <div className="card-number">File / 001</div>
              <div className="card-icon red">
                <Icon name="book" size={27} />
              </div>
              <p className="card-kicker">The father</p>
              <h3>A Potential Ally</h3>
              <p>
                Same political ideology. Appreciation for books. We might already have something to
                discuss.
              </p>
              <div className="compat-stat">
                <div>
                  <span>Communist compatibility</span>
                  <strong>99%</strong>
                </div>
                <div className="stat-track">
                  <i />
                </div>
              </div>
              <small className="disclaimer">
                * Subject to actual parental approval. No assumptions made.
              </small>
            </article>
            <article className="family-card mother-card">
              <div className="card-number">File / 002</div>
              <div className="card-icon pink">
                <Icon name="heart" size={27} />
              </div>
              <p className="card-kicker">The mother</p>
              <h3>A Small Act of Care</h3>
              <p>
                When you weren't feeling well, I helped you get the tablets you needed. Nothing
                extraordinary. Just something I genuinely wanted to do.
              </p>
              <div className="care-line">
                <span className="pulse-heart">
                  <Icon name="heart" size={21} />
                </span>
                <p>Sometimes effort isn't about impressing someone. It's simply about caring.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tracker-section">
        <div className="section-shell tracker-shell">
          <div className="tracker-copy">
            <Eyebrow>Frequently asked question</Eyebrow>
            <h2>
              Where is the
              <br />
              <em>Kannurkkaran?</em>
            </h2>
            <p>Apparently, someone occasionally enquires about my whereabouts.</p>
            <button className="light-button" onClick={() => setTrackerOpen((current) => !current)}>
              <Icon name="location" /> {trackerOpen ? "Hide classified location" : "Where is he?"}
            </button>
            <p className="suspicion">
              Frequency of enquiries: <strong>Enough to make this Kannurkkaran suspicious.</strong>
            </p>
          </div>
          <div className={`tracker-card ${trackerOpen ? "is-active" : ""}`}>
            <div className="tracker-top">
              <span>
                <i /> Live-ish tracker
              </span>
              <b>KN 06</b>
            </div>
            <div className="map">
              <div className="map-grid" />
              <svg viewBox="0 0 540 360" preserveAspectRatio="none" aria-hidden="true">
                <path
                  className="map-road"
                  d="M-20 300C80 270 65 180 170 205s120-20 175-90 130-30 230-100"
                />
                <path
                  className="map-route"
                  d="M70 274C130 245 115 202 180 210s104-10 142-63 78-42 130-75"
                />
              </svg>
              <span className="map-label kannur">
                Kannur <small>Point A</small>
              </span>
              <span className="map-label niranjana">
                Niranjana <small>Important destination</small>
              </span>
              <div className="moving-pin">
                <Icon name="location" size={32} />
              </div>
              <div className="destination-heart">
                <Icon name="heart" size={25} />
              </div>
            </div>
            <div className="location-result">
              <span className="radar">
                <i />
              </span>
              <div>
                <small>{trackerOpen ? "Location detected" : "Awaiting search request"}</small>
                <p>
                  {trackerOpen
                    ? "Somewhere in Kannur… probably thinking about Niranjana."
                    : "Tap “Where is he?” to begin an unnecessarily dramatic scan."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="effort-section" id="effort" ref={effortRef}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Development report"
            title="But Wait… Is This Enough?"
            intro="You said I should put more effort into impressing you. Building this website is my attempt to prove that I actually listened."
          />
          <div className="effort-console">
            <div className="console-top">
              <span />
              <span />
              <span />
              <b>official-effort.exe</b>
            </div>
            <div className="effort-progress">
              <div className="progress-meta">
                <span>Effort invested in this website</span>
                <strong>{effortVisible ? "100" : "0"}%</strong>
              </div>
              <div className="progress-track">
                <i className={effortVisible ? "filled" : ""} />
              </div>
              <small>{effortVisible ? "Maximum effort threshold reached" : "Calculating…"}</small>
            </div>
            <div className="stats-grid">
              <div>
                <span>Hours spent</span>
                <strong>A little too many.</strong>
              </div>
              <div>
                <span>Lines of code</span>
                <strong>More than necessary.</strong>
              </div>
              <div>
                <span>Design thoughts</span>
                <strong>Classified.</strong>
              </div>
              <div>
                <span>Motivation</span>
                <strong>One particular girl.</strong>
              </div>
            </div>
            <div className="build-status">
              <span>
                <Icon name="code" size={19} />
              </span>
              <p>
                <small>System status</small>Build successful. Waiting for user review.
              </p>
              <i>Ready</i>
            </div>
          </div>
        </div>
      </section>

      <section className="verdict-section">
        <div className="section-shell verdict-shell">
          <SectionHeading
            eyebrow="Final evaluation"
            title="Now, Your Honour, The Decision Is Yours."
            intro="Please select the response that best represents your professional assessment."
          />
          <div className="verdict-buttons">
            <button
              onClick={() =>
                chooseVerdict(
                  "Mission accomplished? Don't let this confidence get to your head.",
                  "cute",
                )
              }
            >
              <span>01</span>
              <strong>Okay, that was actually cute</strong>
              <b>♥</b>
            </button>
            <button onClick={() => chooseVerdict("Kannur's reputation remains intact.", "funny")}>
              <span>02</span>
              <strong>Not bad, Kannurkkara</strong>
              <b>☺</b>
            </button>
            <button
              onClick={() =>
                chooseVerdict("Noted. Version 2.0 is already under development.", "harder")
              }
            >
              <span>03</span>
              <strong>You need to try harder!</strong>
              <b>↗</b>
            </button>
          </div>
          <div
            id="verdict-response"
            tabIndex={-1}
            className={`verdict-response ${verdict ? `show ${verdict.tone}` : ""}`}
            aria-live="polite"
          >
            <span>
              <Icon name={verdict?.tone === "harder" ? "code" : "heart"} />
            </span>
            <div>
              <small>Response recorded</small>
              <p>{verdict?.text || "Your verdict will appear here."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <FloatingHearts />
        <div className="closing-card">
          <Eyebrow>A small, honest footnote</Eyebrow>
          <h2>
            One Last Thing,
            <br />
            <em>Niranjana.</em>
          </h2>
          <div className="closing-copy">
            <p>
              I don't know whether this website will impress you. But I do know that I enjoyed
              making it.
            </p>
            <p>
              You once asked me to put more effort into impressing you. So here's my little attempt.
            </p>
            <p>
              Maybe I'm just the Kannurkkaran you occasionally ask about. Maybe there's a
              possibility of becoming someone a little more special.
            </p>
            <p>
              <strong>No pressure.</strong> Just wanted you to know that you're special to me.
            </p>
          </div>
          <div className="signature">
            <p>With slightly excessive effort,</p>
            <strong>Your Kannurkkaran, Sidharth.</strong>
          </div>
          <button
            className="heart-button"
            onClick={() => setHeartClicks((count) => count + 1)}
            style={
              { "--heart-scale": Math.min(1 + heartClicks * 0.12, 1.75) } as React.CSSProperties
            }
            aria-label="Make the heart grow"
          >
            <Icon name="heart" size={27} />
          </button>
          <small className="heart-hint">
            {heartClicks === 0
              ? "A tiny heart. Tap it."
              : heartClicks < 5
                ? "Okay, it likes that."
                : "Maximum affection capacity reached."}
          </small>
        </div>
        <footer>
          <span>Designed &amp; developed in Kannur</span>
          <i>♥</i>
          <span>Especially for Niranjana</span>
        </footer>
      </section>
    </main>
  );
}
