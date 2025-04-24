"use client"
import { useContext } from "react";
import { StarRating } from "./starRating";
import { Context, ContextType } from "@/context/Context";
import Image from "next/image";
import { ReviewProps } from "@/types/review";
import { startOfWeek, format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { formatDate } from "@/utils/formatDate";
import { Flex } from "./flex";
import no_image from "@/assets/no-image.png";


export function Review({ reviewData }: { reviewData: ReviewProps }) {

  return (

    <div className="border border-borderColor rounded-lg bg-bgCard space-y-2.5 p-6">
      <StarRating rating={reviewData.rating * 10} size={22} />
      <p className="line-clamp-1 text-title">
        {reviewData.title}
      </p>
      <p className="line-clamp-2 text-textColor">
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
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-title">
              {reviewData.user.name}
            </h2>
            <span className="text-textColor">
              {formatDate(reviewData.createdAt)}
            </span>
          </div>
        </Flex>
      )}
    </div>

  )
}