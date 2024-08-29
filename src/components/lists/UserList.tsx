import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { api } from "~/trpc/server";
import { Table } from "../ui/table";
import SimpleTableHeader from "../common/SimpleTableHeader";
import UserRow from "~/app/users/_components/UserRow";

export default async function UserList() {
  const users = await api.users.getAll();

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <SimpleTableHeader heads={["username", "name", "role", "actions"]} />
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </Table>
      </CardContent>
    </Card>
  );
}
