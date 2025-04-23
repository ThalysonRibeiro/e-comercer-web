import { ThemeColorsProps } from "./themeColors";

export interface SiteContentProps {
  id: string;
  banner: string;
  video: string;
  bg_video: string;
  image_logo: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image_openGraph: string;
  favicon: string;
  service: string[];
  footerText: string;
  themeColor: string;
  secondaryColor: string;
  isActive: boolean;
  promotions: PromotionsProps[];
  promotionHero: PromotionHeroProps[];
  socialMedia: SocialMediaProps[];
  contactInfo: ContactInfoProps[];
  themeColors: ThemeColorsProps[];
}

export interface PromotionsProps {
  id: string;
  title: string;
  slug: string;
  banner?: string;
  video?: string;
  description?: string;
  discountType?: string;
  discountValue?: number;
  couponCode?: string;
  isActive: boolean;
  startDate?: number;
  endDate?: Date;
  buttonText?: string;
  buttonLink?: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  siteContentId: string;
}

export interface PromotionHeroProps {
  id: string;
  title: string;
  subTitle: string;
  sale: string;
  description: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  position?: string;
  isActive: boolean;
  order: number;
  startDate?: number;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  siteContentId: string;
}

export interface SocialMediaProps {
  id: string;
  siteContentId: string;
  name: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInfoProps {
  id: string;
  siteContentId: string;
  type: string;
  value: string;
  label?: string;
  createdAt: Date;
  updatedAt: Date;
}