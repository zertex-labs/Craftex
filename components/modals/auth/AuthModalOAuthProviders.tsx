"use client";

import { IconType } from "react-icons";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { useState } from "react";

import type { AuthModalProvider } from "..";
import { CommonAuthModalProps } from ".";
interface AuthModalProvidersProps extends CommonAuthModalProps {
  providers: AuthModalProvider[];
}

const icons: Record<AuthModalProvider, IconType> = {
  github: AiOutlineGithub,
  discord: BsDiscord,
  google: AiOutlineGoogle,
};

const AuthModalOAuthProviders: React.FC<AuthModalProvidersProps> = ({
  providers,
  client,
}) => {
  const [proccessing, setProccessing] = useState(false);

  async function handleProviderClick(provider: AuthModalProvider) {
    setProccessing(true);

    const { data, error } = await client.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      // TODO: better error handling
      console.error(error);
      setProccessing(false);
      return;
    }

    setProccessing(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-2">
        {providers.map((provider) => {
          const Icon = icons[provider];
          return (
            <button
              disabled={proccessing}
              className="px-8 py-2 disabled:opacity-50 transition duration-150 border-2 border-sky-700 opacity-90 hover:opacity-100 opacity bg-gray-400/5 hover:bg-sky-400/5 first:rounded-l-lg last:rounded-r-lg"
              key={provider}
              onClick={() => handleProviderClick(provider)}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AuthModalOAuthProviders;
