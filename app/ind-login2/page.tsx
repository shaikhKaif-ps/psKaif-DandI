'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { LoginRequest, useLoginUserMutation } from '@/redux/slices/Auth/authSlice';
import { setCookie } from '@/utils/cookies';

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message: 'Must include uppercase, lowercase, number & special character.',
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': {
      borderColor: '#D0D5DD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7F0000',
    },
  },
  '& input': {
    color: '#344054',
    fontSize: '18px',
    '&::placeholder': {
      color: '#7F0000',
      opacity: 1,
    },
  },
  '& label': {
    color: '#BDBDBD',
  },
  '& label.Mui-focused': {
    color: '#7F0000',
  },
};

const LoginPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const body: LoginRequest = {
        Email: data.email,
        Password: data.password,
      };

      const res = await loginUser(body).unwrap();

      if (res.status) {
        toast.success(res.message);

        if (res.data?.token) {
          setCookie('UserToken', res.data.token, 7);
        }

        reset();
        router.push('/dashboard');
      } else {
        toast.error(res.message);
      }
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ||
        (err as { error?: string }).error ||
        (err as { message?: string }).message ||
        'Something went wrong, please try again';

      toast.error(message);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container maxWidth="sm">
          <Typography textAlign="center" variant="h4" fontWeight="bold" gutterBottom>
            Login To Your Account
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 1, md: 3 }, mt: { xs: 1, md: 3 } }}
          >
            Enter your details to move forward
          </Typography>

          <Box sx={{ '& .MuiTextField-root': { mt: { xs: 3, sm: 3 } } }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              size="small"
              sx={textFieldStyle}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              size="small"
              sx={textFieldStyle}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 6,
                mb: 1,
                textTransform: 'none',
                borderColor: '#D0D5DD',
                backgroundColor: '#fff',
                color: '#7F0000',
                boxShadow: 'none',
                border: '1px solid #D0D5DD',
                '&:hover': {
                  backgroundColor: '#7F0000',
                  color: '#fff',
                },
              }}
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Get started'}
            </Button>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default LoginPage;
