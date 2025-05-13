"use client";

import React from "react";
import Link from "next/link";
import { Flex, Text } from "@/once-ui/components";

interface CustomLogoProps {
  className?: string;
  href?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  style?: React.CSSProperties;
  icon?: boolean;
}

const sizeVariantMap = {
  xs: "body-strong-xs",
  s: "body-strong-s", 
  m: "heading-strong-s",
  l: "heading-strong-m",
  xl: "heading-strong-l",
};

export const CustomLogo: React.FC<CustomLogoProps> = ({
  href = "/",
  size = "m",
  icon = true,
  className,
  style,
  ...props
}) => {
  const content = (
    <Flex gap="8" vertical="center">
      {icon && (
        <div 
          style={{
            width: size === "xs" ? "16px" : size === "s" ? "20px" : size === "m" ? "24px" : size === "l" ? "28px" : "32px",
            height: size === "xs" ? "16px" : size === "s" ? "20px" : size === "m" ? "24px" : size === "l" ? "28px" : "32px",
            borderRadius: "50%",
            background: "var(--brand-background-strong)"
          }}
        />
      )}
      <Text 
        variant={sizeVariantMap[size] as any} 
        onBackground="brand-strong"
        weight="strong"
      >
        Rod Ui
      </Text>
    </Flex>
  );

  return href ? (
    <Link href={href} className={className} style={style} {...props}>
      {content}
    </Link>
  ) : (
    <div className={className} style={style} {...props}>
      {content}
    </div>
  );
}; 