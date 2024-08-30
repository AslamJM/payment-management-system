"use client";

import { type User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { type FC } from "react";
import DeleteUserDialog from "~/components/forms/DeleteUserDialog";
import UpdateUserDialog from "~/components/forms/UpdateUserDialog";
import { TableCell, TableRow } from "~/components/ui/table";

interface UserRowProps {
  user: Pick<User, "id" | "name" | "username" | "role">;
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
            <UpdateUserDialog user={user} />
            <DeleteUserDialog id={user.id} />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
