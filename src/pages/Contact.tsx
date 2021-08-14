import '../assets/App.css';

function Home() {
  return (
    <div className="App">
      <header className="contact">
        <h1 className="contact-text-title">Mail</h1>
        <p className="contact-text">me@aikenahac.com | ahac.aiken@gmail.com</p>
        <br />
        <br />
        <h1 className="contact-text-title">Phone</h1>
        <p className="contact-text">+386 40 206 945</p>
        <br />
        <br />
        <h1 className="contact-text-title">Discord</h1>
        <p className="contact-text">Axodus#6112</p>
        <br />
        <br />
        <a href={process.env.PUBLIC_URL + '/'}>Go home</a>
      </header>
    </div>
  );
}

export default Home;
