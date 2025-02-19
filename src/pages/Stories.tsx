
import { Navbar } from "@/components/Navbar";
import { StoryCard } from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockStories = [
  {
    title: "Đấu Phá Thương Khung",
    author: "Thiên Tằm Thổ Đậu",
    description:
      "Một đứa trẻ sinh ra trong gia tộc luyện dược sư, từ nhỏ đã thể hiện thiên phú hơn người. Nhưng đột nhiên một ngày, năng lực tu luyện của cậu biến mất...",
    categories: ["Tiên Hiệp", "Võ Thuật", "Huyền Huyễn"],
    coverUrl: "https://placehold.co/120x160",
    chaptersCount: 1665,
  },
  {
    title: "Toàn Chức Pháp Sư",
    author: "Thần Đông",
    description:
      "Trong một thế giới ma pháp, nơi có thể tu luyện trở thành pháp sư...",
    categories: ["Huyền Huyễn", "Ma Pháp", "Phiêu Lưu"],
    coverUrl: "https://placehold.co/120x160",
    chaptersCount: 1432,
  },
  {
    title: "Vũ Động Càn Khôn",
    author: "Thiên Tằm Thổ Đậu",
    description:
      "Trong thế giới của võ đạo, một thiếu niên với ước mơ trở thành võ giả mạnh nhất...",
    categories: ["Tiên Hiệp", "Võ Thuật"],
    coverUrl: "https://placehold.co/120x160",
    chaptersCount: 1289,
  },
  {
    title: "Tuyệt Thế Võ Thần",
    author: "Vô Lượng Thức",
    description:
      "Câu chuyện về một thiếu niên với khát vọng trở thành võ thần tối cao...",
    categories: ["Võ Thuật", "Huyền Huyễn"],
    coverUrl: "https://placehold.co/120x160",
    chaptersCount: 986,
  },
];

const Stories = () => {
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
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline">Lọc</Button>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {mockStories.map((story) => (
            <StoryCard key={story.title} {...story} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Stories;
