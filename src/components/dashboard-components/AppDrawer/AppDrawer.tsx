'use client';

import { useTranslations } from 'next-intl';

import { handleLogout } from '@/app/lib/auth/action';
import useDashboardStore from '@/stores/dashboard/useDashboardStore';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function AppDrawer() {
  const isOpen = useDashboardStore((state) => state.isDrawerOpen);
  const closeDrawer = useDashboardStore((state) => state.closeDrawer);
  const t = useTranslations('AppBar');

  return (
    <div>
      <Drawer open={isOpen} onClose={() => closeDrawer()}>
        <Box sx={{ width: 250 }} role='presentation' onClick={() => closeDrawer()}>
          <List>
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={t('logout')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
