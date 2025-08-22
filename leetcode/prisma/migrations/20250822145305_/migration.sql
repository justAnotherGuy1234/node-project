/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Problem_question_key` ON `Problem`(`question`);
