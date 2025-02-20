
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { BookPlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AddChapterDialogProps {
  storyId: string;
  onChapterAdded: () => void;
  currentChapterCount: number;
}

export const AddChapterDialog = ({ 
  storyId, 
  onChapterAdded,
  currentChapterCount 
}: AddChapterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { error } = await supabase
        .from("chapters")
        .insert([{
          story_id: storyId,
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          chapter_number: currentChapterCount + 1,
        }]);

      if (error) throw error;

      // Update the chapters count in the stories table
      const { error: updateError } = await supabase
        .from("stories")
        .update({ chapters_count: currentChapterCount + 1 })
        .eq("id", storyId);

      if (updateError) throw updateError;

      toast({
        title: "Thành công!",
        description: "Chương mới đã được thêm vào truyện.",
      });

      form.reset();
      setOpen(false);
      onChapterAdded();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookPlus className="mr-2 h-4 w-4" />
          Thêm chương mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Thêm chương mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tên chương</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Nội dung</Label>
            <Textarea 
              id="content" 
              name="content" 
              required 
              className="min-h-[200px]"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Thêm chương
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
