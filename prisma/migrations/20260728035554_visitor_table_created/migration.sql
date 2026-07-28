-- CreateTable
CREATE TABLE "UrlVisitor" (
    "id" SERIAL NOT NULL,
    "urlId" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UrlVisitor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UrlVisitor" ADD CONSTRAINT "UrlVisitor_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
