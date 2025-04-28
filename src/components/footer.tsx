"use client"
import { SiteContentProps } from "@/types/siteContent";
import { Flex } from "./ui/flex";
import { Grid } from "./ui/grid";
import Image from "next/image";
import playStore from "@/assets/playstorylogo.png";
import apleStory from "@/assets/aplestory.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Category } from "@/types/category";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaGithub,
  FaLink,
  FaWhatsapp,
  FaPhone

} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

export function Footer({ footerData }: { footerData: SiteContentProps }) {
  const [departments, setDepartments] = useState<Category[] | null>(null);

  useEffect(() => {
    async function getDepartments() {
      const { data } = await api.get('/category?hasChildren=true');
      setDepartments(data);
    }
    getDepartments();
  }, []);

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "facebook":
        return <FaFacebook />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      case "twitter":
        return <FaXTwitter />;
      case "youtube":
        return <FaYoutube />;
      case "tiktok":
        return <FaTiktok />;
      default:
        return <FaLink /> // ou um ícone padrão, tipo um globo ou interrogação
    }
  };
  const getContactInfo = (name: string) => {
    switch (name.toLowerCase()) {
      case "email":
        return <MdOutlineMailOutline />;
      case "whatsapp":
        return <FaWhatsapp />;
      case "phone":
        return <FaPhone />;
      default:
        return <FaLink />; // ou um ícone padrão, tipo um globo ou interrogação
    }
  };
  return (
    <Flex className="flex-col w-full items-center justify-center bg-bgCard mt-10">
      <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 md:px-10 lg:px-2.5  xl:px-0 max-w-7xl w-full">

        <Flex className="max-h-75 h-full flex-col justify-between p-2">
          <h1 className="text-3xl font-bold uppercase text-title">
            {footerData.title}
          </h1>
          <p className="line-clamp-4 text-sm">
            {footerData.metaDescription}
          </p>
          <h2 className="font-semibold text-title">Baixe os aplicativos</h2>
          <div className="relative w-35 h-10">
            <Image
              src={playStore}
              alt="playstore"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative w-35 h-10">
            <Image
              src={apleStory}
              alt="playstore"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </Flex>

        <Flex className="flex-col itmes-center p-2">
          <h2 className="font-semibold text-title">Departamentos</h2>
          <Flex className="flex-col flex-wrap md:max-h-90 max-h-70 gap-1">
            {departments?.map(category =>
              category.children.map(item => {
                const slug = item.name
                  .toLowerCase()
                  .normalize("NFD") // remove acentos
                  .replace(/[\u0300-\u036f]/g, "") // remove marcas restantes
                  .replace(/\s+/g, "-") // troca espaços por hífens
                  .replace(/[^\w-]+/g, ""); // remove caracteres especiais

                return (
                  <Link
                    key={item.id}
                    className="hover:text-hover capitalize md:text-sm"
                    href={`?category=${item.name}`}
                  >
                    {item.name}
                  </Link>
                );
              })
            )}
          </Flex>

        </Flex>

        <Flex className="flex-col itmes-center p-2 gap-1">
          <h2 className="font-semibold text-title">Institucional</h2>

          {footerData?.institutionalLink.map(item => (
            <Link key={item.id} href={item.link} className="hover:text-hover capitalize md:text-sm">{item.name}</Link>
          ))}
        </Flex>

        <Flex className="flex-col justify-between p-2">

          <h2 className="font-semibold text-title">Mídias Sociais</h2>
          <Flex className="gap-2.5 my-2">
            {footerData.socialMedia.map(item => (
              <Link
                key={item.id}
                href={item.link}
                className="hover:text-hover flex items-center gap-2.5"
              >
                {getSocialIcon(item.name)}
              </Link>
            ))}
          </Flex>

          <Flex className="flex-col gap-1 my-2">
            <h2 className="font-semibold text-title">Atendimento</h2>
            {footerData.contactInfo.map(item => (
              <Flex key={item.id} className="hover:text-hover items-center gap-2.5 md:text-sm">
                {getContactInfo(item.type)}
                {item.value}
              </Flex>
            ))}
          </Flex>



          <h2 className="font-semibold text-title">Horário de atendimento:</h2>
          <p className="md:text-sm">
            {footerData.openingHours}
          </p>
          <Flex className="flex-col">
            <span className="font-semibold">Central SAC:</span>
            <Link href="/" className="hover:text-hover md:text-sm">
              Clique aqui
            </Link>
          </Flex>

        </Flex>
      </Grid>

      <Flex className="bg-themeColor w-full items-center justify-center px-4 border-t border-borderColor">
        <p className="max-w-7xl w-full text-[11px] py-4">
          {footerData.footerText}
          <Link href="/" className="text-[11px] mx-3 hover:text-hover">
            Clique aqui e veja as políticas de nossa empresa.
          </Link>

        </p>
      </Flex>
    </Flex>
  )
}