"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toastError, toastSuccess, toastWarning } from "@/lib/notifications";
import { getTokenFromClient } from '@/lib/getTokenFromClient';

const CATEGORIES = [
  { label: "Beach", value: "beach" },
  { label: "Mountain", value: "mountain" },
  { label: "City Break", value: "city-break" },
  { label: "Adventure", value: "adventure" },
  { label: "Cultural", value: "cultural" },
  { label: "Wildlife", value: "wildlife" },
];

const INITIAL_FORM = {
  name: "",
  country: "",
  category: "beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const inputStyles =
  "h-10 rounded-md border-border bg-muted/50 px-3 text-base md:text-sm placeholder:text-muted-foreground";

type FormField = keyof typeof INITIAL_FORM;

export default function AddDestinationPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);

  const update =
    (field: FormField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.country ||
      !form.price ||
      !form.duration ||
      !form.departureDate
    ) {
      toastWarning("Please fill in all required fields");
      return;
    }

   const token = await getTokenFromClient();


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/add-destinations`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
           },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        toastError("Failed to add travel package. Please try again.");
        return;
      }

      toastSuccess("Travel package added successfully!");
      router.push("/destinations");
    } catch {
      toastError("Failed to add travel package. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-medium sm:text-4xl md:text-5xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-8 max-w-3xl px-4 py-6 shadow-sm ring-foreground/5 sm:mt-12 sm:px-8 sm:py-10">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Bali Paradise"
              value={form.name}
              onChange={update("name")}
              className={inputStyles}
            />
          </div>

          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                required
                placeholder="Indonesia"
                value={form.country}
                onChange={update("country")}
                className={inputStyles}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                items={CATEGORIES}
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value ?? "beach" }))
                }
              >
                <SelectTrigger id="category" className={cn(inputStyles, "w-full")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                placeholder="e.g., 1299"
                value={form.price}
                onChange={update("price")}
                className={inputStyles}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                required
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={update("duration")}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              required
              placeholder="mm/dd/yyyy"
              value={form.departureDate}
              onChange={update("departureDate")}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={update("imageUrl")}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={6}
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={update("description")}
              className="rounded-md border-border bg-muted/50 px-3 py-2.5 text-base md:text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-4 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              className="w-full border-destructive/60 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive sm:w-auto dark:border-destructive/60 dark:bg-input/30 dark:text-destructive dark:hover:bg-destructive/10"
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-cyan-600 text-white hover:bg-cyan-700 sm:w-auto"
            >
              <Save data-icon="inline-start" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
