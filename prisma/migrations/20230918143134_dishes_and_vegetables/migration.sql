-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DishType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vegetable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Vegetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VegetableToSeason" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DishToSeason" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VegetableToSeason_AB_unique" ON "_VegetableToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_VegetableToSeason_B_index" ON "_VegetableToSeason"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DishToSeason_AB_unique" ON "_DishToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_DishToSeason_B_index" ON "_DishToSeason"("B");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DishType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VegetableToSeason" ADD CONSTRAINT "_VegetableToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VegetableToSeason" ADD CONSTRAINT "_VegetableToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Vegetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToSeason" ADD CONSTRAINT "_DishToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToSeason" ADD CONSTRAINT "_DishToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
