import { FC, useEffect, useState } from "react";
import Accounts from "../accounts/accounts.components";
import Budgets from "../budgets/budgets.component";
import Transactions from "../transactions/transactions.component";
import Trends from "../trends/trends.components";

import CraftProvider from "../../context/craft.context";

const Container: FC = () => {

  return (
    <>
        <CraftProvider>
          <Accounts />
          <Transactions />
          <Budgets />
          <Trends />
        </CraftProvider>
    </>
  );
};

export default Container;
