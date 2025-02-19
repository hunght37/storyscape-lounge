
import { supabase } from "@/integrations/supabase/client";

export interface StoryFormData {
  title: string;
  author: string;
  description: string;
  status: "ongoing" | "completed" | "dropped";
  cover_url?: string | null;
  user_id: string;
}

export const uploadCoverImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("story-covers")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from("story-covers")
    .getPublicUrl(filePath);

  return publicUrl;
};

export const createStory = async (data: StoryFormData) => {
  const { data: story, error: storyError } = await supabase
    .from("stories")
    .insert([data])
    .select()
    .single();

  if (storyError) throw storyError;
  return story;
};

export const addStoryCategories = async (storyId: string, categoryIds: string[]) => {
  if (categoryIds.length === 0) return;

  const { error: categoryError } = await supabase
    .from("story_categories")
    .insert(
      categoryIds.map((categoryId) => ({
        story_id: storyId,
        category_id: categoryId,
      }))
    );

  if (categoryError) throw categoryError;
};
