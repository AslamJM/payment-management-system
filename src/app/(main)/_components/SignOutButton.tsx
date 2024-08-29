"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignOutButton = () => {
  const { data } = useSession();
  return (
    <div className="flex w-full items-center justify-center">
      {data && (
        <h3>
          signed In as {data.user.name} {data.user.role}
        </h3>
      )}
      <Button onClick={() => signOut()}>signOut</Button>
    </div>
  );
};

export default SignOutButton;
