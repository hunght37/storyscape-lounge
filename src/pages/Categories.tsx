
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const categories = [
  {
    name: "Tiên Hiệp",
    count: 458,
    description: "Truyện về con đường tu tiên, phi thăng",
  },
  {
    name: "Võ Thuật",
    count: 385,
    description: "Truyện về võ học, kiếm đạo",
  },
  {
    name: "Huyền Huyễn",
    count: 623,
    description: "Truyện về thế giới huyền ảo, pháp thuật",
  },
  {
    name: "Đô Thị",
    count: 294,
    description: "Truyện về cuộc sống đô thị hiện đại",
  },
  {
    name: "Xuyên Không",
    count: 347,
    description: "Truyện về du hành thời gian, xuyên việt",
  },
  {
    name: "Khoa Huyễn",
    count: 186,
    description: "Truyện về khoa học viễn tưởng",
  },
  {
    name: "Dị Giới",
    count: 275,
    description: "Truyện về thế giới khác, dị giới",
  },
  {
    name: "Ngôn Tình",
    count: 432,
    description: "Truyện tình cảm lãng mạn",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Thể Loại</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {category.count}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <Button className="w-full mt-4" variant="outline">
                  Xem truyện
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
