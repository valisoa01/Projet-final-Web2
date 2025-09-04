-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "budget" DECIMAL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UserId" INTEGER,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expenses" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL,
    "date" TIMESTAMPTZ(6),
    "description" VARCHAR(255),
    "type" VARCHAR(255),
    "receipt" VARCHAR(255),
    "categoryId" INTEGER,
    "userId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UserId" INTEGER,
    "CategoryId" INTEGER,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Incomes" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL,
    "date" TIMESTAMPTZ(6),
    "description" VARCHAR(255),
    "type" VARCHAR(255),
    "userId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "UserId" INTEGER,

    CONSTRAINT "Incomes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "public"."Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- AddForeignKey
ALTER TABLE "public"."Categories" ADD CONSTRAINT "Categories_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "public"."Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Incomes" ADD CONSTRAINT "Incomes_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
