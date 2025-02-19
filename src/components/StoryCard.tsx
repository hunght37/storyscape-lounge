
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart } from "lucide-react";

interface StoryCardProps {
  title: string;
  author: string;
  description: string;
  categories: string[];
  coverUrl: string;
  chaptersCount: number;
}

export const StoryCard = ({
  title,
  author,
  description,
  categories,
  coverUrl,
  chaptersCount,
}: StoryCardProps) => {
  return (
    <Card className="story-card">
      <CardHeader className="flex-row gap-4 space-y-0">
        <div className="w-[120px] h-[160px] relative overflow-hidden rounded-md">
          <img
            src={coverUrl}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg leading-tight mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{author}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <p className="text-sm line-clamp-2">{description}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4 mr-1" />
          {chaptersCount} chương
        </div>
        <Button variant="ghost" size="icon">
          <Heart className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
