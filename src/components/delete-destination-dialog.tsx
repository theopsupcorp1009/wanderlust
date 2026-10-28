"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { Trash2, TriangleAlert, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toastError, toastSuccess } from "@/lib/notifications";
import type { Destination } from "@/lib/types";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteDestinationDialogProps = {
  destination: Destination;
};

export function DeleteDestinationDialog({
  destination,
}: DeleteDestinationDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/destinations/${destination._id}`,
        { method: "DELETE", headers: {authorization: `Bearer ${token}`,} }
      );

      if (!res.ok) {
        toastError("Failed to delete travel package. Please try again.");
        return;
      }

      toastSuccess("Travel package deleted successfully!");
      setOpen(false);
      router.refresh();
      router.push("/destinations");
    } catch {
      toastError("Failed to delete travel package. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className="border-destructive/60 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive dark:border-destructive/60 dark:bg-input/30 dark:text-destructive dark:hover:bg-destructive/10"
          >
            <Trash2 data-icon="inline-start" />
            Cancel
          </Button>
        }
      />

      <AlertDialogContent className="p-4 sm:max-w-xl sm:p-6">
        <AlertDialogPrimitive.Close
          className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </AlertDialogPrimitive.Close>

        <AlertDialogHeader>
          <AlertDialogMedia className="mb-0 rounded-full bg-destructive/10">
            <TriangleAlert className="size-6 text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-lg">
            Delete Travel Package
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              &quot;{destination.name}&quot;
            </span>
            ? This action cannot be undone and will permanently remove this
            travel package from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mx-0 mb-0 rounded-none border-0 bg-transparent p-0">
          <AlertDialogCancel size="lg" className="w-full text-sm sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size="lg"
            disabled={isDeleting}
            onClick={handleDelete}
            className="w-full bg-destructive text-white hover:bg-destructive/90 sm:w-auto"
          >
            <Trash2 data-icon="inline-start" />
            {isDeleting ? "Deleting..." : "Delete Package"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
