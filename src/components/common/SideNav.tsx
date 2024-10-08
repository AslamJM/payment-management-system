import {
  BadgeDollarSign,
  Building2,
  Store,
  User,
  Users,
  FileArchive,
  PoundSterling,
} from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getServerAuthSession } from "~/server/auth";

const SideNav = async () => {
  const session = await getServerAuthSession();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <img src="/favicon.png" alt="icon" className="h-[32px] w-[32px]" />
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/payments"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
            >
              <BadgeDollarSign className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Payments</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/daily-sales"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
            >
              <PoundSterling className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Daily Sales</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/reports"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
            >
              <FileArchive className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Reports</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/shops"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
            >
              <Store className="h-5 w-5" />
              <span className="sr-only">Shops</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Shops</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/companies"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
            >
              <Building2 className="h-5 w-5" />
              <span className="sr-only">Companies</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Companies</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/collectors"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
            >
              <Users className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Collectors</TooltipContent>
        </Tooltip>
        {session && session.user.role === "ADMIN" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/users"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-foreground md:h-8 md:w-8"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
        )}
      </nav>
    </aside>
  );
};

export default SideNav;
