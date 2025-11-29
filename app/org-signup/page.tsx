// // ================================== ts

// // path: app/org-signup/page.tsx
// 'use client';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Typography,
// } from '@mui/material';
// import React from 'react';

// const textFieldStyle = {
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '8px',
//     '&:hover fieldset': {
//       borderColor: '#D0D5DD',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#7F0000',
//     },
//   },
//   '& input': {
//     color: '#344054',
//     fontSize: '18px',
//     '&::placeholder': {
//       color: '#7F0000', // ✅ placeholder color
//       opacity: 1, // ensures full color (MUI applies 0.5 by default)
//     },
//   },
//   '& label': {
//     color: '#BDBDBD', // default label color
//   },
//   '& label.Mui-focused': {
//     color: '#7F0000', // ✅ focused label color
//   },
// };

// const Page = () => {
//   // Password visibility toggle state
//   const [showPassword, setShowPassword] = React.useState(false);
//   // const [isLoading, _setIsLoading] = React.useState(false);
//   const [isLoading] = React.useState(false);
//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//       <Container maxWidth="sm">
//         <Typography textAlign={'center'} variant="h4" fontWeight="bold" gutterBottom>
//           Organization Registration
//         </Typography>
//         <Typography
//           variant="body1"
//           color="text.secondary"
//           sx={{ mb: { xs: 1, md: 3 }, mt: { xs: 1, md: 3 } }}
//         >
//           Enter your details to move forward
//         </Typography>

//         <Box
//           sx={{
//             '& .MuiTextField-root': { mt: { xs: 2, sm: 3 } }, // margin between fields
//           }}
//         >
//           <form noValidate>
//             <TextField
//               label="Organization name"
//               fullWidth
//               size="small"
//               sx={textFieldStyle}
//               // {...register('name')}
//               // error={!!errors.name}
//               // helperText={errors.name?.message}
//             />

//             <TextField
//               label="Organization email"
//               type="email"
//               fullWidth
//               size="small"
//               sx={textFieldStyle}
//               // {...register('email')}
//               // error={!!errors.email}
//               // helperText={errors.email?.message}
//             />
//             <TextField
//               label="Business mobile"
//               type="number"
//               fullWidth
//               size="small"
//               sx={textFieldStyle}
//               // {...register('email')}
//               // error={!!errors.email}
//               // helperText={errors.email?.message}
//             />

//             <TextField
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               fullWidth
//               size="small"
//               sx={textFieldStyle}
//               // {...register('password')}
//               // error={!!errors.password}
//               // helperText={errors.password?.message}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       // onClick={handleTogglePassword}
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       edge="end"
//                       aria-label="toggle password visibility"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 mt: 6,
//                 mb: 1,
//                 textTransform: 'none',
//                 borderColor: '#D0D5DD',
//                 backgroundColor: '#fff',
//                 color: '#7F0000',
//                 boxShadow: 'none',
//                 border: '1px solid #D0D5DD',
//                 '&:hover': {
//                   backgroundColor: '#7F0000',
//                   color: '#fff',
//                   boxShadow: 'none',
//                 },
//               }}
//               fullWidth
//               disabled={isLoading}
//             >
//               {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Get started'}
//             </Button>

//             {/* <Button
//               type="button"
//               fullWidth
//               variant="outlined"
//               startIcon={<FcGoogle />}
//               sx={{
//                 mt: {
//                   xs: 0,
//                   sm: 2,
//                 },
//                 textTransform: 'none',
//                 borderColor: '#D0D5DD',
//                 '&:hover': {
//                   backgroundColor: '#7F0000',
//                   color: '#fff',
//                 },
//               }}
//             >
//               Sign up with Google
//             </Button> */}

//             {/* <Box
//               textAlign="center"
//               sx={{
//                 mt: { xs: 0, sm: 4 }, // ✅ xs = mobile, sm and up = 4
//               }}
//             >
//               <Typography variant="body2">
//                 Already have an account?{' '}
//                 <Link href="/" passHref>
//                   <Typography
//                     component="span"
//                     color="primary"
//                     fontWeight="bold"
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     Log in
//                   </Typography>
//                 </Link>
//               </Typography>
//             </Box> */}
//           </form>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Page;
import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
