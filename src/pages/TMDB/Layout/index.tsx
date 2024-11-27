import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import Attribution from '@/components/TMDB/Attribution';
import Menu from '@/components/TMDB/Menu';
import Movies from '@/pages/TMDB/Movies';
import TVShows from '@/pages/TMDB/TVShows';
import Search from '@/pages/TMDB/Search';

const TMDBLayout = () => {
  return (
    <PageLayout>
      <PageTitle>TMDB Database</PageTitle>
      <Menu />

      <Routes>
        <Route path="/" element={<Navigate to="movies" replace />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv-shows" element={<TVShows />} />
        <Route path="search" element={<Search />} />
      </Routes>

      <Attribution />
    </PageLayout>
  );
};

export default TMDBLayout;
