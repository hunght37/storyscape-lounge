
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { EditChapterDialog } from "@/components/EditChapterDialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface ChapterListProps {
  storyId: string;
  isAdmin: boolean;
}

export const ChapterList = ({ storyId, isAdmin }: ChapterListProps) => {
  const { toast } = useToast();

  const { data: chapters, refetch } = useQuery({
    queryKey: ["chapters", storyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("story_id", storyId)
        .order("chapter_number", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const handleDeleteChapter = async (chapterId: string, chapterNumber: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa chương này?")) return;

    const { error } = await supabase
      .from("chapters")
      .delete()
      .eq("id", chapterId);

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa chương này.",
        variant: "destructive",
      });
      return;
    }

    // Update chapters_count in stories table
    await supabase
      .from("stories")
      .update({ chapters_count: chapters!.length - 1 })
      .eq("id", storyId);

    toast({
      title: "Thành công",
      description: "Đã xóa chương.",
    });
    refetch();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Danh sách chương</h2>
      {chapters?.map((chapter) => (
        <div
          key={chapter.id}
          className="flex items-center justify-between p-4 rounded-lg border"
        >
          <div>
            <h3 className="font-medium">
              Chương {chapter.chapter_number}: {chapter.title}
            </h3>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <>
                <EditChapterDialog
                  chapter={chapter}
                  onChapterUpdated={refetch}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteChapter(chapter.id, chapter.chapter_number)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
