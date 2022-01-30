import '../assets/App.css';
import GlitchedWriter from 'glitched-writer';
import { useEffect, useState } from 'react';

function Home() {
  const [links, setLinks] = useState(false);

  useEffect(() => {
    const Writer = new GlitchedWriter('#name_title', {
      interval: 60,
      letterize: true,
    });

    async function writeName() {
      Writer.write('Aiken Tine Ahac').then(() => {
        console.log('Write successful');
        setLinks(true);
      });
    }

    writeName();
  }, []);

  return (
    <>
      <div className="App">
        <header className="header">
          <p id="name_title" className="header-text disable-select"></p>
          {links ? (
            <div className="header-links-section">
              <p className="header-link-text">
                <a href="https://github.com/aikenahac" className="header-link">
                  GitHub
                </a>
                |
                <a
                  href="https://instagram.com/ahacaiken/"
                  className="header-link"
                >
                  Instagram
                </a>
                |
                <a href="https://linkedin.com/in/aahac" className="header-link">
                  LinkedIn
                </a>
              </p>
            </div>
          ) : null}
        </header>
        <div className="projects-and-about">
          <h1 className="landing-title">About me</h1>
          <br />
          <p className="landing-text justify">
            I'm a software developer and computer science student @{' '}
            <a href="https://www.vegova.si/">Vegova Ljubljana</a>. I started
            coding at around the age of 10 or 11, and began my career at the age
            of 15. When I was 17 I founded a software company.
          </p>
          <br />
          <br />
          <h1 className="landing-title">Contact</h1>
          <br />
          <ul className="project-list">
            <li className="landing-text">
              E-mail: me@aikenahac.com | ahac.aiken@gmail.com | aiken@aerio.tech
            </li>
            <li className="landing-text">Discord: Axodus#1644</li>
          </ul>
          <br />
          <br />
          <h1 className="landing-title">Significant projects</h1>
          <br />
          <p className="landing-text justify">
            A list of the most significant projects I worked and collaborated
            on.
          </p>
          <br />
          <ul className="project-list">
            <li className="landing-text">
              <a href="https://aerio.tech">Aerio</a> - a software company that I
              Co-Founded with{' '}
              <a href="https://gasperd.com">Gašper Dobrovoljc</a>
            </li>
            <li className="landing-text">
              <a href="https://yourflare.io">YourFlare</a> - a smart tracker for
              children, pets, bikes, ...
            </li>
            <li className="landing-text">
              <a href="https://fundl.si">Fundl</a> - A platform that gathers top
              deals on a single app.
            </li>
            <li className="landing-text">
              <a href="https://github.com/aikenahac/dotbot">DotBot</a> - a
              Discord utility bot
            </li>
            <li className="landing-text">
              <a href="https://lasko.info">VisitLasko</a> - an application guide
              through the municipality of Laško
            </li>
          </ul>
          <br />
          <br />
          <h1 className="landing-title">Work experience</h1>
          <br />
          <ul className="project-list">
            <li className="landing-text">
              1.2.2021 - current: CEO & Co-Founder @ Aerio
            </li>
            <li className="landing-text">
              19.11.2020 - current: Developer @ IPM Komunikacije d.o.o.
            </li>
            <li className="landing-text">
              16.5.2021 - 6.11.2021: IT Team Lead @ Fundl | More4Youth d.o.o.
            </li>
            <li className="landing-text">
              19.6.2019 - 18.8.2021: Lead Developer @ YFLab d.o.o.
            </li>
            <li className="landing-text">
              <a
                href={process.env.PUBLIC_URL + 'cv.pdf'}
                rel="noreferrer"
                target="_blank"
              >
                View my CV
              </a>
            </li>
          </ul>
          <br />
          <br />
          <h1 className="landing-title">Miscellaneous</h1>
          <br />
          <p className="landing-text justify">
            Random things I like, do, or whatever...
          </p>
          <br />
          <ul className="project-list">
            <li className="landing-text">
              <a
                href="https://anilist.co/user/Axodus/"
                target="_blank"
                rel="noreferrer"
              >
                Anime I've watched and Manga I've read
              </a>
            </li>
            <li className="landing-text">
              <a
                href="https://open.spotify.com/playlist/1NIsBRcBDoI5Jdqnw4uVeO?si=7d5c5e7821484e61"
                target="_blank"
                rel="noreferrer"
              >
                My Spotify playlist
              </a>
            </li>
            <li className="landing-text">
              <a href="https://vegahq.com/" target="_blank" rel="noreferrer">
                A podcast I host with some friends
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
