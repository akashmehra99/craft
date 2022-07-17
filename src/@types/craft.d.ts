export interface CraftInterface {
    accounts?: any;
    transactions?: any;
    budgets?:any;
    trends?: any;
    selectedAccount?: any;
    selectedTransaction?: any;
    selectedBudget?: any;
}


export type CraftContextType = {
    accounts?: any;
    transactions?: any;
    budgets?:any;
    trends?: any;
    selectedAccount?: any;
    selectedTransaction?: any;
    selectedBudget?: any;
    updateAccount: (accountId: string) => void;
    updateTransaction: (transactionId: string) => void;
    updateBudget: (budgetId: string) => void;
    updateTrends: (trends: any) => void;
}