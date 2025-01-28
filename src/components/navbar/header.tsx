"use client";
import React from "react";
import dynamic from 'next/dynamic'
import Nav from "./nav";

const SiteBanner = dynamic(() => import('../site-banner'), { ssr: false })

export function SiteHeader({ children }: { children?: React.ReactNode }) {
  // const { status } = useAuthUser();

  return (
    <>
      <SiteBanner />
      <Nav/>
    </>
  );
}
