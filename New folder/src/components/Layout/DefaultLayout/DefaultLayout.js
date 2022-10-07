import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import FilterMovie from './FilterMovie';
import DefaultPage from './../../../pages/DefaultPage/DefaultPage';
import Notification from './Notification/Notification';

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Notification />
          {children.type === (<DefaultPage />).type ? (
            <>
              <FilterMovie /> <DefaultPage />
            </>
          ) : (
            children
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
