import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import Attribution from '@/components/TMDB/Attribution';
import TMDBMenu from '@/components/TMDB/TMDBMenu';
import MovieList from '@/pages/TMDB/MovieList';
import TVList from '@/pages/TMDB/TVList';
import Search from '@/pages/TMDB/Search';

const TMDBLayout = () => {
  return (
    <PageLayout>
      <PageTitle>TMDB Database</PageTitle>
      <TMDBMenu />

      <Routes>
        <Route path="/" element={<Navigate to="movies" replace />} />
        <Route path="movies" element={<MovieList />} />
        <Route path="tv" element={<TVList />} />
        <Route path="search" element={<Search />} />
      </Routes>

      <Attribution />
    </PageLayout>
  );
};

export default TMDBLayout;
