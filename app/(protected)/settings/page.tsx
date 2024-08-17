"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const session = currentUser();
  const signOutClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <form>
        <button onClick={signOutClick} type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
