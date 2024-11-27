import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import Attribution from '@/components/TMDB/Attribution';
import Menu from '@/components/TMDB/Menu';
import PopularMovies from '@/pages/TMDB/PopularMovies';
import PopularTVShows from '@/pages/TMDB/PopularTVShows';
import DiscoverMovies from '@/pages/TMDB/DiscoverMovies';
import DiscoverTVShows from '@/pages/TMDB/DiscoverTVShows';
import Search from '@/pages/TMDB/Search';

const TMDBLayout = () => {
  return (
    <PageLayout>
      <PageTitle>TMDB Database</PageTitle>
      <Menu />

      <Routes>
        <Route path="/" element={<Navigate to="popular-movies" replace />} />
        <Route path="popular-movies" element={<PopularMovies />} />
        <Route path="discover-movies" element={<DiscoverMovies />} />
        <Route path="popular-tv-shows" element={<PopularTVShows />} />
        <Route path="discover-tv-shows" element={<DiscoverTVShows />} />
        <Route path="search" element={<Search />} />
      </Routes>

      <Attribution />
    </PageLayout>
  );
};

export default TMDBLayout;
