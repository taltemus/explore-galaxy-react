import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { bankrupt, deposit, withdraw } from './store/bank/slice';

function App() {
  const { amount } = useSelector((state: RootState) => state.bank);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>The bank amount is currently: {amount}</h1>
      <input
        type="number"
        min="0"
        max="1000000"
        onChange={(event) => {
          setValue(parseInt(event?.target?.value ?? 0));
        }}
        value={value}
      />
      <button onClick={() => dispatch(deposit(value))}>Deposit</button>
      <button onClick={() => dispatch(withdraw(value))}>Withdraw</button>
      <button onClick={() => dispatch(bankrupt())}>Bankrupt</button>
    </div>
  );
}

export default App;
