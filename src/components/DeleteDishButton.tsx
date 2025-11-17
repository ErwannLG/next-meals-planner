'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteDishButtonProps {
  dishId: number;
  dishName: string;
}

export function DeleteDishButton({ dishId, dishName }: DeleteDishButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${dishName}" ?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/dishes/${dishId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      router.refresh();
    } catch (error) {
      alert('Erreur lors de la suppression du plat');
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
    >
      <Trash2 size={16} className="mr-1" />
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </Button>
  );
}
