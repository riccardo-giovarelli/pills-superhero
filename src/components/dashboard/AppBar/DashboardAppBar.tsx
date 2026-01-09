'use client';

import { useTranslations } from 'next-intl';

import { DashboardAppBarProps } from '@/components/dashboard/AppBar/DashboardAppBar.type';
import useDashboardStore from '@/stores/dashboard/useDashboardStore';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography } from '@mui/material';


export default function DashboardAppBar({ session }: DashboardAppBarProps) {
  const t = useTranslations('DashboardPage');
  const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);

  return (
    <AppBar position='static' elevation={1}>
      <Toolbar>
        <MenuIcon sx={{ mr: 2, cursor: 'pointer' }} onClick={() => toggleDrawer()} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>
        <Typography variant='body1' sx={{ mr: 3, display: { xs: 'none', sm: 'block' } }}>
          {session.user?.name || ''}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
