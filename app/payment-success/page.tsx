// // app/payment-success/page.tsx
// 'use client';

// import { setCookie } from '@/utils/cookies';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { FaCheck } from 'react-icons/fa';
// import { useConfirmPaymentMutation } from '@/redux/slices/payment/paymentSlice'; // ✅ import the hook
// import toast from 'react-hot-toast';
// import { getErrorMessage } from '@/utils/errorHandler'; // ✅ Import helper

// export default function PaymentSuccessPage() {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get('session_id');
//   const router = useRouter();

//   const [confirmPayment] = useConfirmPaymentMutation(); // ✅

//   useEffect(() => {
//     const confirmAndRedirect = async () => {
//       if (sessionId) {
//         try {
//           const res = await confirmPayment({ session_id: sessionId }).unwrap();

//           if (res.status) {
//             // 1. Set subscription cookie
//             setCookie('isSubscribed', 'true', 7);

//             // 2. Optionally show toast or clear cart
//             toast.success('Payment confirmed successfully');

//             // 3. Redirect to dashboard after short delay
//             setTimeout(() => {
//               router.push('/dashboard');
//             }, 2000);
//           } else {
//             toast.error(res.message || 'Payment confirmation failed');
//           }
//         } catch (err: unknown) {
//           // ✅ Type-safe error handling
//           const message = getErrorMessage(err, 'Something went wrong confirming your payment.');
//           console.error('Confirm Payment Error:', message);
//           toast.error(message);
//         }
//       }
//     };

//     confirmAndRedirect();
//   }, [sessionId, confirmPayment, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
//       <div className="relative w-32 h-32">
//         <span className="absolute inset-0 rounded-full bg-green-100 animate-ping-slow z-0" />
//         <span className="absolute inset-3 rounded-full bg-green-200 animate-ping-slower z-10" />
//         <span className="absolute inset-6 rounded-full bg-green-500 flex items-center justify-center z-20">
//           <FaCheck className="text-white text-3xl" />
//         </span>
//       </div>

//       <h1 className="mt-8 text-2xl font-bold text-green-700">Payment Successful!</h1>
//       <p className="text-gray-600 mt-2">Confirming your subscription and redirecting...</p>
//     </div>
//   );
// }

'use client'; // <-- this ensures it's a client component

import PaymentSuccess from '@/components/global/PaymentSuccess';

export default function Page() {
  return <PaymentSuccess />;
}
