import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PreferenceType } from "@prisma/client";

// GET /api/preferences/vegetables - Get all vegetable preferences for the current user
export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await prisma.userVegetablePreference.findMany({
      where: {
        userId,
      },
      include: {
        vegetable: true,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching vegetable preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

// POST /api/preferences/vegetables - Create or update a vegetable preference
export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vegetableId, type } = body;

    if (!vegetableId || !type) {
      return NextResponse.json(
        { error: "vegetableId and type are required" },
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
    const preference = await prisma.userVegetablePreference.upsert({
      where: {
        userId_vegetableId: {
          userId,
          vegetableId: parseInt(vegetableId),
        },
      },
      update: {
        type,
      },
      create: {
        userId,
        vegetableId: parseInt(vegetableId),
        type,
      },
      include: {
        vegetable: true,
      },
    });

    return NextResponse.json(preference);
  } catch (error) {
    console.error("Error setting vegetable preference:", error);
    return NextResponse.json(
      { error: "Failed to set preference" },
      { status: 500 }
    );
  }
}

// DELETE /api/preferences/vegetables?vegetableId=X - Delete a vegetable preference
export async function DELETE(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const vegetableId = searchParams.get("vegetableId");

    if (!vegetableId) {
      return NextResponse.json(
        { error: "vegetableId is required" },
        { status: 400 }
      );
    }

    await prisma.userVegetablePreference.deleteMany({
      where: {
        userId,
        vegetableId: parseInt(vegetableId),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vegetable preference:", error);
    return NextResponse.json(
      { error: "Failed to delete preference" },
      { status: 500 }
    );
  }
}
