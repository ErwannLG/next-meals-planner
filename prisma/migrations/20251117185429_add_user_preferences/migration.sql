-- CreateEnum
CREATE TYPE "PreferenceType" AS ENUM ('FAVORITE', 'DISLIKED');

-- CreateTable
CREATE TABLE "UserDishPreference" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "dishId" INTEGER NOT NULL,
    "type" "PreferenceType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDishPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVegetablePreference" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "vegetableId" INTEGER NOT NULL,
    "type" "PreferenceType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVegetablePreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserDishPreference_userId_idx" ON "UserDishPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDishPreference_userId_dishId_key" ON "UserDishPreference"("userId", "dishId");

-- CreateIndex
CREATE INDEX "UserVegetablePreference_userId_idx" ON "UserVegetablePreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVegetablePreference_userId_vegetableId_key" ON "UserVegetablePreference"("userId", "vegetableId");

-- AddForeignKey
ALTER TABLE "UserDishPreference" ADD CONSTRAINT "UserDishPreference_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVegetablePreference" ADD CONSTRAINT "UserVegetablePreference_vegetableId_fkey" FOREIGN KEY ("vegetableId") REFERENCES "Vegetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
