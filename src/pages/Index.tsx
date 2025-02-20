
import { Navbar } from "@/components/Navbar";
import { StoryCard } from "@/components/StoryCard";
import { Button } from "@/components/ui/button";

const mockStories = [
  {
    id: "1",
    title: "Đấu Phá Thương Khung",
    author: "Thiên Tằm Thổ Đậu",
    description:
      "Một đứa trẻ sinh ra trong gia tộc luyện dược sư, từ nhỏ đã thể hiện thiên phú hơn người. Nhưng đột nhiên một ngày, năng lực tu luyện của cậu biến mất...",
    categories: ["Tiên Hiệp", "Võ Thuật", "Huyền Huyễn"],
    coverUrl: "https://placehold.co/120x160",
    chaptersCount: 1665,
  },
  {
    id: "2",
    title: "Toàn Chức Pháp Sư",
    author: "Thần Đông",
    description:
      "Trong một thế giới ma pháp, nơi có thể tu luyện trở thành pháp sư...",
    categories: ["Huyền Huyễn", "Ma Pháp", "Phiêu Lưu"],
    coverUrl: "https://placehold.co/120x160",
    chaptersCount: 1432,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Truyện mới cập nhật</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Khám phá những tác phẩm mới nhất
              </p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">Xem tất cả</Button>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {mockStories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Truyện nổi bật</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Những tác phẩm được yêu thích nhất
              </p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">Xem tất cả</Button>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {mockStories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
