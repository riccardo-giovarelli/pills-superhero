'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { handleLogout } from '@/app/lib/auth/action';
import useDashboardStore from '@/stores/dashboard/useDashboardStore';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Importa l'icona Dashboard
import LogoutIcon from '@mui/icons-material/Logout';
import MedicationIcon from '@mui/icons-material/Medication';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
    <Drawer open={isOpen} onClose={closeDrawer}>
      <Box sx={{ width: 250 }} role='presentation' onClick={closeDrawer}>
        <List>
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton component={Link} href='/dashboard'>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('dashboard')} />
            </ListItemButton>
          </ListItem>

          {/* Medicines */}
          <ListItem disablePadding>
            <ListItemButton component={Link} href='/dashboard/medicines'>
              <ListItemIcon>
                <MedicationIcon />
              </ListItemIcon>
              <ListItemText primary={t('medicines')} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        {/* Logout */}
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
  );
}
