import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PreferenceType } from "@prisma/client";

// GET /api/preferences/dishes - Get all dish preferences for the current user
export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await prisma.userDishPreference.findMany({
      where: {
        userId,
      },
      include: {
        dish: true,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching dish preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

// POST /api/preferences/dishes - Create or update a dish preference
export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dishId, type } = body;

    if (!dishId || !type) {
      return NextResponse.json(
        { error: "dishId and type are required" },
        { status: 400 }
      );
    }

    if (!Object.values(PreferenceType).includes(type)) {
      return NextResponse.json(
        { error: "Invalid preference type" },
        { status: 400 }
      );
    }

    // Upsert the preference (create or update)
    const preference = await prisma.userDishPreference.upsert({
      where: {
        userId_dishId: {
          userId,
          dishId: parseInt(dishId),
        },
      },
      update: {
        type,
      },
      create: {
        userId,
        dishId: parseInt(dishId),
        type,
      },
      include: {
        dish: true,
      },
    });

    return NextResponse.json(preference);
  } catch (error) {
    console.error("Error setting dish preference:", error);
    return NextResponse.json(
      { error: "Failed to set preference" },
      { status: 500 }
    );
  }
}

// DELETE /api/preferences/dishes?dishId=X - Delete a dish preference
export async function DELETE(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dishId = searchParams.get("dishId");

    if (!dishId) {
      return NextResponse.json(
        { error: "dishId is required" },
        { status: 400 }
      );
    }

    await prisma.userDishPreference.deleteMany({
      where: {
        userId,
        dishId: parseInt(dishId),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting dish preference:", error);
    return NextResponse.json(
      { error: "Failed to delete preference" },
      { status: 500 }
    );
  }
}
