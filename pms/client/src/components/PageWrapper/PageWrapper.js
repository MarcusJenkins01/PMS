import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import './PageWrapper.css';

function PageTemplate(props) {
  return (
    <div className="page-wrapper">
      <header>
        <Navbar token={props.token} admin={props.admin}/>
      </header>

      <main>
        {props.children}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default PageTemplate;
