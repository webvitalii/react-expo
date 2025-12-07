import { Link } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const formLinks = [
  {
    to: '/forms/tanstack-form',
    text: 'TanStack Form',
    description: 'Form validation with TanStack Form',
  },
];

const componentLinks = [
  { to: '/table-simple', text: 'Table Simple', description: 'Simple data table' },
  { to: '/table', text: 'Table', description: 'Data table with sorting and filtering' },
  { to: '/form', text: 'Form', description: 'Form validation with React Hook Form' },
  {
    to: '/tanstack-form',
    text: 'TanStack Form',
    description: 'Form validation with TanStack Form',
  },
  { to: '/carousel', text: 'Carousel', description: 'Image carousel component' },
  { to: '/rating', text: 'Rating', description: 'Star rating component' },
];

const exampleLinks = [
  { to: '/counter', text: 'Counter', description: 'Redux state management example' },
];

const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            to="/"
            className={navigationMenuTriggerStyle()}
            activeOptions={{ exact: true }}
            activeProps={{
              className: cn(navigationMenuTriggerStyle(), 'bg-slate-200 text-slate-900'),
            }}
          >
            Home
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Forms</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {formLinks.map((link) => (
                <li key={link.to}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                      activeProps={{
                        className: cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground font-semibold'
                        ),
                      }}
                    >
                      <div className="text-sm font-medium leading-none">{link.text}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {componentLinks.map((link) => (
                <li key={link.to}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                      activeProps={{
                        className: cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground font-semibold'
                        ),
                      }}
                    >
                      <div className="text-sm font-medium leading-none">{link.text}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Examples</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {exampleLinks.map((link) => (
                <li key={link.to}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.to}
                      className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                      activeProps={{
                        className: cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground font-semibold'
                        ),
                      }}
                    >
                      <div className="text-sm font-medium leading-none">{link.text}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            to="/diff"
            className={navigationMenuTriggerStyle()}
            activeProps={{
              className: cn(navigationMenuTriggerStyle(), 'bg-slate-200 text-slate-900'),
            }}
          >
            Diff
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            to="/sonner"
            className={navigationMenuTriggerStyle()}
            activeProps={{
              className: cn(navigationMenuTriggerStyle(), 'bg-slate-200 text-slate-900'),
            }}
          >
            Sonner
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            to="/tmdb"
            className={navigationMenuTriggerStyle()}
            activeProps={{
              className: cn(navigationMenuTriggerStyle(), 'bg-slate-200 text-slate-900'),
            }}
          >
            TMDB
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            to="/posts"
            className={navigationMenuTriggerStyle()}
            activeProps={{
              className: cn(navigationMenuTriggerStyle(), 'bg-slate-200 text-slate-900'),
            }}
          >
            Posts
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
