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

    const vegetableId = parseInt(params.id);

    if (isNaN(vegetableId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await prisma.vegetable.delete({
      where: {
        id: vegetableId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vegetable:', error);
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

    const vegetableId = parseInt(params.id);

    if (isNaN(vegetableId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const { name, seasonIds } = body;

    if (!name || !seasonIds || !Array.isArray(seasonIds)) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }

    // Update vegetable with new seasons
    const updatedVegetable = await prisma.vegetable.update({
      where: {
        id: vegetableId,
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

    return NextResponse.json(updatedVegetable);
  } catch (error) {
    console.error('Error updating vegetable:', error);
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
    const vegetableId = parseInt(params.id);

    if (isNaN(vegetableId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const vegetable = await prisma.vegetable.findUnique({
      where: {
        id: vegetableId,
      },
      include: {
        seasons: true,
      },
    });

    if (!vegetable) {
      return NextResponse.json(
        { error: 'Légume non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(vegetable);
  } catch (error) {
    console.error('Error fetching vegetable:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}
