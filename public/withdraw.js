const apiUrl = "http://localhost:3000";

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
            balance={balance} // Pass the balance here
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
  const remainingBalance = balance;

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
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [amount, setAmount] = React.useState("");
  const { balance } = props;
  console.log(balance);

  function handle() {
    const numericAmount = parseFloat(amount);
    const token = getCookie("token"); // Retrieve stored JWT token from cookies
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userEmail = tokenPayload.email; // Email address from the token
    console.log(numericAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      props.setStatus("Invalid amount");
      return;
    }

    // Fetch the user's balance
    fetch(`${apiUrl}/account/findOne/${userEmail}`)
      .then((response) => response.json())
      .then((balanceData) => {
        try {
          const userBalance = balanceData.balance;
          console.log(userBalance);
          if (numericAmount > userBalance) {
            props.setStatus("Withdrawal amount exceeds available balance");
          } else {
            // Proceed with the withdrawal request
            fetch(`${apiUrl}/account/update/${userEmail}/-${numericAmount}`)
              .then((response) => response.json())
              .then((withdrawalData) => {
                try {
                  props.setWithdrawnAmount(numericAmount);
                  props.setBalance(withdrawalData.value.balance);

                  props.setShow(false);
                } catch (error) {
                  props.setStatus(withdrawalData.error);
                }
              })
              .catch((error) => {
                props.setStatus("Withdrawal failed");
                console.error("Withdrawal Error:", error);
              });
          }
        } catch (err) {
          props.setStatus(balanceData.error);
        }
      })
      .catch((error) => {
        props.setStatus("Error while fetching user balance.");
        console.error("Balance Fetch Error:", error);
      });
  }

  // Function to get cookie value by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  return (
    <>
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
    </>
  );
}
