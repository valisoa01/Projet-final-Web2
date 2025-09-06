/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Incomes` table. All the data in the column will be lost.
  - Made the column `name` on table `Categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `budget` on table `Categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `UserId` on table `Categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `Expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `UserId` on table `Expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `CategoryId` on table `Expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `Incomes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Incomes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `UserId` on table `Incomes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Categories" DROP CONSTRAINT "Categories_UserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expenses" DROP CONSTRAINT "Expenses_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expenses" DROP CONSTRAINT "Expenses_UserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Incomes" DROP CONSTRAINT "Incomes_UserId_fkey";

-- AlterTable
ALTER TABLE "public"."Categories" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "budget" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "UserId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Expenses" DROP COLUMN "categoryId",
DROP COLUMN "userId",
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "UserId" SET NOT NULL,
ALTER COLUMN "CategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Incomes" DROP COLUMN "userId",
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "UserId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AddForeignKey
ALTER TABLE "public"."Categories" ADD CONSTRAINT "Categories_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "public"."Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Incomes" ADD CONSTRAINT "Incomes_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
