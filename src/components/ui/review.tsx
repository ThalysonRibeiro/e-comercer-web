"use client"
import { StarRating } from "./starRating";
import Image from "next/image";
import { ReviewProps } from "@/types/review";
import { formatDate } from "@/utils/formatDate";
import { Flex } from "./flex";
import no_image from "@/assets/no-image.png";


export function Review({ reviewData }: { reviewData: ReviewProps }) {

  return (

    <div className="border border-border rounded-lg bg-card space-y-2.5 p-3">
      <StarRating rating={reviewData.rating * 10} />
      <p className="line-clamp-1 text-sm">
        {reviewData.title}
      </p>
      <p className="line-clamp-2 text-sm">
        {reviewData.comment}
      </p>
      {reviewData.user && (
        <Flex className="gap-3">
          <div
            className="w-10 h-10 border-2 rounded-full relative"
          >
            <Image
              src={reviewData.user.avatar ? reviewData.user.avatar : no_image}
              alt="user"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-sm">
              {reviewData.user.name}
            </h2>
            <span className="text-sm">
              {formatDate(reviewData.createdAt)}
            </span>
          </div>
        </Flex>
      )}
    </div>

  )
}