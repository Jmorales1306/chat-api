import { Link } from "react-router-dom";
import { useUser } from "../context/auth.context";

export default function Channel({ channel }) {
  const lastMessage = channel.messages[channel.messages.length - 1];

  const user = useUser();

  const senderUser =
    lastMessage?.sender.name === user.name ? "You" : lastMessage?.sender.name;

  return (
    <Link
      to={`/channels/${channel.id}`}
      className="flex w-full px-3 py-2 items-center gap-x-2 border-[1.5px] border-gray-200 rounded-sm transition-[border] duration-300 hover:border-[#827ded]"
    >
      <div className="flex justify-center items-center rounded-full h-[50px] font-bold text-white w-[50px] bg-[#665dfe]">
        {channel.name}
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-[13px]">
          {`
          ${senderUser ?? "" ? senderUser + ":" : "void"}
          ${lastMessage?.message ?? "...."}
          `}
        </p>
      </div>
    </Link>
  );
}
