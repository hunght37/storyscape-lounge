
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">TruyenHay</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a className="nav-link" href="/stories">
              Truyện mới
            </a>
            <a className="nav-link" href="/categories">
              Thể loại
            </a>
            <a className="nav-link" href="/rankings">
              Bảng xếp hạng
            </a>
          </nav>
        </div>
        <Button
          variant="ghost"
          className="inline-flex items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
          <Button variant="outline" asChild>
            <a href="/login">Đăng nhập</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
