import React, { useState } from 'react';
import moment from 'moment';
import './App.scss';

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
      <div className="container-lg">
        <h1>Compound Interest Calculator</h1>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <section>
              <div className="box">
                <div className="row justify-content-center align-items-center">
                  <div className="col-xl-8">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="initialAmount" className="form-label">
                          Initial Amount on the Bank Account
                          <div class="input-group">
                            <input
                              className="form-control"
                              type="number"
                              id="initialAmount"
                              name="initialAmount"
                              value={initialAmount}
                              min="0"
                              onChange={(e) =>
                                setInitialAmount(Number(e.target.value))
                              }
                            />
                            <span class="input-group-text">€</span>
                          </div>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="monthlyContribution"
                          className="form-label"
                        >
                          Amount of the monthly saving
                          <div class="input-group">
                            <input
                              className="form-control"
                              type="number"
                              id="monthlyContribution"
                              name="monthlyContribution"
                              value={monthlyContribution}
                              min="0"
                              onChange={(e) =>
                                setMonthlyContribution(Number(e.target.value))
                              }
                            />
                            <span class="input-group-text">€</span>
                          </div>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="interestRate" className="form-label">
                          Monthly Interest Rate
                          <div class="input-group">
                            <input
                              className="form-control"
                              type="number"
                              id="interestRate"
                              name="interestRate"
                              value={interestRate}
                              min="0"
                              onChange={(e) =>
                                setInterestRate(Number(e.target.value))
                              }
                            />
                            <span class="input-group-text">%</span>
                          </div>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="monthlyDuration" className="form-label">
                          Investment Duration
                          <div class="input-group">
                            <input
                              className="form-control"
                              type="number"
                              id="monthlyDuration"
                              name="monthlyDuration"
                              value={monthlyDuration}
                              min="0"
                              onChange={(e) =>
                                setMonthlyDuration(Number(e.target.value))
                              }
                            />
                            <span class="input-group-text">months</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 text-center">
                    <img src="saving-money.png" alt="" />
                    <p className="end-balance">End balance:</p>
                    <p className="result">
                      {Math.round(result * 100) / 100}&euro;
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3">Results table</h2>
              <p className="w-75 lead mx-auto">
                For an initial amount of <strong>{initialAmount}&euro;</strong>{' '}
                with an interest rate of <strong>{interestRate}%</strong> and a
                monthly contribution of{' '}
                <strong>
                  {monthlyContribution}
                  &euro;
                </strong>{' '}
                you will have{' '}
                <strong className="small-result">
                  {Math.round(result * 100) / 100}&euro;
                </strong>{' '}
                after <strong>{monthlyDuration} months</strong>.
              </p>
              <div className="table-container">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Month</th>
                        <th>Amount on the bank account</th>
                        <th>Monthly interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0</td>
                        <td className="text-uppercase">
                          {moment(currentDate).format('MMMM YYYY')}
                        </td>
                        <td>{initialAmount}&euro;</td>
                        <td>0&euro;</td>
                      </tr>
                      {rows.map(function (row) {
                        return (
                          <tr key={row.month}>
                            <td>{row.month}</td>
                            <td className="text-uppercase">
                              {moment(currentDate)
                                .add(row.month, 'M')
                                .format('MMMM YYYY')}
                            </td>
                            <td className="text-center">
                              {row.amountOnBankAccount.toFixed(2)}&euro;
                            </td>
                            <td className="text-center">
                              {row.interestForThisMonth.toFixed(2)}&euro;
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
