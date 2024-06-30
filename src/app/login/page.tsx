import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "~/components/forms/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function LoginPage() {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/");
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="w-full md:w-[600px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
