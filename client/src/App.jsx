import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar          from './components/Navbar/Navbar';
import Footer          from './components/Footer/Footer';
import Toast           from './components/Toast/Toast';
import { ToastProvider } from './components/Toast/ToastContext';
import Home            from './pages/Home';
import Eimza           from './pages/Eimza';
import Hesaplama       from './pages/Hesaplama';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/eimza"      element={<Eimza />} />
            <Route path="/hesaplama"  element={<Hesaplama />} />
          </Routes>
          <Footer />
          <Toast />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
