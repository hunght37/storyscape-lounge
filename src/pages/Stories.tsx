
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StoryCard } from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddStoryDialog } from "@/components/AddStoryDialog";
import { useAuth } from "@/contexts/AuthContext";

interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url: string;
  chapters_count: number;
  categories: { name: string }[];
}

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdmin } = useAuth();

  const { data: stories, refetch } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select(`
          id,
          title,
          author,
          description,
          cover_url,
          chapters_count,
          story_categories(
            categories(name)
          )
        `);

      if (error) throw error;

      return data.map((story) => ({
        ...story,
        categories: story.story_categories.map(
          (sc: any) => sc.categories
        ),
      })) as Story[];
    },
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Truyện Mới</h1>
          <div className="flex gap-4">
            <div className="relative w-64">
              <Input
                type="search"
                placeholder="Tìm kiếm truyện..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {isAdmin && <AddStoryDialog onStoryAdded={refetch} />}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {filteredStories?.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              author={story.author}
              description={story.description}
              categories={story.categories.map((c) => c.name)}
              coverUrl={story.cover_url || "https://placehold.co/120x160"}
              chaptersCount={story.chapters_count}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Stories;
