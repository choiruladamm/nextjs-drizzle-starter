import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { CreateUserDTO, createUserSchema } from '../dto/user-dto';
import { useCreateUser } from '../mutations/use-create-user';
import { DialogFooter } from '@/components/ui/dialog';

export function UserForm({ onSuccess }: { onSuccess?: () => void }) {
  const mutation = useCreateUser();

  const form = useForm<CreateUserDTO>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  function onSubmit(values: CreateUserDTO) {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
      onError: (error) => {
        console.error(error);
        // Toast failure
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>Name</FieldLabel>
            <Input
              placeholder="John Doe"
              {...field}
              aria-invalid={!!fieldState.error}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>Email</FieldLabel>
            <Input
              placeholder="john@example.com"
              {...field}
              aria-invalid={!!fieldState.error}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <DialogFooter>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create User'}
        </Button>
      </DialogFooter>
    </form>
  );
}
