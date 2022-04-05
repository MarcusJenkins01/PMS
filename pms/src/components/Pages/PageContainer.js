import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './PageContainer.css';

function PageContainer(props) {
  return (
    <div className="page">
      <header>
        <Navbar/>
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

export default PageContainer;
