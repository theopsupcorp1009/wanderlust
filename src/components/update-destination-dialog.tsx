"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { House, Save, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type { Destination } from "@/lib/types";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  { label: "Beach", value: "beach" },
  { label: "Mountain", value: "mountain" },
  { label: "City Break", value: "city-break" },
  { label: "Adventure", value: "adventure" },
  { label: "Cultural", value: "cultural" },
  { label: "Wildlife", value: "wildlife" },
];

const inputStyles =
  "h-10 rounded-md border-border bg-muted/50 px-3 text-base md:text-sm placeholder:text-muted-foreground";

type UpdateDestinationDialogProps = {
  destination: Destination;
};

export function UpdateDestinationDialog({
  destination,
}: UpdateDestinationDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: destination.name,
    country: destination.country,
    category: destination.category,
    price: destination.price,
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  });

  type FormField = keyof typeof form;

  const update =
    (field: FormField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.country || !form.price || !form.duration) {
      toastWarning("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    const token = await getTokenFromClient();

    try {
      // form holds only editable fields (no _id), safe to send as-is
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        toastError("Failed to update travel package. Please try again.");
        return;
      }

      toastSuccess("Travel package updated successfully!");
      setOpen(false);
      router.refresh();
    } catch {
      toastError("Failed to update travel package. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="lg" className="text-sm">
            <SquarePen data-icon="inline-start" />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-5 overflow-y-auto p-4 pb-6 sm:max-w-[640px] sm:p-6 sm:pb-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Update Travel Package
          </DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            {/* Mock shows the name field without a visible label */}
            <Label htmlFor="update-name" className="sr-only">
              Destination Name
            </Label>
            <Input
              id="update-name"
              name="name"
              required
              placeholder="Bali Paradise"
              value={form.name}
              onChange={update("name")}
              className={inputStyles}
            />
          </div>

          <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="update-country">Country</Label>
              <Input
                id="update-country"
                name="country"
                required
                placeholder="Indonesia"
                value={form.country}
                onChange={update("country")}
                className={inputStyles}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="update-category">Category</Label>
              <Select
                name="category"
                items={CATEGORIES}
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value ?? prev.category }))
                }
              >
                <SelectTrigger
                  id="update-category"
                  className={cn(inputStyles, "w-full")}
                >
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
              <Label htmlFor="update-price">Price (USD)</Label>
              <Input
                id="update-price"
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
              <Label htmlFor="update-duration">Duration</Label>
              <Input
                id="update-duration"
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
            <Label htmlFor="update-departureDate">Departure Date</Label>
            <Input
              id="update-departureDate"
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
            <Label htmlFor="update-imageUrl">Image URL</Label>
            <Input
              id="update-imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={update("imageUrl")}
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="update-description">Description</Label>
            <Textarea
              id="update-description"
              name="description"
              rows={6}
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={update("description")}
              className="rounded-md border-border bg-muted/50 px-3 py-2.5 text-base md:text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full border-destructive/60 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive sm:w-auto dark:border-destructive/60 dark:bg-input/30 dark:text-destructive dark:hover:bg-destructive/10"
              onClick={() => setOpen(false)}
            >
              <House data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSaving}
              className="w-full bg-cyan-600 text-white hover:bg-cyan-700 sm:w-auto"
            >
              <Save data-icon="inline-start" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
