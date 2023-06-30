import { Outlet, redirect, useLoaderData } from "react-router-dom";

import ChannelList from "../components/ChannelList";
import { AuthContext } from "../context/auth.context";
import ky from "../utils/ky";
import { useState } from "react";

export async function loader() {
  try {
    const user = await ky.get("user").json();
    const channels = await ky.get("channels").json();
    return {
      user,
      channels,
    };
  } catch (err) {
    if (err.response.status === 401) {
      return redirect("/login");
    }
  }
}

export default function App() {
  const { user, channels } = useLoaderData();

  const [searchChannels, setSearchChannels] = useState(channels);

  function handleLogout() {
    localStorage.removeItem("token");

    window.location.reload();
  }

  return (
    <AuthContext.Provider value={user}>
      <div className="flex h-screen">
        <div className="flex w-[420px] flex-col border border-gray-100">
          <h2 className="flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold">
            Channels
          </h2>
          <ChannelList channels={searchChannels} />
          <button
            className="flex w-[50%] self-center bg-[#665dfe] text-white items-center justify-center p-3 mb-2 rounded-[20px]"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold">
            Messages
          </h2>
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  );
}
