'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DeleteVegetableButtonProps {
  vegetableId: number;
  vegetableName: string;
}

export function DeleteVegetableButton({
  vegetableId,
  vegetableName,
}: DeleteVegetableButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    toast(`Supprimer "${vegetableName}" ?`, {
      description: 'Cette action est irréversible.',
      action: {
        label: 'Supprimer',
        onClick: async () => {
          setIsDeleting(true);

          try {
            const response = await fetch(`/api/vegetables/${vegetableId}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('Erreur lors de la suppression');
            }

            toast.success('Légume supprimé avec succès');
            router.refresh();
          } catch (error) {
            toast.error('Erreur lors de la suppression du légume');
            setIsDeleting(false);
          }
        },
      },
      cancel: {
        label: 'Annuler',
        onClick: () => {},
      },
    });
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
