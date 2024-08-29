import UserCreateForm from "~/components/forms/UserCreateForm";
import UserList from "~/components/lists/UserList";

const UsersPage = async () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <UserList />
      <UserCreateForm />
    </div>
  );
};

export default UsersPage;
