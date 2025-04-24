import { FaHeart } from "react-icons/fa";

export function Heart({ heart }: { heart: boolean }) {

  return (
    <div className="flex">
      <FaHeart

        size={20}
        className={heart ? "text-primaryColor" : "text-text-secundary"}
      />
    </div>
  );
};