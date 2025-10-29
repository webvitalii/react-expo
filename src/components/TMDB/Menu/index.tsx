import { Link } from '@tanstack/react-router';

const tmdbLinks = [
  { to: '/tmdb/movies', text: 'Movies' },
  { to: '/tmdb/tv-shows', text: 'TV Shows' },
  { to: '/tmdb/search', text: 'Search' },
];

const Menu = () => {
  const baseClasses = 'font-bold px-3 py-2 rounded-lg';
  
  return (
    <nav className="flex justify-center space-x-1 mb-6">
      {tmdbLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          activeProps={{
            className: `${baseClasses} text-slate-900 bg-slate-200`,
          }}
          className={`${baseClasses} text-slate-700 hover:bg-slate-100 hover:text-slate-900`}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
