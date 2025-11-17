'use client';

import { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

type FormState = {
  errors?: {
    name?: string[];
    seasonIds?: string[];
    _form?: string[];
  };
  success?: boolean;
};

type Season = {
  id: number;
  name: string;
};

type DishFormProps = {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  seasons: Season[];
  defaultValues?: {
    name: string;
    seasonIds: number[];
  };
  submitLabel?: string;
};

export default function DishForm({
  action,
  seasons,
  defaultValues,
  submitLabel = 'Enregistrer',
}: DishFormProps) {
  const [formState, setFormState] = useState<FormState>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await action(formState, formData);
      setFormState(result);
    });
  };

  return (
    <Card className="p-6">
      {formState.errors?._form && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-300">
          {formState.errors._form.join(', ')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du plat</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={defaultValues?.name}
            aria-describedby={formState.errors?.name ? 'name-error' : undefined}
          />
          {formState.errors?.name && (
            <p id="name-error" className="text-sm text-red-600 dark:text-red-400">
              {formState.errors.name.join(', ')}
            </p>
          )}
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Saisons</legend>
          <div className="grid grid-cols-2 gap-4">
            {seasons.map((season) => (
              <div key={season.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="season"
                  id={`season-${season.id}`}
                  value={season.id}
                  defaultChecked={defaultValues?.seasonIds.includes(season.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`season-${season.id}`}
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  {season.name}
                </label>
              </div>
            ))}
          </div>
          {formState.errors?.seasonIds && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {formState.errors.seasonIds.join(', ')}
            </p>
          )}
        </fieldset>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Enregistrement...' : submitLabel}
        </Button>
      </form>
    </Card>
  );
}
