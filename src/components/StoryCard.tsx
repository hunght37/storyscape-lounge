
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface StoryCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  categories: string[];
  coverUrl: string;
  chaptersCount: number;
}

export const StoryCard = ({
  id,
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
        <Link to={`/stories/${id}`} className="w-[120px] h-[160px] relative overflow-hidden rounded-md shrink-0">
          <img
            src={coverUrl}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/stories/${id}`}>
            <h3 className="font-bold text-base sm:text-lg leading-tight mb-2 hover:text-primary truncate">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2">{author}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <p className="text-sm line-clamp-2 hidden sm:block">{description}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4 mr-1" />
          {chaptersCount} chương
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
