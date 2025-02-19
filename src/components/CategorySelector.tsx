
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[] | undefined;
  selectedCategories: string[];
  onSelect: (categoryId: string) => void;
}

export const CategorySelector = ({
  categories,
  selectedCategories,
  onSelect,
}: CategorySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Thể loại</Label>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
