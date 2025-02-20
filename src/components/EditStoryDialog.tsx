
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
import { useToast } from "@/hooks/use-toast";
import { Edit2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
}

interface EditStoryDialogProps {
  story: Story;
  onStoryUpdated: () => void;
}

export const EditStoryDialog = ({ story, onStoryUpdated }: EditStoryDialogProps) => {
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
        .from("stories")
        .update({
          title: formData.get("title")?.toString() || "",
          author: formData.get("author")?.toString() || "",
          description: formData.get("description")?.toString() || "",
        })
        .eq("id", story.id);

      if (error) throw error;

      toast({
        title: "Thành công!",
        description: "Đã cập nhật thông tin truyện.",
      });

      setOpen(false);
      onStoryUpdated();
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
        <Button variant="outline">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin truyện</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tên truyện</Label>
            <Input
              id="title"
              name="title"
              defaultValue={story.title}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Tác giả</Label>
            <Input
              id="author"
              name="author"
              defaultValue={story.author}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={story.description}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
