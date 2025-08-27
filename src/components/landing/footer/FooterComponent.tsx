import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { LogoStraumix } from "@/components/ui/Icons/LogoStraumix";
import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
} from "lucide-react";
import footerData from "@/data/footer.json";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#0c1e1b] border-t border-[#BAD8B6]/20 dark:border-[#61B390]/20">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Company Info & Logo */}
          <div className="space-y-6">
            <div className="mb-4">
              <LogoStraumix w={140} />
            </div>
            <p className="text-sm text-gray-600 dark:text-[#BAD8B6] leading-relaxed max-w-sm">
              {footerData.company.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#BAD8B6] pt-2">
              <Heart className="w-4 h-4 text-[#61B390]" />
              <span className="font-medium">{footerData.company.location}</span>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-6">
            <h3 className="font-semibold text-[#01352C] dark:text-white text-sm uppercase tracking-wide mb-4">
              {footerData.sections.product.title}
            </h3>
            <ul className="space-y-3">
              {footerData.sections.product.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={link.rel || undefined}
                    className="text-sm text-gray-600 dark:text-[#BAD8B6] hover:text-[#61B390] dark:hover:text-[#E1EACD] transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-6">
            <h3 className="font-semibold text-[#01352C] dark:text-white text-sm uppercase tracking-wide mb-4">
              {footerData.sections.company.title}
            </h3>
            <ul className="space-y-3">
              {footerData.sections.company.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target={link.target}
                    rel={link.rel || undefined}
                    className="text-sm text-gray-600 dark:text-[#BAD8B6] hover:text-[#61B390] dark:hover:text-[#E1EACD] transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="font-semibold text-[#01352C] dark:text-white text-sm uppercase tracking-wide mb-4">
              {footerData.contact.title}
            </h3>
            <div className="space-y-4">
              {footerData.contact.info.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                const isLink = item.href;

                const content = (
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-[#BAD8B6] group">
                    <div className="w-8 h-8 bg-[#E1EACD]/20 dark:bg-[#61B390]/20 rounded-md flex items-center justify-center group-hover:bg-[#61B390]/20 dark:group-hover:bg-[#E1EACD]/20 transition-colors duration-200">
                      <IconComponent className="w-4 h-4 text-[#61B390] dark:text-[#E1EACD]" />
                    </div>
                    <span className="group-hover:text-[#61B390] dark:group-hover:text-[#E1EACD] transition-colors duration-200">
                      {item.text}
                    </span>
                  </div>
                );

                return isLink ? (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.target}
                    rel={item.rel || undefined}
                    className="block"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-[#01352C] dark:text-white mb-3 uppercase tracking-wide">
                {footerData.social.title}
              </h4>
              <div className="flex items-center gap-3">
                {footerData.social.links.map((social, index) => {
                  const IconComponent = getIcon(social.icon);

                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target={social.target}
                      rel={social.rel || undefined}
                      aria-label={`Seguir en ${social.text}`}
                      className="w-9 h-9 bg-[#E1EACD]/20 dark:bg-[#61B390]/20 rounded-md flex items-center justify-center text-gray-600 dark:text-[#BAD8B6] hover:bg-[#61B390] hover:text-white dark:hover:bg-[#E1EACD] dark:hover:text-[#01352C] transition-all duration-200"
                    >
                      <IconComponent className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#BAD8B6]/20 dark:border-[#61B390]/20 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright & Links */}
            <div className="flex flex-col lg:flex-row items-center gap-6 text-sm text-gray-600 dark:text-[#BAD8B6]">
              <span className="font-medium">
                &copy; {currentYear} Straumix. Todos los derechos reservados.
              </span>
              <div className="flex items-center gap-6">
                {footerData.legal.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target={link.target}
                    rel={link.rel || undefined}
                    className="hover:text-[#61B390] dark:hover:text-[#E1EACD] transition-colors duration-200 font-medium"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="flex items-center gap-3 bg-[#E1EACD]/20 dark:bg-[#61B390]/20 px-3 py-2 rounded-md">
              <span className="text-xs text-gray-600 dark:text-[#BAD8B6] font-medium">
                Tema:
              </span>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Función para obtener el icono según el nombre
const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Instagram,
    Linkedin,
  };
  return iconMap[iconName] || Mail;
};

export default FooterComponent;
