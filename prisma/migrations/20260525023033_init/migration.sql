-- CreateTable
CREATE TABLE "public"."rsvps" (
    "id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "email" TEXT,
    "starter" TEXT,
    "entree" TEXT NOT NULL,
    "sides" TEXT NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rsvps_guest_name_key" ON "public"."rsvps"("guest_name");
