"use client";

import Image from "next/image";

export const Header = () => {
  return (
    <header className="py-5">
      <Image width={90} height={38} src="/images/logo.svg" alt="Logo" />
    </header>
  );
};
