import { createFileRoute } from '@tanstack/react-router';
import Search from '@/pages/TMDB/Search';

type SearchSearch = {
  query?: string;
  page?: number;
  include_adult?: string;
};

export const Route = createFileRoute('/tmdb/search')({
  component: Search,
  validateSearch: (search: Record<string, unknown>): SearchSearch => ({
    query: (search.query as string) || undefined,
    page: Number(search.page) || undefined,
    include_adult: (search.include_adult as string) || undefined,
  }),
});
