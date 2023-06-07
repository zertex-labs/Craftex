"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthModal } from "@/hooks/modals";
import { Modal } from ".";

const title: Record<ViewType, string> = {
  sign_in: "Welcome back",
  sign_up: "Create an account",
  forgotten_password: "Reset your password",
  update_password: "Update your password",
  verify_otp: "Verify your email",
  magic_link: "Sign in with magic link",
};

const description: Record<ViewType, string> = {
  sign_in: "Login to your account.",
  sign_up: "Welcome to Craftex!",
  forgotten_password: "Enter your email to reset your password.",
  update_password: "Enter your new password.",
  verify_otp: "Enter the OTP sent to your email.",
  magic_link: "Login to your account.",
};

const email_input_placeholder = "example@craftex.dev";

const viewsWithProviders: ViewType[] = ["sign_in", "sign_up"];

export const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const [view, setView] = useState<ViewType>("sign_in");

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

  return (
    <Modal
      title={title[view]}
      description={description[view]}
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={
          viewsWithProviders.includes(view) ? ["github", "discord", "google"] : []
        }
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#0284c7",
                brandAccent: "#0369a1",
              },
            },
          },
        }}
        theme="dark"
        socialLayout="horizontal"
        showLinks={false}
        view={view}
        localization={{
          variables: {
            sign_in: {
              button_label: "Sign in",
              email_input_placeholder,
            },
            sign_up: {
              button_label: "Sign up",
              email_input_placeholder,
            },
            forgotten_password: {
              button_label: "Reset password",
              email_input_placeholder,
            },
            magic_link: {
              button_label: "Send magic link",
              email_input_placeholder,
            },
            update_password: {
              button_label: "Update password",
            },
            verify_otp: {
              button_label: "Verify OTP",
              email_input_placeholder,
            },
          },
        }}
      />
      <div className="flex flex-col items-start text-sm text-gray-300 gap-y-1">
        {view == "sign_up" ? (
          <button
            className=" text-sky-400 hover:text-sky-500"
            onClick={() => setView("sign_in")}
          >
            Already have an account?
          </button>
        ) : (
          <button onClick={() => setView("sign_up")}>
            Need an account?
            <span className="ml-1 text-sky-400 hover:text-sky-500">
              Register
            </span>
          </button>
        )}
        <button
          className="mt-1 hover:text-sky-400"
          onClick={() => setView("magic_link")}
        >
          Sign in with magic link
        </button>
        <button
          className="hover:text-sky-400"
          onClick={() => setView("forgotten_password")}
        >
          Forgot your password?
        </button>
      </div>
    </Modal>
  );
};
