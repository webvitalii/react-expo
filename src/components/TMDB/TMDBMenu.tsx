import { NavLink } from 'react-router-dom';

const tmdbLinks = [
  { to: 'movies', text: 'Movies' },
  { to: 'tv', text: 'TV Series' },
  { to: 'search', text: 'Search' },
];

const TMDBMenu = () => {
  return (
    <nav className="flex justify-center space-x-4 mb-6">
      {tmdbLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive
              ? 'font-bold px-3 py-2 text-slate-900 rounded-lg bg-slate-200'
              : 'font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900'
          }
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default TMDBMenu;
