import { cva } from "class-variance-authority";

export const typographyVariants = cva({
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      th: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      td: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
      muted: "text-sm text-muted-foreground",
    },
    size: {
      default: "text-base",
      sm: "text-sm font-medium leading-none",
      lg: "text-lg font-semibold",
    },
  },
  defaultVariants: {
    variant: "p",
    size: "default",
  },
});
