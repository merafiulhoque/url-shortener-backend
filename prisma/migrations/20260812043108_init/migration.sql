-- CreateEnum
CREATE TYPE "BulkJobStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'COMPLETED_WITH_ERRORS');

-- CreateTable
CREATE TABLE "Bulkjob" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "BulkJobStatus" NOT NULL,
    "filePath" TEXT NOT NULL,

    CONSTRAINT "Bulkjob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bulkjob" ADD CONSTRAINT "Bulkjob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
