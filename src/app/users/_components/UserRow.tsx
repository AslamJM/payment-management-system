"use client";

import { type User } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { type FC } from "react";
import TooltipIconButton from "~/components/common/TooltipIconButton";
import { TableCell, TableRow } from "~/components/ui/table";

interface UserRowProps {
  user: User;
}

const UserRow: FC<UserRowProps> = ({ user }) => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <TableRow>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        {session && session.user.id !== user.id && (
          <div className="flex items-center gap-4">
            <TooltipIconButton content="Edit">
              <Edit className="h-4 w-4 text-orange-500" />
            </TooltipIconButton>
            <TooltipIconButton content="Delete">
              <Trash className="h-4 w-4 text-red-500" />
            </TooltipIconButton>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
