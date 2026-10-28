"use client"

import React from "react";
import { Card } from "../ui/card";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toastError, toastSuccess, toastWarning } from "@/lib/notifications";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { Destination } from "@/lib/types";
import { redirect } from "next/navigation";

const BOOKING_PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

/** "2600" → "2,600" */
function formatPrice(price: string) {
  const value = Number(price);
  if (price === "" || !Number.isFinite(value)) return price;
  return value.toLocaleString("en-US");
}


const BookingCard = ({ destination }: { destination: Destination }) => {

  const {
    name,
    country,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
  } = destination;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedDate = e.currentTarget.departureDate.value;
    const data = {
        userName: user?.name,
        email: user?.email,
        image: user?.image,
        ...destination,
        departureDate: selectedDate,
        bookingDate: new Date(),
    }

    const token = await getTokenFromClient();

    try {
      // Duplicate check: already booked by this user
      const bookingsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/my-bookings/${user?.email}`,{
        headers: {
              authorization: `Bearer ${token}`,
          },
      });
      const bookings = await bookingsRes.json();
      const alreadyBooked =
        Array.isArray(bookings) &&
        bookings.some(
          (booking) =>
            booking.email === user?.email &&
            booking.name === name &&
            booking.country === country
        );

      if (alreadyBooked) {
        toastWarning(`You have already booked "${name}"`);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/booking`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data)
      });

      if(!res.ok){
          toastError("Failed to Book");
          return;
      }
      await res.json();
      toastSuccess("Booked Successfully");
    } catch (error) {
      console.error("Booking error:", error);
      toastError("Failed to Book");
    }
      redirect('/my-bookings')
  }

  return (
    <div>
      <Card className="h-fit px-6 py-6">
        <p className="text-sm text-cyan-600">Starting from</p>
        <p className="text-3xl font-bold">${formatPrice(price)}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">per person</p>

        <form onSubmit={handleBooking}>
        <input
          type="date"
          name="departureDate"
          defaultValue={departureDate}
          className="mt-5 flex h-10 w-full items-center rounded-md border border-border bg-muted/50 px-3 text-sm outline-none"
        />

        <Button
          type="submit"
          size="lg"
          className="mt-4 w-full bg-cyan-600 text-white hover:bg-cyan-700 flex justify-center items-center gap-3 py-2 cursor-pointer"
        >
          <span>Book Now</span>
          <ArrowRight data-icon="inline-end" />
        </Button>

        </form>
        <ul className="mt-5 flex flex-col gap-2">
          {BOOKING_PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="size-4 shrink-0 text-green-600" />
              {perk}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default BookingCard;
