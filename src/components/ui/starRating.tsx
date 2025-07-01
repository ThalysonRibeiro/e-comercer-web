import { IoIosStar } from "react-icons/io";

export function StarRating({ rating, size }: { rating: number, size?: number }) {
  const numericRating = Number(rating / 10);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <IoIosStar
          size={size}
          key={index}
          className={index < numericRating ? "text-star" : "secondary-foreground"}
        />
      ))}
    </div>
  );
};