import styles from "./Records.module.css";
import getAPIString from "../../lib/getAPIstring";
import Error from "../Error/Error.jsx";
import { useState } from "react";
function Records({ levelId, records, setRecords, currentRecord }) {
  const [isPending, setPending] = useState();
  const [error, setError] = useState();
  const [active, setActive] = useState();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setPending(true);
      const response = await fetch(`${getAPIString()}/${levelId}/new-record`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      setPending(false);
      if (result.error) {
        setError(result.error);
      }

      if (result.records) {
        setRecords(result.records);
      }
    } catch (err) {
      setError(err);
      setPending(false);
    }
  }

  if (active) {
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
        </form>
        <h2>Records</h2>
        <ul className={styles["records"]}>
          {records.map((record) => {
            return (
              <li>
                <span>{record.username}</span>
                <span>{record.timeSeconds}s</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Records;
