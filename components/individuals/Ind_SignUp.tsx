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
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { RegisterRequest, useRegisterUserMutation } from '@/redux/slices/Auth/authSlice';
import { getErrorMessage } from '@/utils/errorHandler';
import { setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { CartItemResponse } from '@/redux/slices/cart/cartApiSlice';

// 1️⃣ Zod schema
const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  // phone: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  // password: z
  //   .string()
  //   .min(6, '')
  //   .max(16, 'Password must be at most 16 characters long')
  //   .regex(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
  //     'Password must contain at least one uppercase, lowercase, number, and special char',
  //   ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(16, 'Password must be at most 16 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent !important',
    '&::placeholder': {
      color: '#7F0000',
      opacity: 1,
    },
    '& input:-webkit-autofill': {
      boxShadow: '0 0 0 100px white inset',
      WebkitTextFillColor: '#344054',
      caretColor: '#344054',
      backgroundColor: 'transparent !important',
    },
  },
  '& label': {
    color: '#BDBDBD',
  },
  '& label.Mui-focused': {
    color: '#7F0000',
  },
};

interface LocalCartItem {
  id: string;
  name?: string;
  qty: number;
  price?: number;
  subtotal?: number;
}

const Ind_SignUp = () => {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  // components/individuals/Ind_SignUp.tsx - Updated onSubmit function

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const body: RegisterRequest = {
        Name: data.name,
        Email: data.email,
        Password: data.password,
      };

      const res = await registerUser(body).unwrap();

      if (res.status && res.data) {
        toast.success(res.message);

        // ✅ Set cookies
        if (res.data.token) setCookie('UserToken', res.data.token, 7);
        if (res.data._id) setCookie('UserId', res.data._id, 7);
        if (res.data.isSubscribed !== undefined)
          setCookie('isSubscribed', res.data.isSubscribed.toString(), 7);

        const userId = res.data._id;
        const token = res.data.token;

        // ✅ Sync local cart to backend (same as login)
        const localCart = localStorage.getItem('cart');
        if (localCart && userId && token) {
          try {
            const items: { id: string; qty: number; name?: string; price?: number }[] =
              JSON.parse(localCart);

            // 1️⃣ Add items to backend cart
            for (const item of items) {
              if (item.id && item.qty > 0) {
                try {
                  // Backend cart API call (same as login)
                  const cartResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/add`, {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      OwnerType: 'user',
                      OwnerId: userId,
                      AppId: item.id,
                      Quantity: item.qty,
                    }),
                  });

                  if (!cartResponse.ok) {
                    console.warn('Failed to sync cart item:', item.id);
                  }
                } catch (cartError) {
                  console.warn('Cart sync error for item:', item.id, cartError);
                }
              }
            }

            // 2️⃣ Fetch backend cart and update Redux/localStorage
            try {
              const backendRes = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/cart?OwnerType=user&OwnerId=${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                },
              );

              const backendData = await backendRes.json();

              if (backendData.status && backendData.data?.Items) {
                // For now, update localStorage also
                const formattedCart: LocalCartItem[] = backendData.data.Items.map(
                  (item: CartItemResponse) => ({
                    id: item.App._id,
                    name: item.App.Name,
                    qty: item.Quantity,
                    price: item.App.PricePerMonth || 0,
                    subtotal: (item.App.PricePerMonth || 0) * item.Quantity,
                  }),
                );

                localStorage.setItem('cart', JSON.stringify(formattedCart));
              }
            } catch (fetchError) {
              console.warn('Failed to fetch backend cart:', fetchError);
            }

            // 3️⃣ Clear local cart flag (but keep data synced)
            // localStorage.removeItem('cart'); // Don't remove, keep it synced
          } catch (syncError) {
            console.error('Cart sync failed:', syncError);
            toast.error('Account created but cart sync failed. Please check your cart.');
          }
        }

        reset();

        // ✅ Check redirect intent
        const redirectUrl = localStorage.getItem('redirectAfterAuth');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterAuth');

          // Special handling for cart/checkout redirect
          if (redirectUrl === '/checkout' || redirectUrl.includes('checkout')) {
            // Redirect to cart first, then checkout flow will handle
            setTimeout(() => {
              router.push('/cart');
            }, 1000);
          } else {
            router.push(redirectUrl);
          }
        } else {
          // Default redirect based on subscription status
          if (res.data.isSubscribed) {
            router.push('/dashboard');
          } else {
            router.push('/all-app-courses'); // Or wherever you want
          }
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <div className="md:w-[45%] signLeftCon hidden md:block"></div>
      <Container maxWidth="sm" sx={{ pb: { xs: 5, sm: 0 } }}>
        <Box display="flex" justifyContent="center" mb={1}>
          <Image src="/DILogo.svg" alt="DI Logo" width={110} height={50} />
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sign up
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ md: { xs: 1, sm: 2 } }}>
          Start your evaluation journey now
        </Typography>

        <Box sx={{ '& .MuiTextField-root': { mt: 2 } }}>
          {/* 🔑 wrap to avoid "Promise-returning" warning */}
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate>
            <TextField
              label="Name"
              fullWidth
              size="small"
              sx={textFieldStyle}
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

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
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
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
                mt: 4,
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
                  boxShadow: 'none',
                },
              }}
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Get started'}
            </Button>

            <div className=" text-center mt-5">
              <p className="text-[#475467] font-normal text-sm ">
                Already have an account ?
                <Link href="/ind-login" className="ml-2 text-[#7F0000] font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Ind_SignUp;
