import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const dishId = parseInt(params.id);

    if (isNaN(dishId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await prisma.dish.delete({
      where: {
        id: dishId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting dish:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const dishId = parseInt(params.id);

    if (isNaN(dishId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const { name, seasonIds } = body;

    if (!name || !seasonIds || !Array.isArray(seasonIds)) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }

    // Update dish with new seasons
    const updatedDish = await prisma.dish.update({
      where: {
        id: dishId,
      },
      data: {
        name,
        seasons: {
          set: seasonIds.map((id: number) => ({ id })),
        },
      },
      include: {
        seasons: true,
      },
    });

    return NextResponse.json(updatedDish);
  } catch (error) {
    console.error('Error updating dish:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dishId = parseInt(params.id);

    if (isNaN(dishId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const dish = await prisma.dish.findUnique({
      where: {
        id: dishId,
      },
      include: {
        seasons: true,
      },
    });

    if (!dish) {
      return NextResponse.json({ error: 'Plat non trouvé' }, { status: 404 });
    }

    return NextResponse.json(dish);
  } catch (error) {
    console.error('Error fetching dish:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}
