const apiUrl = "https://node-mongo-api-ssux.onrender.com/";

function AllData() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // fetch all accounts from API
    fetch(`/account/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setData(data);
      });
  }, []);

  return (
    <>
      <h5>All Data in Store:</h5>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Role</th>
            {/* Add more table headers for additional properties */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.generatedAccountNumber}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.balance}</td>
              <td>{item.selectedCheckboxesStr}</td>
              {/* Add more table cells for additional properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
