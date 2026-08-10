-- DropForeignKey
ALTER TABLE "UrlVisitor" DROP CONSTRAINT "UrlVisitor_urlId_fkey";

-- AddForeignKey
ALTER TABLE "UrlVisitor" ADD CONSTRAINT "UrlVisitor_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
