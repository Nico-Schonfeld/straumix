"use client";

import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface CustomLinkProps {
  href: string; // Cambiado de opcional a requerido
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  btn?: boolean;
  // Estilos separados para botón y enlace
  buttonClassName?: string;
  linkClassName?: string;
  // Props del botón
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  disabled?: boolean;
  // Props adicionales
  onClick?: () => void;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
}

const CustomLink = ({
  href,
  children,
  className,
  target,
  rel = "noopener noreferrer",
  btn = false,
  buttonClassName,
  linkClassName,
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  prefetch = true,
  scroll = true,
  replace = false,
}: CustomLinkProps) => {
  // Validación para asegurar que href no sea undefined
  if (!href) {
    console.warn("CustomLink: href is required");
    return null;
  }

  const linkProps = {
    href,
    target,
    rel,
    className: cn(linkClassName, className),
    onClick,
    prefetch,
    scroll,
    replace,
  };

  const buttonProps = {
    asChild: true as const,
    variant,
    size,
    disabled,
    className: cn(buttonClassName, className),
  };

  return btn ? (
    <Button {...buttonProps}>
      <Link {...linkProps}>{children}</Link>
    </Button>
  ) : (
    <Link {...linkProps}>{children}</Link>
  );
};

export default CustomLink;
