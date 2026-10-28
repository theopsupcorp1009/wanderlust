import { toast } from "@/components/ui/toast";

const DURATION_MS = 1000;

function notify(
  type: "success" | "error" | "warning" | "info",
  title: string,
  description?: string
) {
  toast.add({ title, description, type, timeout: DURATION_MS });
}

export function toastSuccess(title: string, description?: string) {
  notify("success", title, description);
}

export function toastError(title: string, description?: string) {
  notify("error", title, description);
}

export function toastWarning(title: string, description?: string) {
  notify("warning", title, description);
}
