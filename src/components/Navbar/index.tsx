import { Link } from '@tanstack/react-router';

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/table', text: 'Table' },
  { to: '/form', text: 'Form' },
  { to: '/carousel', text: 'Carousel' },
  { to: '/counter', text: 'Counter' },
  { to: '/diff', text: 'Diff' },
  { to: '/rating', text: 'Rating' },
  { to: '/tmdb', text: 'TMDB' },
];

const Navbar = () => {
  const baseClasses = 'font-bold px-3 py-2 rounded-lg';
  
  return (
    <nav className="flex justify-center space-x-1">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          activeOptions={{ exact: link.to === '/' }}
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

export default Navbar;
