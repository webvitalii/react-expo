import { Moon, Sun, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

/**
 * Navbar button to switch between light, dark, and system themes.
 * Persists choice in localStorage and respects prefers-color-scheme.
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Toggle theme"
        title="Toggle theme (press D for quick toggle)"
        className={cn(
          'inline-flex items-center gap-1 px-2 py-1 text-sm rounded border transition-colors',
          'bg-transparent text-muted-foreground hover:bg-muted',
        )}
      >
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(theme === 'light' && 'bg-accent text-accent-foreground')}
        >
          <Sun className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(theme === 'dark' && 'bg-accent text-accent-foreground')}
        >
          <Moon className="size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(theme === 'system' && 'bg-accent text-accent-foreground')}
        >
          <Monitor className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
