import { ActionType } from '.';

interface BankruptAction {
  type: ActionType.BANKRUPT;
}

interface DepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}

interface WithdrawAction {
  type: ActionType.WITHDRAW;
  payload: number;
}

export type BankAction = BankruptAction | DepositAction | WithdrawAction;
