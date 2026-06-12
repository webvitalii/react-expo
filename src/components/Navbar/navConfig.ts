import type { LinkProps } from '@tanstack/react-router';

/**
 * `LinkProps['to']` resolves to the union of every path registered in
 * `routeTree.gen.ts`, so a typo here becomes a compile error.
 */
type NavTo = LinkProps['to'];

export type NavChildLink = {
  to: NavTo;
  text: string;
  description: string;
};

export type NavTopLink = {
  kind: 'link';
  id: string;
  to: NavTo;
  label: string;
  i18nKey?: string;
  exact?: boolean;
};

export type NavTopGroup = {
  kind: 'group';
  id: string;
  label: string;
  i18nKey?: string;
  items: NavChildLink[];
};

export type NavEntry = NavTopLink | NavTopGroup;

export const navConfig: NavEntry[] = [
  { kind: 'link', id: 'home', to: '/$lang', label: 'Home', i18nKey: 'home', exact: true },
  {
    kind: 'group',
    id: 'forms',
    label: 'Forms',
    i18nKey: 'forms',
    items: [
      {
        to: '/$lang/forms/tanstack-form',
        text: 'TanStack Form',
        description: 'Form validation with TanStack Form',
      },
    ],
  },
  {
    kind: 'group',
    id: 'tools',
    label: 'Tools',
    i18nKey: 'tools',
    items: [
      { to: '/$lang/tools/bmi', text: 'BMI', description: 'Body Mass Index calculator' },
      { to: '/$lang/tools/diff', text: 'Diff', description: 'Text diff viewer' },
    ],
  },
  {
    kind: 'group',
    id: 'tables',
    label: 'Tables',
    i18nKey: 'tables',
    items: [
      { to: '/tables/table-simple', text: 'Table Simple', description: 'Simple data table' },
      {
        to: '/tables/table',
        text: 'Table',
        description: 'Data table with sorting and filtering',
      },
    ],
  },
  {
    kind: 'group',
    id: 'components',
    label: 'Components',
    i18nKey: 'components',
    items: [
      { to: '/carousel', text: 'Carousel', description: 'Image carousel component' },
      { to: '/rating', text: 'Rating', description: 'Star rating component' },
      { to: '/components/sonner', text: 'Sonner', description: 'Toast notifications' },
    ],
  },
  {
    kind: 'group',
    id: 'examples',
    label: 'Examples',
    i18nKey: 'examples',
    items: [
      {
        to: '/counter',
        text: 'Counter',
        description: 'Tanstack Store state management example',
      },
      {
        to: '/error-boundary',
        text: 'ErrorBoundary',
        description: 'Custom React error boundary demo',
      },
    ],
  },
  { kind: 'link', id: 'tmdb', to: '/tmdb', label: 'TMDB', i18nKey: 'tmdb' },
  { kind: 'link', id: 'posts', to: '/$lang/posts', label: 'Posts', i18nKey: 'posts' },
];

export const needsLangParam = (to: NavTo | undefined) =>
  typeof to === 'string' && to.startsWith('/$lang');

/**
 * Returns true if `pathname` matches `to` (exact or as a parent),
 * with `/$lang` substituted to the active language segment.
 */
export const isPathActive = (to: NavTo | undefined, pathname: string, lang: string) => {
  if (typeof to !== 'string') return false;
  const resolved = to.replace('/$lang', `/${lang}`);
  if (pathname === resolved) return true;
  return pathname.startsWith(resolved + '/');
};

export const isGroupActive = (group: NavTopGroup, pathname: string, lang: string) =>
  group.items.some((i) => isPathActive(i.to, pathname, lang));
