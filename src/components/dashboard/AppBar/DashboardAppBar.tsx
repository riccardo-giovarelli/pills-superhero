'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { DashboardAppBarProps } from '@/components/dashboard/AppBar/DashboardAppBar.type';
import useDashboardStore from '@/stores/dashboard/useDashboardStore';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography } from '@mui/material';


/**
 * Dynamically imported ThemeToggle component.
 * * SSR is disabled (`ssr: false`) to prevent hydration mismatches.
 * This is necessary because the theme state (light/dark) relies on browser-specific
 */
const ThemeToggle = dynamic(() => import('@/components/dashboard/ThemeToggle/ThemeToggle'), {
  ssr: false,
  loading: () => <div style={{ width: 40, height: 40 }} />,
});

export default function DashboardAppBar({ session }: DashboardAppBarProps) {
  const t = useTranslations('DashboardPage');
  const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);

  return (
    <AppBar position='fixed' elevation={1}>
      <Toolbar>
        {/* Menu icon */}
        <MenuIcon sx={{ mr: 2, cursor: 'pointer' }} onClick={() => toggleDrawer()} />

        {/* App title */}
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>

        {/* Theme toggle */}
        <ThemeToggle sx={{ mr: 1 }} />

        {/* User name */}
        <Typography variant='body1' sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
          {session.user?.name || ''}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
