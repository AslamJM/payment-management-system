import { useSession } from "next-auth/react";

export const useRole = () => {
  const { data } = useSession();

  const isEmployee = data && data.user.role === "EMPLOYEE";
  const isAdmin = data && data.user.role === "ADMIN";

  return { isEmployee, isAdmin };
};
