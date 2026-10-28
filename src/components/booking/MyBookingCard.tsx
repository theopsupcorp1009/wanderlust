"use client"

import react from 'react';
import { Calendar, Check, Eye, MapPin, Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from "@/lib/notifications";
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import type { Booking } from "@/lib/types";

/** "2026-11-23" → "Nov 23, 2026" */
function formatDate(isoDate: string) {
  const value = new Date(isoDate);
  if (Number.isNaN(value.getTime())) return isoDate;
  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MyBookingCard = ({ booking }: { booking: Booking }) => {

    const router = useRouter();

 const handleCancelBooking = async () => {

  const token = await getTokenFromClient();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/my-bookings/${booking._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        }
      }
    );

    if (!res.ok) {
      toastError("Cancellation failed", "Could not cancel your booking. Please try again.");
      return;
    }

    toastSuccess("Booking cancelled", "Your booking has been cancelled successfully.");
    router.refresh();
  } catch (error) {
    toastError(
      "Something went wrong",
      error instanceof Error
        ? error.message
        : "Unable to cancel your booking. Please try again."
    );
  }
};

    return (
        <>
         <article
                key={booking._id}
                className="flex flex-col gap-4 rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:flex-row"
              >
                {/* Thumbnail */}
                <img
                  src={booking.imageUrl || "/images/placeholder.svg"}
                  alt={booking.name}
                  loading="lazy"
                  className="h-full w-full shrink-0 rounded-md object-cover sm:h-36 sm:w-64"
                />

                {/* Details */}
                <div className="flex flex-1 flex-col px-1 py-1 sm:px-3">
                  {/* Status — static until the API provides it */}
                  <span className="flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    <Check className="size-3.5" />
                    Confirmed
                  </span>

                  <h2
                    className={`mt-2 text-2xl font-semibold`}
                  >
                    {booking.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5 shrink-0" />
                    Departure: {formatDate(booking.departureDate)}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />
                    Booking ID: {booking._id}
                  </p>

                  <p className={`mt-3 text-3xl text-cyan-600`}>
                    ${Number(booking.price).toLocaleString("en-US")}
                  </p>

                  {/* Actions — static for now */}
                  <div className="mt-4 flex shrink-0 gap-3 sm:ml-auto sm:mt-auto sm:flex-col lg:flex-row">
                    <button
                      onClick = {handleCancelBooking}
                      type="button"
                      className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-red-200 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-cyan-600 px-5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
                    >
                      <Eye className="size-4" />
                      View
                    </button>
                  </div>
                </div>
              </article>
        </>
    )
}

export default MyBookingCard