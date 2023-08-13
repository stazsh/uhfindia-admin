import React from "react";
import TransactionsContainer from "./TransactionsContainer";
import SectionHeader from "../../components/SectionHeader";

function Transactions() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Transactions"}
        subtitle="View and manage your user donations."
      />

      <TransactionsContainer />
    </div>
  );
}

export default Transactions;
