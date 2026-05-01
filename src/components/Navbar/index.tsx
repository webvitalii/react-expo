import { Link, useParams, useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
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
import { supportedLanguages, type SupportedLanguage } from '@/i18n';
import { navConfig, needsLangParam, isGroupActive } from '@/components/Navbar/navConfig';
import DevModeToggle from '@/components/DevModeToggle';

const LanguageSwitcher = ({ currentLang }: { currentLang: string }) => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const getNewPath = (newLang: string) => {
    const segments = currentPath.split('/').filter(Boolean);
    if (segments[0] && supportedLanguages.includes(segments[0] as SupportedLanguage)) {
      segments[0] = newLang;
      return '/' + segments.join('/');
    }
    return null;
  };

  return (
    <div className="flex gap-1">
      {supportedLanguages.map((lng) => {
        const newPath = getNewPath(lng);
        return (
          <Link
            key={lng}
            to={newPath || currentPath}
            search={true}
            hash={true}
            disabled={!newPath}
            className={cn(
              'px-2 py-1 text-sm rounded uppercase',
              !newPath && 'opacity-50 cursor-not-allowed',
              currentLang === lng
                ? 'bg-accent text-accent-foreground font-semibold'
                : 'hover:bg-muted',
            )}
          >
            {lng}
          </Link>
        );
      })}
    </div>
  );
};

const dropdownItemClass =
  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground';
const dropdownItemActiveClass =
  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground font-semibold';
const topLinkActiveClass = 'bg-accent text-accent-foreground';

const Navbar = () => {
  const { t } = useTranslation('navbar');
  const params = useParams({ strict: false }) as { lang?: string };
  const lang =
    params.lang && supportedLanguages.includes(params.lang as SupportedLanguage)
      ? params.lang
      : 'en';
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navConfig.map((entry) => {
          const label = entry.i18nKey ? t(entry.i18nKey) : entry.label;

          if (entry.kind === 'link') {
            // `to` keeps its typed union (typos caught in navConfig); params
            // can't be expressed for a wide `to` union, so cast locally.
            const langProps = (needsLangParam(entry.to) ? { params: { lang } } : {}) as object;
            return (
              <NavigationMenuItem key={entry.id}>
                <Link
                  to={entry.to}
                  {...langProps}
                  className={navigationMenuTriggerStyle()}
                  {...(entry.exact ? { activeOptions: { exact: true } } : {})}
                  activeProps={{
                    className: cn(navigationMenuTriggerStyle(), topLinkActiveClass),
                  }}
                >
                  {label}
                </Link>
              </NavigationMenuItem>
            );
          }

          const groupActive = isGroupActive(entry, pathname, lang);

          return (
            <NavigationMenuItem key={entry.id}>
              <NavigationMenuTrigger className={cn(groupActive && topLinkActiveClass)}>
                {label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {entry.items.map((link) => {
                    const langProps = (
                      needsLangParam(link.to) ? { params: { lang } } : {}
                    ) as object;
                    return (
                      <li key={link.to}>
                        <NavigationMenuLink
                          render={(props) => (
                            <Link
                              {...props}
                              to={link.to}
                              {...langProps}
                              className={cn(dropdownItemClass)}
                              activeProps={{ className: cn(dropdownItemActiveClass) }}
                            >
                              <div className="text-sm font-medium leading-none">{link.text}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {link.description}
                              </p>
                            </Link>
                          )}
                        />
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}

        <NavigationMenuItem>
          <LanguageSwitcher currentLang={lang} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DevModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
