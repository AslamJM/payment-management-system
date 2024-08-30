import {
  FileArchive,
  Home,
  IndianRupee,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  StoreIcon,
  Users,
  Users2,
} from "lucide-react";

import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import Link from "next/link";
import BreadCrumbsComp from "./BreadCrumbsComp";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex   shrink-0 items-center  gap-2 rounded-full  text-lg font-semibold text-primary-foreground md:text-base"
            >
              <img
                src="/logo.jpg"
                alt="icon"
                className="h-[32px] object-contain "
              />
            </Link>

            <Link
              href="/payments"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <IndianRupee className="h-5 w-5" />
              Payments
            </Link>
            <Link
              href="/daily-sales"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Daily Sales
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <FileArchive className="h-5 w-5" />
              Reports
            </Link>
            <Link
              href="/shops"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <StoreIcon className="h-5 w-5" />
              Shops
            </Link>
            <Link
              href="/companies"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Companies
            </Link>
            <Link
              href="/collectors"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Collectors
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <BreadCrumbsComp />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <ProfileMenu />
    </header>
  );
};

export default Navbar;
