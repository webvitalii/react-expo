import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from 'react-redux';
import { store } from '@/state/store.ts';

import HomePage from '@/pages/HomePage';
import TablePage from '@/pages/TablePage';
import TableSimplePage from '@/pages/TableSimplePage';
import FormPage from '@/pages/FormPage';
import CarouselPage from '@/pages/CarouselPage';
import CounterPage from '@/pages/CounterPage';
import DiffPage from '@/pages/DiffPage';
import RatingPage from '@/pages/RatingPage';
import TestPage from '@/pages/TestPage';
import TMDBLayout from '@/pages/TMDB';
import '@/App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/table-simple" element={<TableSimplePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/diff" element={<DiffPage />} />
          <Route path="/rating" element={<RatingPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/tmdb/*" element={<TMDBLayout />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}

export default App;
