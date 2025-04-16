import Image from "next/image";
import imgAnnouncement from "@/assets/card-anuncio.png";

export function CardAnnouncement() {
  return (
    <div className="min-w-75 h-112.5 border rounded-lg hidden lg:block">
      <Image
        src={imgAnnouncement}
        alt="imagem anuncio"
        width={300}
        height={450}
        className="w-full h-full bg-cover bg-no-repeat object-cover"
      />
    </div>
  )
}