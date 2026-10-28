import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import MyBookingCard from "@/components/booking/MyBookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { Booking } from "@/lib/types";


const MyBookingsPage = async () => {
  // Only signed-in users can view this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const headingClasses = "font-[family-name:var(--font-playfair)]";

  let bookings: Booking[] = [];

  const token = await getTokenFromServer();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/my-bookings/${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }
    );

    if (res.ok) {
      const data = await res.json();
      bookings = Array.isArray(data) ? data : [];
    }
  } catch {
    throw new Error('Failed to load data');
  }

  return (
    <section className="min-h-[calc(100svh-4rem)] px-6 py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <h1 className={`${headingClasses} text-5xl font-medium`}>
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>

        {/* Booking list */}
        <div className="mt-8 flex flex-col gap-5">
          {bookings.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center">
              <p className="text-lg font-semibold">No bookings yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                When you book a destination, it will show up here.
              </p>
            </div>
          ) : (
            bookings.map((booking, index) => (
             <MyBookingCard key={index} booking={booking} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBookingsPage;
