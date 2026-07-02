/*
  Warnings:

  - A unique constraint covering the columns `[shortnedUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_shortnedUrl_key" ON "Url"("shortnedUrl");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
