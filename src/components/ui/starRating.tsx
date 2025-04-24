import { StarIcon } from "lucide-react";
import { IoIosStar } from "react-icons/io";

export function StarRating({ rating }: { rating: number }) {
  const numericRating = Number(rating / 10);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <IoIosStar
          key={index}
          className={index < numericRating ? "text-star" : "text-text-secundary"}
        />
      ))}
    </div>
  );
};