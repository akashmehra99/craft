import React, { createContext, FC, useEffect, useState } from "react";

import { CraftContextType } from "../@types/craft";

interface Props {
  children: React.ReactNode;
}

export const CraftContext = createContext<CraftContextType | null>(null);

const CraftProvider: FC<Props> = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [trends, setTrends] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [selectedTransaction, setSelectedTransaction] = useState({id: ''});
  const [selectedBudget, setSelectedBudget] = useState({id: ''});
  useEffect(() => {
        fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    fetch("http://localhost:3030/accounts")
      .then((data: any) => {
        return data.json();
      })
      .then((accountsData: any) => {
        console.log("Accounts Data => ", accountsData);
        setAccounts(accountsData);
        if (accountsData.length) {
            setSelectedAccount(accountsData[0])
          return accountsData[0];
        }
        return [];
      })
      .then((accountData: any) => {
        console.log("Account Data -> ", accountData);
        updateAccount(accountData);
      })
      .catch((error: any) => {
        console.error("Error in getting accounts => ", JSON.stringify(error));
        setAccounts([]);
      });
  };

  const fetchTransactions = (accountData: any) => {
    const { id: accountId = "" } = { ...accountData };
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3030/transactions?accountId=${accountId}`)
        .then((data: any) => {
          return data.json();
        })
        .then((transactionsData: any) => {
          console.log("Transaction data -> ", transactionsData);
          setTransactions(transactionsData);
          resolve(transactionsData);
        })
        .catch((error: any) => {
          console.error(
            "Error in fetching transactions -> ",
            JSON.stringify(error)
          );
          setTransactions([]);
          reject("error in transactions");
        });
    });
  };

  const fetchBudgets = () => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3030/budgets")
        .then((data: any) => {
          return data.json();
        })
        .then((budgetsData: any) => {
          console.log("Budget Data -> ", budgetsData);
          setBudgets(budgetsData);
          resolve(budgetsData);
        })
        .catch((error: any) => {
          console.error(
            "Error in getting bugetsData -> ",
            JSON.stringify(error)
          );
          setBudgets([]);
          reject("error in budget");
        });
    });
  };

  const fetchTrends = (transactionId: string, budgetId: string) => {
    fetch(
      `http://localhost:3030/trends?budgetId=${budgetId}&transactionId=${transactionId}`
    )
      .then((data: any) => {
        return data.json();
      })
      .then((trendsData: any) => {
        console.log("Trends Data -> ", trendsData);
        setTrends(trendsData);
      })
      .catch((error: any) => {
        console.error(
          "Error in getting trends Data -> ",
          JSON.stringify(error)
        );
        setTrends([]);
      });
  };

  const onAccountUpdate = (account: any) => {
    Promise.all([fetchTransactions(account), fetchBudgets()]).then(
      (transactionBudgetData: any) => {
        const [transactionData, budgetData] = transactionBudgetData;
        setSelectedTransaction(transactionData[0]);
        setSelectedBudget(budgetData[0]);
        onUpdateTransactionOrBudget(transactionData[0], budgetData[0]);
      }
    );
  }

  const onUpdateTransactionOrBudget = (transaction: any, budget: any) =>{
    fetchTrends(transaction?.id, budget?.id);
  }

  const updateAccount = (account: any) => {
    setSelectedAccount(account);
    onAccountUpdate(account);
  };

  const updateTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    fetchTrends(transaction?.id, selectedBudget?.id);

  };

  const updateBudget = (budget: any) => {
    setSelectedBudget(budget);
    fetchTrends(selectedTransaction?.id, selectedBudget?.id);
  };

  return (
    <CraftContext.Provider
      value={{
        accounts,
        transactions,
        budgets,
        trends,
        selectedAccount,
        selectedTransaction,
        selectedBudget,
        updateAccount,
        updateTransaction,
        updateBudget
      }}
    >
      {children}
    </CraftContext.Provider>
  );
};

export default CraftProvider;
