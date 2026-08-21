"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#FFB020] text-black hover:bg-[#FFC44D] font-bold shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-gray-300 dark:border-gray-700 bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-amber-800 dark:text-amber-400 underline-offset-4 hover:underline font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-background px-3.5 py-3 text-sm text-foreground shadow-xs transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-[#FFB020] focus-visible:ring-1 focus-visible:ring-[#FFB020] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
      <div className="grid w-full items-center gap-2">
        {label && <Label htmlFor={id} className="text-xs font-bold font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider">{label}</Label>}
        <div className="relative">
          <Input id={id} type={showPassword ? "text" : "password"} className={cn("pe-10", className)} ref={ref} {...props} />
          <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? (<EyeOff className="size-4" aria-hidden="true" />) : (<Eye className="size-4" aria-hidden="true" />)}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <form onSubmit={handleSignIn} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Sign in to NovaServe</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Enter your cloud credentials to manage deployments</p>
      </div>
      {success ? (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-1">
          <div className="text-emerald-800 dark:text-emerald-300 font-bold text-sm">✓ Signed in successfully</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">Redirecting to console...</div>
        </div>
      ) : (
        <div className="grid gap-4 font-mono">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Work Email</Label>
            <Input id="email" name="email" type="email" placeholder="dev@company.com" required autoComplete="email" />
          </div>
          <PasswordInput name="password" label="Password" required autoComplete="current-password" placeholder="••••••••" />
          <Button type="submit" variant="default" className="mt-2 text-sm font-black py-3 rounded-xl">
            {loading ? "Authenticating..." : "Sign In with Credentials"}
          </Button>
        </div>
      )}
    </form>
  );
}

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <form onSubmit={handleSignUp} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Create Developer Account</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Get started with zero-drift compiler cloud architecture</p>
      </div>
      {success ? (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-1">
          <div className="text-emerald-800 dark:text-emerald-300 font-bold text-sm">✓ Developer account created</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">Check your inbox to verify your API token.</div>
        </div>
      ) : (
        <div className="grid gap-4 font-mono">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="Alex Morgan" required autoComplete="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Work Email</Label>
            <Input id="email" name="email" type="email" placeholder="dev@company.com" required autoComplete="email" />
          </div>
          <PasswordInput name="password" label="Password" required autoComplete="new-password" placeholder="••••••••" />
          <Button type="submit" variant="default" className="mt-2 text-sm font-black py-3 rounded-xl">
            {loading ? "Provisioning..." : "Create Free Account"}
          </Button>
        </div>
      )}
    </form>
  );
}

function AuthFormContainer({ isSignIn, onToggle }: { isSignIn: boolean; onToggle: () => void; }) {
  return (
    <div className="mx-auto grid w-full max-w-[380px] gap-3">
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <div className="text-center text-xs font-medium text-gray-600 dark:text-gray-400 pt-2">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button variant="link" className="pl-1" onClick={onToggle}>
          {isSignIn ? "Sign up" : "Sign in"}
        </Button>
      </div>
      <div className="relative text-center text-xs my-2 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200 dark:after:border-gray-800">
        <span className="relative z-10 bg-white dark:bg-[#0A0A0B] px-3 font-mono text-[10px] text-gray-500 font-bold uppercase">
          Or continue with
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Button
          variant="outline"
          type="button"
          className="rounded-xl py-3 text-xs font-bold flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-700"
          onClick={() => console.log("UI: GitHub sign-in triggered")}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Continue with GitHub</span>
        </Button>
      </div>
    </div>
  );
}

interface AuthContentProps {
  image?: {
    src: string;
    alt: string;
  };
  quote?: {
    text: string;
    author: string;
  };
}

interface AuthUIProps {
  signInContent?: AuthContentProps;
  signUpContent?: AuthContentProps;
}

const defaultSignInContent = {
  image: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80",
    alt: "NovaServe Cloud Infrastructure Network",
  },
  quote: {
    text: "Compile pure TypeScript into zero-drift, least-privilege cloud infrastructure in sub-second speed.",
    author: "NovaServe Cloud Architecture",
  },
};

const defaultSignUpContent = {
  image: {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80",
    alt: "NovaServe Modern Multi-Cloud Pipeline",
  },
  quote: {
    text: "Join engineers building with deterministic AST compilation and instant local emulation.",
    author: "NovaServe Core Engine",
  },
};

export function AuthUI({ signInContent = {}, signUpContent = {} }: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);

  const finalSignInContent = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };
  const finalSignUpContent = {
    image: { ...defaultSignUpContent.image, ...signUpContent.image },
    quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };

  const currentContent = isSignIn ? finalSignInContent : finalSignUpContent;

  return (
    <div className="w-full min-h-screen md:grid md:grid-cols-2 bg-white dark:bg-[#0A0A0B] text-gray-900 dark:text-gray-100 selection:bg-[#FFB020]/40 selection:text-black">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center p-6 md:p-12">
        <AuthFormContainer isSignIn={isSignIn} onToggle={toggleForm} />
      </div>

      <div
        className="hidden md:flex relative bg-cover bg-center transition-all duration-700 ease-in-out flex-col justify-end p-12 overflow-hidden border-l border-gray-200 dark:border-gray-800"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-amber-300 font-bold backdrop-blur-md">
            <span>✦ NOVASERVE CLUSTER ACCESS</span>
          </div>

          <blockquote className="space-y-3 text-white">
            <p className="text-xl sm:text-2xl font-bold leading-snug font-sans">
              “<Typewriter
                key={currentContent.quote.text}
                text={currentContent.quote.text}
                speed={50}
              />”
            </p>
            <cite className="block text-xs font-mono text-gray-300 not-italic font-bold">
              — {currentContent.quote.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
