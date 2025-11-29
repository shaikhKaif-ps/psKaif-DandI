// utils/errorHandler.ts
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(
  err: unknown,
  fallback = 'Something went wrong, please try again',
): string {
  if (!err) return fallback;

  // Case: FetchBaseQueryError with { data: { message } }
  if (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof (err as FetchBaseQueryError).data === 'object'
  ) {
    const data = (err as FetchBaseQueryError).data as { message?: string };
    if (data?.message) return data.message;
  }

  // Case: FetchBaseQueryError with { error: string }
  if (
    typeof err === 'object' &&
    err !== null &&
    'error' in err &&
    typeof (err as { error?: string }).error === 'string'
  ) {
    return (err as { error: string }).error;
  }

  // Case: SerializedError with { message }
  if (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as SerializedError).message === 'string'
  ) {
    return (err as SerializedError).message ?? fallback;
  }

  return fallback;
}
