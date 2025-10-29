import { createFileRoute } from '@tanstack/react-router';
import Search from '@/pages/TMDB/Search';

export const Route = createFileRoute('/tmdb/search')({
  component: Search,
});
