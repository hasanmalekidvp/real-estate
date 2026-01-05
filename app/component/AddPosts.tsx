/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState } from "react";
import { addPost } from "../services/posts";
import { toast } from "react-toastify";

export function AddPosts() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    published: false,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // try {
    //   await addPost(form);
    //   toast.success("Login success");
    //   window.location.href = "/";
    // } catch (e: any) {
    //   toast.error(e?.response?.data?.message || "Something went wrong");
    // }
  };

  return (
    <form className="space-y-6" action="#" onSubmit={handleSubmit}>
      <div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight p-6 text-gray-900">
          Add your first Post
        </h2>
      </div>
      <div className="p-4 flex flex-col w-72 mx-auto">
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="title"
            autoComplete="title"
            required
            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Your Post Title"
            onChange={handleFormChange}
          />
        </div>

        <div>
          <label htmlFor="title" className="sr-only">
            Content
          </label>

          <textarea
            id="content"
            name="content"
            required
            className="relative min-h-[150] block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Your Post Content"
            onChange={handleFormChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center p-4">
            <input
              id="published"
              name="published"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={(e) => {
                setForm({ ...form, published: e.target.checked });
              }}
            />
            <label
              htmlFor="published"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              Published?
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Post
        </button>
      </div>
    </form>
  );
}

export default AddPosts;
