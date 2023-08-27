import React from "react";
import SectionHeader from "../../components/SectionHeader";
import TransactionsContainerMui from "./TransactionsContainerMui";

function Transactions() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Transactions"}
        subtitle="View and manage your user donations."
      />

      <TransactionsContainerMui />
    </div>
  );
}

export default Transactions;
