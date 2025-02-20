
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { AddChapterDialog } from "@/components/AddChapterDialog";
import { ChapterList } from "@/components/ChapterList";
import { EditStoryDialog } from "@/components/EditStoryDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoryDetail = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: story, refetch } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select(`
          *,
          story_categories(
            categories(name)
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return {
        ...data,
        categories: data.story_categories.map((sc: any) => sc.categories),
      };
    },
  });

  const handleDeleteStory = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa truyện này?")) return;

    const { error } = await supabase
      .from("stories")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa truyện này.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Đã xóa truyện.",
    });
    navigate("/stories");
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
            <p className="text-muted-foreground mb-4">Tác giả: {story.author}</p>
            <div className="prose max-w-none mb-6">
              <p>{story.description}</p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <EditStoryDialog story={story} onStoryUpdated={refetch} />
              <Button variant="destructive" onClick={handleDeleteStory}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="mb-6">
          {isAdmin && (
            <AddChapterDialog
              storyId={story.id}
              onChapterAdded={refetch}
              currentChapterCount={story.chapters_count}
            />
          )}
        </div>
        <ChapterList storyId={story.id} isAdmin={isAdmin} />
      </main>
    </div>
  );
};

export default StoryDetail;
