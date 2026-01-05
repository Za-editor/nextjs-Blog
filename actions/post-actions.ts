"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { success } from "zod";

export async function createPost(formData: FormData) {
  try {
    //get current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session?.user) {
      return {
        success: false,
        Message: "You must be logged in to create a post",
      };
    }

    // get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    //homework -> implementation an extra validation check

    //create the slug from post title
    const slug = slugify(title);

    //check if the slug already exist
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message: "A post with this slug already exists",
      };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

      //revalidate the homepage to get the latest post
      revalidatePath("/");
      revalidatePath(`/posts/${slug}`);
      revalidatePath("/profile");

      return {
          success: true,
          message: "Post created successfully",
          slug
      }
  } catch (error) {
      return {
          success: false,
          message: "Failed to create post",
      }
      
  }
}
