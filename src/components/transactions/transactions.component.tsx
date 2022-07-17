import { FC, useContext } from "react";

import { CraftContext } from "../../context/craft.context";
import { CraftContextType } from "../../@types/craft";


const Transactions: FC = (): JSX.Element => {
  const {transactions, selectedTransaction, updateTransaction} = useContext(CraftContext) as CraftContextType;
  const onSelectedTransactionChange = (event: any) => {
    const transactionId = event?.target?.value;
    const transaction = transactions.filter((transaction: any) => transaction.id === transactionId);
    updateTransaction(transaction[0]);
  };
  return (
    <>
      {transactions.length > 0 && (
        <div className="container">
          <select
            id="transaction_select"
            value={selectedTransaction.id}
            onChange={onSelectedTransactionChange}
          >
            {transactions.map((transaction: any) => {
              return (
                <option key={transaction.id} value={transaction.id}>
                  {transaction.name}
                </option>
              );
            })}
          </select>
          <div className="selectedAccount">Selected Transaction</div>

            <div className="accoutDetailsHeading">
                <div>Transaction ID</div>
                <div>Name</div>
            </div>
            <div className="accoutDetails">
            <div>{selectedTransaction.id}</div>
            <div>{selectedTransaction.name}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transactions;
