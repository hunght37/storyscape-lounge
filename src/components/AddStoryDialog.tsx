
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BookPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { CategorySelector } from "./CategorySelector";
import { addStoryCategories, createStory, uploadCoverImage } from "@/utils/story";

interface Category {
  id: string;
  name: string;
}

export const AddStoryDialog = ({ onStoryAdded }: { onStoryAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");
      if (error) throw error;
      return data as Category[];
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    setLoading(true);

    try {
      let coverUrl = null;
      if (coverFile) {
        coverUrl = await uploadCoverImage(coverFile);
      }

      const story = await createStory({
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        description: formData.get("description") as string,
        cover_url: coverUrl,
        status: formData.get("status") as "ongoing" | "completed" | "dropped",
        user_id: user.id,
      });

      await addStoryCategories(story.id, selectedCategories);

      toast({
        title: "Thành công!",
        description: "Truyện đã được thêm vào hệ thống.",
      });

      form.reset();
      setCoverFile(null);
      setSelectedCategories([]);
      setOpen(false);
      onStoryAdded();
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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories((prev) => 
      prev.includes(categoryId) 
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookPlus className="mr-2 h-4 w-4" />
          Thêm truyện mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Thêm truyện mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tên truyện</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Tác giả</Label>
            <Input id="author" name="author" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea id="description" name="description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">Ảnh bìa</Label>
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select name="status" defaultValue="ongoing">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ongoing">Đang ra</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="dropped">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onSelect={handleCategorySelect}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Thêm truyện
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
