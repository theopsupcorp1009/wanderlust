import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Camera,
  Compass,
  DollarSign,
  MapPin,
  PencilLine,
  PlaneTakeoff,
  TrendingUp,
} from "lucide-react";
import { auth } from "@/lib/auth";

// Static placeholder data — replace with real values once they are available
const staticStats = [
  {
    label: "Total Bookings",
    value: "12",
    Icon: PlaneTakeoff,
    iconClasses: "bg-cyan-100 text-cyan-600",
  },
  {
    label: "Countries Visited",
    value: "18",
    Icon: Compass,
    iconClasses: "bg-green-100 text-green-600",
  },
  {
    label: "Upcoming Trips",
    value: "2",
    Icon: TrendingUp,
    iconClasses: "bg-orange-100 text-orange-600",
  },
  {
    label: "Total Spent",
    value: "$15,750",
    Icon: DollarSign,
    iconClasses: "bg-pink-100 text-pink-600",
  },
];

const headingClasses = "font-[family-name:var(--font-playfair)]";

const ProfilePage = async () => {
  // Only signed-in users can view this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const memberSince = new Date(user.createdAt).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <section className="min-h-[calc(100svh-4rem)] px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <header>
          <h1 className={`${headingClasses} text-5xl font-semibold`}>
            My Profile
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage your account settings and travel preferences
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row">
          {/* User card — session data; location & nationality static for now */}
          <div className="h-fit w-full rounded-xl border bg-card p-6 shadow-md shadow-black/5 lg:w-1/3">
            <div className="flex flex-col items-center">
              <div className="relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={112}
                    height={112}
                    className="size-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-28 items-center justify-center rounded-full bg-muted text-3xl font-semibold text-muted-foreground">
                    {(user.name.charAt(0) || "U").toUpperCase()}
                  </div>
                )}

                {/* Camera badge — decorative for now */}
                <span className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full bg-cyan-500 text-white ring-2 ring-background">
                  <Camera className="size-4" />
                </span>
              </div>

              <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                San Francisco, CA
              </p>
            </div>

            <hr className="my-6 border-border" />

            <dl className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Member since</dt>
                <dd className="text-sm font-semibold">{memberSince}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Nationality</dt>
                <dd className="text-sm font-semibold">United States</dd>
              </div>
            </dl>

            {/* Edit profile — static action for now */}
            <button
              type="button"
              className="mt-6 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-600 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              <PencilLine className="size-4" />
              Edit Profile
            </button>
          </div>

          {/* Travel statistics — static for now */}
          <div className="flex-1">
            <h2 className={`${headingClasses} text-2xl font-semibold`}>
              Travel Statistics
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {staticStats.map(({ label, value, Icon, iconClasses }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border bg-card p-5 shadow-sm"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-1.5 text-2xl font-semibold">{value}</p>
                  </div>
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${iconClasses}`}
                  >
                    <Icon className="size-5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
