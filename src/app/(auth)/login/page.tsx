'use client';

import { useActionState } from 'react';

import { authenticate } from '@/app/lib/action';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Alert, Box, Button, CircularProgress, Container, Paper, TextField, Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';


export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
          }}
        >
          {/* Icon and Title */}
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ mb: 3 }}>
            Login
          </Typography>

          {/* Form mapped to the Server Action */}
          <Box component='form' action={formAction} noValidate sx={{ width: '100%' }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              disabled={isPending}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              disabled={isPending}
            />

            {/* Error Message Alert */}
            {errorMessage && (
              <Alert severity='error' sx={{ mt: 2, width: '100%' }}>
                {errorMessage}
              </Alert>
            )}

            <Button type='submit' fullWidth variant='contained' disabled={isPending} sx={{ mt: 3, mb: 2, py: 1.5 }}>
              {isPending ? <CircularProgress size={24} color='inherit' /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
