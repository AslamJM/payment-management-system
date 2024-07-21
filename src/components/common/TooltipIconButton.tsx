import { type FC, type ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface TooltipIconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  content: string;
}

const TooltipIconButton: FC<TooltipIconButtonProps> = ({
  children,
  content,
  onClick,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={onClick}
        className="rounded-full bg-accent text-accent-foreground"
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipIconButton;
