"use client"
import { Heart } from "lucide-react";

interface WishButtonProps {
  liked: boolean;
  animate: boolean;
}

export default function WishButton({ liked, animate }: WishButtonProps) {

  return (
    <div className={`w-10 h-10 flex items-center justify-center ${animate ? 'animate-pulse' : ''}`}>
      {liked ? (
        <Heart className="w-5 h-5 fill-primaryColor text-primaryColor" />
      ) : (
        <Heart className="w-5 h-5 text-gray-400" />
      )}
    </div>
  );
}