import { FC, useContext } from "react";
import { CraftContext } from "../../context/craft.context";
import { CraftContextType } from "../../@types/craft";



const Accounts: FC = (): JSX.Element => {
  const {accounts, selectedAccount, updateAccount} = useContext(CraftContext) as CraftContextType;

  const onSelectedAccountChange = (event: any) => {
    const accountId = event?.target?.value;
    const account = accounts?.filter((account: any) => account.id === accountId);
    updateAccount(account[0])
  };
  return (
    <>
      {accounts?.length > 0 && (
        <div className="container">
          <select
            id="accounts_select"
            value={selectedAccount?.id}
            onChange={onSelectedAccountChange}
          >
            {accounts.map((account: any) => {
              return (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              );
            })}
          </select>
          <div className="selectedAccount">Selected Account</div>
          <div className="accoutDetailsHeading">
            <div>Account ID</div>
            <div>Name</div>
          </div>
          <div className="accoutDetails">
            <div>{selectedAccount?.id}</div>
            <div>{selectedAccount?.name}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Accounts;
