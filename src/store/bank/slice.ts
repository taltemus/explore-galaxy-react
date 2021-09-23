import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BankState {
  amount: number;
}

const initialState: BankState = {
  amount: 0,
};

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    bankrupt: (state) => {
      state.amount = 0;
    },
    deposit: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
    withdraw: (state, action: PayloadAction<number>) => {
      state.amount -= action.payload;
    },
  },
});

export const { bankrupt, deposit, withdraw } = bankSlice.actions;
export default bankSlice.reducer;
