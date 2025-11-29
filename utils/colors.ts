// // src/utils/colors.ts
// export type ScoreLevel = 'high' | 'medium' | 'low';

// /**
//  * Numeric score → level + Tailwind **background** colour for progress bars
//  */
// export const getScoreInfo = (score: number): { level: ScoreLevel; bg: string } => {
//   if (score >= 80) return { level: 'high', bg: 'bg-green-500' };
//   if (score >= 60) return { level: 'medium', bg: 'bg-blue-500' };
//   return { level: 'low', bg: 'bg-red-500' };
// };

// /**
//  * Text colour for the **Advice** table (same breakpoints)
//  */
// export const getPercentageTextColor = (level: ScoreLevel): string => {
//   switch (level) {
//     case 'high':
//       return 'text-green-800';
//     case 'medium':
//       return 'text-yellow-800';
//     case 'low':
//       return 'text-red-800';
//     default:
//       return 'text-gray-800';
//   }
// };

// /**
//  * Badge background colour for the **Advice** table (same green/yellow/red as before)
//  */
// export const getBadgeBgColor = (level: ScoreLevel): string => {
//   switch (level) {
//     case 'high':
//       return 'bg-green-100 text-green-800';
//     case 'medium':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'low':
//       return 'bg-red-100 text-red-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };
// ========================
// ========================
// ========================
// src/utils/colors.ts
export type ScoreLevel = 'high' | 'medium' | 'low';

/**
 * Convert a numeric score (0-100) → level + Tailwind classes
 */
export const getScoreInfo = (
  score: number,
): { level: ScoreLevel; bg: string; badge: string; text: string; message: string } => {
  if (score <= 25) {
    return {
      level: 'low',
      bg: 'bg-red-500', // progress bar
      badge: 'bg-red-100 text-red-800',
      text: 'text-red-800',
      message: 'Urgent improvement required',
    };
  }

  if (score <= 37) {
    return {
      level: 'medium',
      bg: 'bg-blue-500', // progress bar (you can change to yellow if you want)
      badge: 'bg-yellow-100 text-yellow-800',
      text: 'text-yellow-800',
      message: 'Targeted improvement needed',
    };
  }

  // 38–50 (and above, though max is 50 in your case)
  return {
    level: 'high',
    bg: 'bg-green-500', // progress bar
    badge: 'bg-green-100 text-green-800',
    text: 'text-green-800',
    message: 'Maintain and strengthen',
  };
};
