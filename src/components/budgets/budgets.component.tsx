import { FC, useContext } from "react";
import { CraftContext } from "../../context/craft.context";
import { CraftContextType } from "../../@types/craft";

const Budgets: FC  = () : JSX.Element=> {

  const {budgets, selectedBudget, updateBudget} = useContext(CraftContext) as CraftContextType;

  const onSelectedTransactionChange = (event: any) => {
    const budgetId = event?.target?.value;
    const budget = budgets.filter((budget: any) => budget.id === budgetId);
    updateBudget(budget[0]);
  };
  return (
    <>
      {budgets.length > 0 && (
        <div className="container">
          <select
            id="accounts_select"
            value={selectedBudget.id}
            onChange={onSelectedTransactionChange}
          >
            {budgets.map((transaction: any) => {
              return (
                <option key={transaction.id} value={transaction.id}>
                  {transaction.name}
                </option>
              );
            })}
          </select>
          <div className="selectedAccount">Selected Budget</div>

            <div className="accoutDetailsHeading">
                <div>Transaction ID</div>
                <div>Name</div>
            </div>
            <div className="accoutDetails">
            <div>{selectedBudget.id}</div>
            <div>{selectedBudget.name}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Budgets;
