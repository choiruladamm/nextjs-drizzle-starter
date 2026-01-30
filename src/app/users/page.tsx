import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Management - Next.js Starter',
  description: 'Manage system users',
};

export { default } from '@/features/users/pages/users-page';
