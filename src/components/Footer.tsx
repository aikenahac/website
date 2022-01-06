import '../assets/App.css';

function Footer() {
  return (
    <footer
      className="footer"
      onClick={() =>
        window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      }
    >
      <p className="link-hider">Made in an hour with pizza.</p>
      <a href="https://me.aikenahac.com">Social media links</a>
    </footer>
  );
}

export default Footer;
