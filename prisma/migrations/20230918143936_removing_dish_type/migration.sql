/*
  Warnings:

  - You are about to drop the `DishType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_typeId_fkey";

-- DropTable
DROP TABLE "DishType";
