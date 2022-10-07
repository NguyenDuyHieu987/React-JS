import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './components/Layout/DefaultLayout';
import DefaultPage from './pages/DefaultPage';
import PrevPlayMovie from './pages/PrevPlayMovie';
import PlayPage from './pages/PlayPage';
import Follow from './pages/Follow';
import Rank from './pages/Rank';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/Genres/:genresName/"
          element={
            <DefaultLayout>
              <DefaultPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/Years/:year/"
          element={
            <DefaultLayout>
              <DefaultPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/Country/:country/"
          element={
            <DefaultLayout>
              <DefaultPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/List/:list/"
          element={
            <DefaultLayout>
              <DefaultPage />
            </DefaultLayout>
          }
        />

        <Route
          path="/Searh/:movieName/"
          element={
            <DefaultLayout>
              <DefaultPage />
            </DefaultLayout>
          }
        />

        <Route
          path="/Info/:movieid/:movieName/"
          element={
            <DefaultLayout>
              <PrevPlayMovie />
            </DefaultLayout>
          }
        />

        <Route
          path="/Play/:movieid/:movieName/"
          element={
            <DefaultLayout>
              <PlayPage />
            </DefaultLayout>
          }
        />

        <Route
          path="/Play/:movieid/:movieName/:tap"
          element={
            <DefaultLayout>
              <PlayPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/Follow/"
          element={
            <DefaultLayout>
              <Follow />
            </DefaultLayout>
          }
        />

        <Route
          path="/Rank/"
          element={
            <DefaultLayout>
              <Rank />
            </DefaultLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
