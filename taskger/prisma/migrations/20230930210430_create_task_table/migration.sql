-- CreateEnum
CREATE TYPE "task_status_type" AS ENUM ('TO_DO', 'IN_PROGRESS', 'DONE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "status" "task_status_type" NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
