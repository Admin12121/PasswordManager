import React from "react";
import ViewLogin from "./_components";

const Page = async ({
  params,
}: {
  params: Promise<{ logins_slug: string }>;
}) => {
  const slug = (await params).logins_slug;
  return <ViewLogin slug={slug}/>;
};

export default Page;
