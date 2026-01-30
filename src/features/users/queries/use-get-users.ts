import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { GetUsersResponse } from '../user-types';

export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const { data } = await api.get<GetUsersResponse>('/api/users', {
        params: { page, limit },
      });
      return data;
    },
  });
}
