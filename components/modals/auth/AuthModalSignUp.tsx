"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { CommonAuthModalProps } from ".";
import { p } from "drizzle-orm/query-promise.d-d7b61248";
import { twMerge } from "tailwind-merge";

export interface AuthModalSignUpForm {
  username: string;
  email: string;
  password: string;
}

const AuthModalSignUp: React.FC<CommonAuthModalProps> = ({ client }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthModalSignUpForm>();

  const onSubmit: SubmitHandler<AuthModalSignUpForm> = async (data) => {
    console.log(data);
    const { username, email, password } = data;
    const {
      data: { user },
      error,
    } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(user, "signup");
  };

  const { inputContainer, inputLabel, inputError, input } = {
    inputContainer: "flex flex-col transition duration-500",
    inputLabel: "pl-2 text-sm text-gray-300",
    inputError: "pl-2 pt-1 text-pink-600 text-sm",
    input:
      "transition duration-150 px-4 py-2 peer rounded-md hover:bg-sky-900/10 focus:bg-sky-800/20 bg-gray-700/20 text-white border-2 border-sky-400/40 focus:border-sky-400 outline-none",
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className={inputContainer}>
        <label className={inputLabel} htmlFor="email">
          Email
        </label>
        <input
          className={twMerge(input, errors.email && "border-pink-600")}
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className={inputError}>Email is required</p>}
      </div>

      <div className={inputContainer}>
        <label className={inputLabel} htmlFor="username">
          Username
        </label>
        <input
          className={twMerge(input, errors.username && "border-pink-600")}
          id="username"
          {...register("username", { required: true, minLength: 6 })}
        />
        {errors.username && (
          <p className={inputError}>
            {errors.username.type == "required"
              ? "Username is required"
              : errors.username.type == "minLength"
              ? "Username must be at least 6 characters long"
              : "Invalid username"}
          </p>
        )}
      </div>

      <div className={inputContainer}>
        <label className={inputLabel} htmlFor="password">
          Password
        </label>
        <input
          className={twMerge(input, errors.password && "border-pink-600")}
          id="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <p className={inputError}>
            {errors.password.type == "required"
              ? "Password is required"
              : errors.password.type == "minLength"
              ? "Password must be at least 6 characters long"
              : "Invalid password"}
          </p>
        )}
      </div>

      <button
        className="my-4 w-full bg-sky-800/20 border-2 border-sky-600 py-2 font-bold tracking-wider opacity-90 hover:border-sky-400 hover:opacity-100 transition duration-150 rounded-lg"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default AuthModalSignUp;
