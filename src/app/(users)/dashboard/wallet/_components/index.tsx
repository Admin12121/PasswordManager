import React from "react";
import CardPage from "./card";
import AccountPage from "./account";

const Wallet = () => {
  return (
    <div className="flex flex-col gap-4">
      <CardPage />
      <AccountPage />
    </div>
  );
};

export default Wallet;
