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
      <p>Current balance: ${currentBalance.balance}</p>{" "}
      {/* Access the balance property */}
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  function handle() {
    // Validate email and amount here
    if (!validateEmail(email)) {
      props.setStatus("Invalid email format");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      props.setStatus("Invalid amount");
      return;
    }

    // If validation passes, make the deposit request
    fetch(`/account/update/${email}/${numericAmount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const depositData = JSON.parse(text);
          // props.setStatus(
          //   `Deposit successful. New balance: $${depositData.value}`
          // );
          props.setDepositedAmount(numericAmount);
          props.setCurrentBalance(depositData.value);
          props.setShow(false);
          console.log("JSON:", depositData);
        } catch (err) {
          props.setStatus("Deposit failed");
          console.log("err:", text);
        }
      });
  }

  // Email validation function
  function validateEmail(email) {
    // Add your email validation logic here
    // You can use a regular expression or other validation methods
    // For simplicity, this example checks for "@" in the email
    return email.includes("@");
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
        Deposit
      </button>
    </>
  );
}
