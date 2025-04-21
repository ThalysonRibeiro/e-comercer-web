import { StarIcon } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  const numericRating = Number(rating);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={index < numericRating ? "text-star" : "text-text-secundary"}
        />
      ))}
    </div>
  );
};