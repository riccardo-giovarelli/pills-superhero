import { JSX } from 'react';

import { Box, Container } from '@mui/material';


/**
 * DashboardPage component.
 * This is a Server Component that fetches the session and renders
 * the main user interface using Material UI.
 * @returns {Promise<JSX.Element>} The rendered dashboard page.
 */
export default async function DashboardPage(): Promise<JSX.Element> {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Main Content Area */}
      <Container maxWidth='lg' sx={{ mt: 4 }}></Container>
    </Box>
  );
}
