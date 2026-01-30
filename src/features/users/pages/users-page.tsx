'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserForm } from '@/features/users/components/user-form';
import { UserList } from '@/features/users/components/user-list';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function UsersPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <UserForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <UserList />
    </div>
  );
}
