import styles from "./Records.module.css";
import getAPIString from "../../lib/getAPIstring";
import Error from "../Error/Error.jsx";
import { useState } from "react";
function Records({ levelId, records, setRecords, currentRecord }) {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState();
  const [active, setActive] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  console.log(isPending);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setPending(true);
      const response = await fetch(
        `${getAPIString()}/levels/${levelId}/new-record`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            username: e.target.querySelector("input").value,
          }),
        },
      );
      const result = await response.json();
      setPending(false);
      if (result.error) {
        setError(result.error);
      }

      if (result.records) {
        setRecords(result.records);
        setSubmitted(true);
      }
    } catch (err) {
      setError(err);
      setPending(false);
    }
  }

  return (
    <div
      className={`${styles["records"]} ${active ? styles["active"] : ""} ${isPending ? styles["pending"] : ""}`}
    >
      <span className={styles["close"]} onClick={() => setActive(false)}>
        Close
      </span>
      {error ? <Error error={error} /> : null}
      <form onSubmit={handleSubmit}>
        <h2> {`Register your time: ${currentRecord}s`} </h2>
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username" required />
        {!submitted ? (
          isPending ? (
            <button disabled className={styles["button-submit"]}>
              Submit
            </button>
          ) : (
            <button className={styles["button-submit"]}>Submit</button>
          )
        ) : null}
      </form>
      <h2>Records</h2>
      <ul className={styles["list-records"]}>
        {records.length > 0 ? (
          records.map((record, index) => {
            return (
              <li>
                <span>{`${index + 1}. ${record.username} ${record.timeSeconds}s`}</span>
              </li>
            );
          })
        ) : (
          <span>No records yet</span>
        )}
      </ul>
    </div>
  );
}

export default Records;
