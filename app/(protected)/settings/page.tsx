import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col p-8 items-center justify-center">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className="mt-8" type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
