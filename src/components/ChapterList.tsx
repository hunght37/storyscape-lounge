
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { EditChapterDialog } from "@/components/EditChapterDialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, BookOpen } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChapterListProps {
  storyId: string;
  isAdmin: boolean;
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  chapter_number: number;
}

export const ChapterList = ({ storyId, isAdmin }: ChapterListProps) => {
  const { toast } = useToast();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

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
    <>
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Danh sách chương</h2>
        {chapters?.map((chapter) => (
          <div
            key={chapter.id}
            className="flex items-center justify-between p-3 sm:p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => setSelectedChapter(chapter)}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm sm:text-base truncate">
                Chương {chapter.chapter_number}: {chapter.title}
              </h3>
            </div>
            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChapter(chapter);
                }}
              >
                <BookOpen className="h-4 w-4" />
              </Button>
              {isAdmin && (
                <>
                  <EditChapterDialog
                    chapter={chapter}
                    onChapterUpdated={refetch}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChapter(chapter.id, chapter.chapter_number);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedChapter} onOpenChange={() => setSelectedChapter(null)}>
        <DialogContent className="max-w-4xl h-[90vh] sm:h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Chương {selectedChapter?.chapter_number}: {selectedChapter?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 prose max-w-none px-2 sm:px-4">
            {selectedChapter?.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base leading-relaxed sm:leading-relaxed my-4">
                {paragraph}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
