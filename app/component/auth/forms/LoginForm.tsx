"use client";

import { useState } from "react";
import { login } from "../../../services/auth";
import { toast } from "react-toastify";

export function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(form);
      toast.success("Login success");
      window.location.href = "/";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      className="space-y-6"
      action="#"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight p-6 text-gray-900">
          Login
        </h2>
      </div>
      <div className="p-4 flex flex-col w-72 mx-auto">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Email address"
            onChange={handleFormChange}
          />
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Password"
            onChange={handleFormChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center p-4">
            <input
              id="accept-privacy"
              name="accept-privacy"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="accept-privacy"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              I accepted the {""}
              <a
                href="/privacy-policy"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                privacy policy
              </a>
              {""}!
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>

        <p className="text-center text-sm leading-6 text-gray-500">
          Create an account ?{" "}
          <a
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
