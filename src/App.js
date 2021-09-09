import React, { useState } from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [interestRate, setInterestRate] = useState(2);
  const [monthlyDuration, setMonthlyDuration] = useState(12);

  let rows = [];
  let result = initialAmount;
  let interest = initialAmount * (interestRate / 100) + monthlyDuration;

  for (let index = 1; index <= monthlyDuration; index++) {
    interest = result * (interestRate / 100); // interest calculate before monthly contribution
    result = result + monthlyContribution + interest;

    rows.push({
      month: index,
      amountOnBankAccount: result,
      interestForThisMonth: interest,
    });
  }

  const currentDate = moment(new Date());

  return (
    <div className="App">
      <section>
        <label htmlFor="initialAmount">
          Initial Amount on the Bank Account (&euro;)
          <input
            type="number"
            id="initialAmount"
            name="initialAmount"
            value={initialAmount}
            min="0"
            onChange={(e) => setInitialAmount(Number(e.target.value))}
          />
        </label>
        <br />

        <label htmlFor="monthlyContribution">
          Amount of the monthly saving (&euro;)
          <input
            type="number"
            id="monthlyContribution"
            name="monthlyContribution"
            value={monthlyContribution}
            min="0"
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          />
        </label>
        <br />

        <label htmlFor="interestRate">
          Monthly Interest Rate (%)
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={interestRate}
            min="0"
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </label>
        <br />

        <label htmlFor="monthlyDuration">
          Investment Duration (in months) from today
          <input
            type="number"
            id="monthlyDuration"
            name="monthlyDuration"
            value={monthlyDuration}
            min="0"
            onChange={(e) => setMonthlyDuration(Number(e.target.value))}
          />
        </label>
      </section>

      <section>
        <h2>Results table</h2>
        <p>
          For an initial amount of {initialAmount}&euro; with an interest rate
          of {interestRate}% and a monthly contribution of {monthlyContribution}
          &euro; you will have {Math.round(result * 100) / 100}&euro; after{' '}
          {monthlyDuration} months.
        </p>
        <table border="1" style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Amount on the bank account</th>
              <th>Amount of the monthly interest</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>{moment(currentDate).format('MMMM YYYY')}</td>
              <td>{initialAmount}&euro;</td>
              <td>0&euro;</td>
            </tr>
            {rows.map(function (row) {
              return (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>
                    {moment(currentDate)
                      .add(row.month, 'M')
                      .format('MMMM YYYY')}
                  </td>
                  <td>{row.amountOnBankAccount.toFixed(2)}&euro;</td>
                  <td>{row.interestForThisMonth.toFixed(2)}&euro;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
