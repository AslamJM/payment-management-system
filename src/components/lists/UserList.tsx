import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { api } from "~/trpc/server";

export default async function UserList() {
  const users = await api.users.getAll();
  console.log(users);

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of users</CardTitle>
      </CardHeader>
      <CardContent>
        {users.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
      </CardContent>
    </Card>
  );
}
