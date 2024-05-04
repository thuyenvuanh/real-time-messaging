import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Room from './components/Room/Room';
import SocketProvider from './hooks/SocketProvider';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route
          path="/room/:roomId"
          element={
            <SocketProvider>
              <Room />
            </SocketProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
