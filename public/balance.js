const apiUrl = "http://localhost:3000";

function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState("");

  function handle() {
    fetch(`${apiUrl}/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance); // Set the balance correctly
          props.setStatus(`User balance: ${data.balance}`);
          props.setShow(false);
          console.log("JSON:", data);
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
      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
      {balance !== "" && (
        <div>
          <h5>User Balance:</h5>
          <p>{balance}</p>
        </div>
      )}
    </>
  );
}

export default Balance;
