import React from "react";
import dynamic from "next/dynamic";
const LoginView = dynamic(() => import("./_components"));

const Page = async ({
  params,
}: {
  params: Promise<{ logins_slug: string }>;
}) => {
  const slug = (await params).logins_slug;
  return <LoginView slug={slug}/>;
};

export default Page;
