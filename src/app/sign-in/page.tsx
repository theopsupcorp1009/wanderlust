"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/notifications";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

const cardFieldClasses = "flex flex-col gap-1.5";

const inputClasses = "h-11 px-3 pl-10";

const linkClasses =
  "text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700 hover:underline";

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password");
      }

      toastSuccess("Signed in successfully", "Welcome back!");
      router.replace("/");
    } catch (err) {
      toastError(
        "Sign in failed",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Could not start Google sign in");
      }
    } catch (err) {
      toastError(
        "Google sign in failed",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center bg-muted/60 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Heading */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Resume your adventure with Wanderlust
          </p>
        </header>

        {/* Card */}
        <div className="rounded-xl border bg-card p-8 shadow-md shadow-black/5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className={cardFieldClasses}>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className={cardFieldClasses}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              {/* Remember me / Forgot password */}
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="remember-me"
                  className="gap-2 font-normal text-foreground"
                >
                  <Checkbox id="remember-me" />
                  Remember me
                </Label>

                <Link href="/forgot-password" className={linkClasses}>
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-10 w-full bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Google sign-in — separate action */}
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full text-sm font-semibold"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon className="size-5" />
            Sign In With Google
          </Button>

          {/* Sign up link */}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className={linkClasses}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
