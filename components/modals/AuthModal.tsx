"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { ViewType } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthModal } from "@/hooks/modals";
import { Modal } from ".";

import { CommonAuthModalProps } from "./auth";
import AuthModalSignIn from "./auth/AuthModalSignIn";
import AuthModalSignUp from "./auth/AuthModalSignUp";
import AuthModalOAuthProviders from "./auth/AuthModalOAuthProviders";

interface ViewMeta {
  title: string;
  description: string;
  component: React.FC<CommonAuthModalProps> | null;
  includeProviders?: boolean;
}

const views: ViewType[] = [
  "sign_in",
  "sign_up",
  "forgotten_password",
  "update_password",
  "verify_otp",
  "magic_link",
];

const meta: Record<ViewType, ViewMeta> = {
  sign_in: {
    title: "Welcome back",
    description: "Login to your account.",
    component: AuthModalSignIn,
    includeProviders: true,
  },
  sign_up: {
    title: "Create an account",
    description: "Welcome to Craftex!",
    component: AuthModalSignUp,
  },
  forgotten_password: {
    title: "Reset your password",
    description: "Enter your email to reset your password.",
    component: null,
  },
  update_password: {
    title: "Update your password",
    description: "Enter your new password.",
    component: null,
  },
  verify_otp: {
    title: "Verify your email",
    description: "Enter the OTP sent to your email.",
    component: null,
  },
  magic_link: {
    title: "Sign in with magic link",
    description: "Login to your account.",
    component: null,
  },
};

export type AuthModalProvider = "github" | "discord" | "google"
const providers: AuthModalProvider[] = ["github", "google", 'discord'];

export const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const [view, setView] = useState<ViewType>("magic_link");

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const Component = meta[view].component;

  return (
    <Modal
      title={meta[view].title ?? "What? How did you get here?"}
      description={meta[view].description ?? "Hmm... This shouldn't happen."}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="">
        {meta[view].includeProviders && (
          <AuthModalOAuthProviders client={supabaseClient} providers={providers} />
        )}

        {Component ? (
          <Component client={supabaseClient} />
        ) : (
          <p className="text-center text-gray-200 text-sm py-4">
            <span className="font-semibold">{view}</span> view is invalid
            somehow. Please contact us at{" "}
            <span className="text-sky-400 font-semibold">idk yet</span>
          </p>
        )}
      </div>
      {views.map((v) => (
        <button
          key={v}
          className={`${
            view === v ? "bg-sky-400" : "bg-gray-700"
          } text-gray-200 text-sm px-3 py-1 rounded-md mr-2`}
          onClick={() => setView(v)}
        >
          {v}
        </button>
      ))}
    </Modal>
  );
};
