// components/individuals/Ind_login.tsx
'use client';
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
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCookie } from '@/utils/cookies';
import { setCart } from '@/redux/slices/cart/cartLocalStrogeSlice';
import { useLoginUserMutation } from '@/redux/slices/Auth/authSlice';
import { CartItemResponse, useAddToCartMutation } from '@/redux/slices/cart/cartApiSlice';
import { isLoggedIn, isUserSubscribed } from '@/utils/auth';
import Image from 'next/image';
import Link from 'next/link';
import { getErrorMessage } from '@/utils/errorHandler';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '&:hover fieldset': { borderColor: '#D0D5DD' },
    '&.Mui-focused fieldset': { borderColor: '#7F0000' },
  },
  '& input': {
    color: '#344054',
    fontSize: '18px',
    backgroundColor: 'transparent !important',
    '&::placeholder': { color: '#7F0000', opacity: 1 },
    '& input:-webkit-autofill': {
      boxShadow: '0 0 0 100px white inset',
      WebkitTextFillColor: '#344054',
      caretColor: '#344054',
      backgroundColor: 'transparent !important',
    },
  },
  '& label': { color: '#BDBDBD' },
  '& label.Mui-focused': { color: '#7F0000' },
};

type LoginFormData = z.infer<typeof loginSchema>;

const Ind_login = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const redirect = searchParams.get('redirect'); // ✅ safer way
  const [redirect, setRedirect] = React.useState<string | null>(null);

  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [addToCartApi] = useAddToCartMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setRedirect(params.get('redirect'));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  // after lint fix
  const onSubmit = async (data: LoginFormData) => {
    try {
      // 1️⃣ Call login API
      const res = await loginUser({ Email: data.email, Password: data.password }).unwrap();
      console.log('Login Response:', res);

      if (!res.data?.token) {
        toast.error('Login failed: no token received');
        return;
      }

      const { _id: userId, token, isSubscribed } = res.data;

      // 2️⃣ Set cookies
      setCookie('UserToken', token, 7);
      setCookie('UserId', userId, 7);
      setCookie('isSubscribed', isSubscribed?.toString() || 'false', 7);

      // 3️⃣ Sync guest cart to backend
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        const items: { id: string; qty: number }[] = JSON.parse(localCart);
        await Promise.all(
          items.map((item) =>
            addToCartApi({
              OwnerType: 'user',
              OwnerId: userId,
              AppId: item.id,
              Quantity: item.qty,
            }).unwrap(),
          ),
        );
      }

      // 4️⃣ Fetch backend cart and set to Redux
      const backendRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart?OwnerType=user&OwnerId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const backendData: { status: boolean; data?: { Items: CartItemResponse[] } } =
        await backendRes.json();

      if (backendData.status && backendData.data?.Items) {
        const formattedCart = backendData.data.Items.map((item: CartItemResponse) => ({
          id: item.App._id,
          name: item.App.Name,
          qty: item.Quantity,
          price: item.App.PricePerMonth || 0,
        }));
        dispatch(setCart(formattedCart));
      }

      // 5️⃣ Redirect based on subscription and query
      if (redirect === 'cart') {
        router.push('/cart');
      } else if (isLoggedIn() && isUserSubscribed()) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: unknown) {
      console.error('Login Error:', err);
      console.error(err);
      // toast.error(err.message || 'Error adding to cart');
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <div className="md:w-[45%] signLeftCon hidden md:block"></div>

      <Container maxWidth="sm" sx={{ pb: { xs: 5, sm: 0 } }}>
        <Box sx={{ '& .MuiTextField-root': { mt: 2 } }}>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Box display="flex" justifyContent="center" mb={1}>
                <Image src="/DILogo.svg" alt="DI Logo" width={110} height={50} />
              </Box>

              <Container>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ textAlign: { xs: 'center', lg: 'start' } }}
                >
                  Login
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: { xs: 1, md: 1 }, mt: { xs: 1, md: 1 } }}
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
                        boxShadow: 'none',
                      },
                    }}
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Get started'}
                  </Button>

                  <div className="text-center pt-2 text-sm tertiary-600 flex items-center justify-center gap-1">
                    <p>Already have an account ?</p>
                    <Link href="/ind-signup" className="primary-900 font-semibold">
                      Sign in
                    </Link>
                  </div>
                </Box>
              </Container>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Ind_login;
