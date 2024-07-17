import UserCreateForm from "~/components/forms/UserCreateForm";
import UserList from "~/components/lists/UserList";

const UsersPage = async () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <UserList />
      </div>
      <div className="w-full md:w-1/2">
        <UserCreateForm />
      </div>
    </div>
  );
};

export default UsersPage;
