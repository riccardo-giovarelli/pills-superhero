'use client';



import useAppStore from '@/stores/app/useAppStore';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';


export default function ThemeToggle({ sx }: { sx?: any }) {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

  const handleToggle = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton onClick={handleToggle} color='inherit' sx={sx}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
