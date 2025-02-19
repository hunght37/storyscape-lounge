
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy } from "lucide-react";

const rankings = {
  daily: [
    { rank: 1, title: "Đấu Phá Thương Khung", views: 15420, up: 2 },
    { rank: 2, title: "Toàn Chức Pháp Sư", views: 12350, down: 1 },
    { rank: 3, title: "Vũ Động Càn Khôn", views: 10890, up: 1 },
    { rank: 4, title: "Tuyệt Thế Võ Thần", views: 9876, same: true },
    { rank: 5, title: "Thần Đạo Đan Tôn", views: 8765, up: 3 },
  ],
  weekly: [
    { rank: 1, title: "Toàn Chức Pháp Sư", views: 89750, up: 1 },
    { rank: 2, title: "Đấu Phá Thương Khung", views: 85420, down: 1 },
    { rank: 3, title: "Vũ Động Càn Khôn", views: 76540, same: true },
    { rank: 4, title: "Thần Đạo Đan Tôn", views: 65430, up: 2 },
    { rank: 5, title: "Tuyệt Thế Võ Thần", views: 54320, down: 2 },
  ],
  monthly: [
    { rank: 1, title: "Đấu Phá Thương Khung", views: 354200, same: true },
    { rank: 2, title: "Toàn Chức Pháp Sư", views: 325400, same: true },
    { rank: 3, title: "Thần Đạo Đan Tôn", views: 298760, up: 2 },
    { rank: 4, title: "Vũ Động Càn Khôn", views: 276540, down: 1 },
    { rank: 5, title: "Tuyệt Thế Võ Thần", views: 254320, down: 1 },
  ],
};

const RankingList = ({ items }: { items: typeof rankings.daily }) => (
  <div className="space-y-4">
    {items.map((item) => (
      <Card key={item.title}>
        <CardContent className="flex items-center p-4">
          <div className="flex items-center justify-center w-8 h-8 mr-4">
            {item.rank === 1 ? (
              <Trophy className="w-6 h-6 text-yellow-500" />
            ) : (
              <span className="text-lg font-bold">{item.rank}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {item.views.toLocaleString()} lượt xem
            </p>
          </div>
          <Button variant="ghost" className="ml-4">
            Đọc ngay
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Rankings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Bảng Xếp Hạng</h1>
          <Tabs defaultValue="daily">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="daily">Hôm nay</TabsTrigger>
              <TabsTrigger value="weekly">Tuần này</TabsTrigger>
              <TabsTrigger value="monthly">Tháng này</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <RankingList items={rankings.daily} />
            </TabsContent>
            <TabsContent value="weekly">
              <RankingList items={rankings.weekly} />
            </TabsContent>
            <TabsContent value="monthly">
              <RankingList items={rankings.monthly} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Rankings;
