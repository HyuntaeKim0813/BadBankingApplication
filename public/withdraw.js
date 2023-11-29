function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdrawnAmount, setWithdrawnAmount] = React.useState(0);
  const [remainingBalance, setRemainingBalance] = React.useState(0);
  const [balance, setBalance] = React.useState(0);

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm
            setShow={setShow}
            setStatus={setStatus}
            setWithdrawnAmount={setWithdrawnAmount}
            setRemainingBalance={setRemainingBalance}
            setBalance={setBalance}
          />
        ) : (
          <WithdrawMsg
            setShow={setShow}
            setStatus={setStatus}
            withdrawnAmount={withdrawnAmount}
            remainingBalance={remainingBalance}
            balance={balance}
            setWithdrawnAmount={setWithdrawnAmount}
          />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  const { withdrawnAmount, balance } = props;
  const remainingBalance = balance - withdrawnAmount;

  return (
    <>
      <h5>Success</h5>
      <p>Amount withdrawn: ${withdrawnAmount}</p>
      <p>Remaining balance: ${remainingBalance}</p>
      {/* <p>Current balance: ${balance}</p> */}
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
          props.setWithdrawnAmount(0);
          props.setBalance(0); // Optionally reset the balance when withdrawing again
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  function handle() {
    // Fetch the user's balance
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setBalance(data.balance); // Update the balance state
          props.setStatus(`User balance: ${data.balance}`);

          // Continue with withdrawal logic
          fetch(`/account/update/${email}/-${amount}`)
            .then((response) => response.text())
            .then((text) => {
              try {
                const withdrawalData = JSON.parse(text);
                props.setStatus("Withdrawal successful");
                props.setWithdrawnAmount(parseFloat(amount));
                props.setShow(false);
                console.log("Withdrawal JSON:", withdrawalData);
              } catch (err) {
                props.setStatus("Withdrawal failed");
                console.log("Withdrawal Error:", text);
              }
            });
        } catch (err) {
          props.setStatus(`Error: ${text}`);
          console.log("Error:", text);
        }
      })
      .catch((error) => {
        props.setStatus("Error while fetching user balance.");
        console.error("Error:", error);
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
      {props.balance !== "" && (
        <div>
          <p>{props.balance}</p>
        </div>
      )}
    </>
  );
}
