/**
 * Destination record returned by the travel API (`GET /destinations`).
 */
export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  /** Price in USD, returned as a string by the API. */
  price: string;
  /** e.g., "7 Days" or "7 Days/6 Nights" */
  duration: string;
  /** ISO date string, e.g., "2026-11-23" */
  departureDate: string;
  imageUrl: string;
  description: string;
}

/**
 * Booking record returned by the travel API (`GET /my-bookings/:email`).
 * Mirrors the fields sent to `POST /booking`.
 */
export type Booking = {
  _id: string;
  userName: string;
  email: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  /** ISO date string, e.g., "2026-11-23" */
  departureDate: string;
  imageUrl: string;
  /** ISO timestamp of when the booking was created. */
  bookingDate: string;
};
