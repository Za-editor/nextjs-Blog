"use client";

import { Content } from "next/font/google";
import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

//post form schema for validation

const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(255, "Title must be at most 255 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(255, "Description must be at most 255 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

type PostFormValues = z.infer<typeof postSchema>;
function PostForm() {

const [isPending, startTransition] = useTransition();

            const {
              register,
              handleSubmit,
              formState: { errors },
            } = useForm<PostFormValues>({
              resolver: zodResolver(postSchema),
              defaultValues: {
                title: "",
                description: "",
                content: "",
              },
            });

    const onFormSubmit = async (data: PostFormValues) => {
        startTransition(() => {
            // Simulate a server request
            setTimeout(() => {
                console.log("Post created:", data);
            }, 1000);
        });
    }
    
    return (
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter post title"
            {...register("title")}
            disabled={isPending}
          />
          {errors?.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter post description"
            {...register("description")}
            disabled={isPending}
          />
          {errors?.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Enter post content"
            className="min-h-[250px] resize-none"
            {...register("content")}
            disabled={isPending}
          />
          {errors?.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending} className="mt-5 w-full">
          {isPending ? "Creating..." : "Create Post"}
        </Button>
      </form>
    );
}

export default PostForm;
