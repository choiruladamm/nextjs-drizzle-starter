import { api } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUserDTO } from '../dto/user-dto';
import { CreateUserResponse } from '../user-types';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserDTO) => {
      const { data } = await api.post<CreateUserResponse>(
        '/api/users',
        userData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
