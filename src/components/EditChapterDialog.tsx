
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

interface Chapter {
  id: string;
  title: string;
  content: string;
  chapter_number: number;
}

interface EditChapterDialogProps {
  chapter: Chapter;
  onChapterUpdated: () => void;
}

export const EditChapterDialog = ({ chapter, onChapterUpdated }: EditChapterDialogProps) => {
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
        .update({
          title: formData.get("title"),
          content: formData.get("content"),
        })
        .eq("id", chapter.id);

      if (error) throw error;

      toast({
        title: "Thành công!",
        description: "Đã cập nhật nội dung chương.",
      });

      setOpen(false);
      onChapterUpdated();
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
        <Button variant="outline" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa chương {chapter.chapter_number}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tên chương</Label>
            <Input
              id="title"
              name="title"
              defaultValue={chapter.title}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Nội dung</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={chapter.content}
              required
              className="min-h-[300px]"
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
