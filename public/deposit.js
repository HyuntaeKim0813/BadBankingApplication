function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [depositedAmount, setDepositedAmount] = React.useState(0);
  const [currentBalance, setCurrentBalance] = React.useState(0);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm
            setShow={setShow}
            setStatus={setStatus}
            setDepositedAmount={setDepositedAmount}
            setCurrentBalance={setCurrentBalance}
          />
        ) : (
          <DepositMsg
            setShow={setShow}
            setStatus={setStatus}
            depositedAmount={depositedAmount}
            currentBalance={currentBalance}
          />
        )
      }
    />
  );
}

function DepositMsg(props) {
  const { depositedAmount, currentBalance } = props;

  return (
    <>
      <h5>Success</h5>
      <p>Amount deposited: ${depositedAmount}</p>
      <p>Current balance: ${currentBalance}</p>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
          props.depositedAmount(0);
          props.setBalance(0); // Optionally reset the balance when withdrawing again
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [amount, setAmount] = React.useState("");

  function handle() {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      props.setStatus("Invalid amount");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userEmail = tokenPayload.email; // Email address from the token

    fetch(`/account/update/${userEmail}/${numericAmount}`)
      .then((response) => response.json())
      .then((data) => {
        try {
          props.setDepositedAmount(numericAmount);
          props.setCurrentBalance(data.value.balance);
          console.log(data.value.balance); // Assuming the server returns the new balance
          // props.setStatus(
          //   `Deposit successful. New balance: ${data.value.balance}`
          // );
          props.setShow(false);
        } catch (err) {
          props.setStatus(data.error);
        }
      })
      .catch((error) => {
        props.setStatus("Deposit failed");
        console.error("Error:", error);
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
        Deposit
      </button>
    </>
  );
}

export default Deposit;
