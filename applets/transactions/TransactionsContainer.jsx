import React from "react";
import { transactionsList } from "../../static/TransactionsList";
import { IoPeopleOutline } from "react-icons/io5";
import SubsectionHeader from "../../components/SubsectionHeader";
import TxListHeaderItem from "./TxListHeaderItem";
import TxItem from "./TxItem";
import { getColumnConfig } from "../../ui-config/TxTable.config";
import { uid } from "uid";

function TransactionsContainer({ className }) {
  let txList = transactionsList;
  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={"Transactions"}
          className="p-5"
        />

        <div className="list-header-container shrink-0 text-primary border-b h-12 divide-x flex flex-row border-boundary px-5 py-2 text-sm font-bold">
          {getColumnConfig().map((item) => (
            <TxListHeaderItem key={item.label} {...item} />
          ))}
        </div>

        <div className="relative flex-grow shrink-0">
          <div
            id="list-parent"
            className="absolute w-full h-full divide-y overflow-auto px-5"
          >
            {txList.map((item) => (
              <TxItem key={uid(10)} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsContainer;
