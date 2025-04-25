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
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaGithub,
  FaLink,
  FaVoicemail,
  FaWhatsapp,
  FaPhone

} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

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
        return <FaTwitter />;
      case "youtube":
        return <FaYoutube />;
      case "tiktok":
        return <FaTiktok />;
      case "github":
        return <FaGithub />;
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
    <Flex className="w-full items-center justify-center bg-bgCard py-4">
      <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 max-w-7xl w-full">

        <Flex className="max-h-75 h-full flex-col justify-between space-y-4 p-2">
          <h1 className="text-3xl font-bold uppercase text-title">
            {footerData.title}
          </h1>
          <p className="line-clamp-4 text-sm">
            {footerData.metaDescription}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae placeat accusantium possimus aliquam fugiat voluptatibus sit sapiente, aspernatur ex delectus quis quas, reprehenderit, nostrum voluptas ad ratione porro architecto illum.
          </p>
          <h2 className="font-semibold text-title">Baixe os aplicativos</h2>
          <div className="relative w-35 h-10">
            <Image
              src={playStore}
              alt="playstore"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-35 h-10">
            <Image
              src={apleStory}
              alt="playstore"
              fill
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
                    href={`/produtos/${slug}`}
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

          <Link href="/" className="hover:text-hover capitalize md:text-sm">Sobre o {footerData.title}!</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">{footerData.title}! ADS</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Políticas de Cookies</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Políticas de Privacidade</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Proteção de Marcas</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Código de Defesa do Consumidor</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Exerça seus Direitos de Privacidade</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Código de Conduta e Ética</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Canal Confidencial</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Segurança & Privacidade</Link>
          <Link href="/" className="hover:text-hover capitalize md:text-sm">Relatórios</Link>

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
          <p className="md:text-sm max-w-55">
            08:00 às 20:00 - Segunda a Sexta,
            09:00 às 15:00 - Sabado,
            horário de Brasília (Exceto domingo e feriados)
            <span className="mx-1 font-semibold">Endereço:</span>
            Rua Narnia, 123 - Centro
            Fantasy/XX - CEP: 12345-000
          </p>
          <Flex className="flex-col">
            <span className="font-semibold">Central SAC:</span>
            <Link href="/" className="hover:text-hover md:text-sm">
              Clique aqui
            </Link>
          </Flex>

        </Flex>
      </Grid>
    </Flex>
  )
}