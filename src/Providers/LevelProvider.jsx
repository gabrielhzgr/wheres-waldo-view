import LevelContext from "../Contexts/LevelContext.jsx";
import { useState } from "react";

function LevelProvider({ children }) {
  const [level, setLevel] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isPending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [records, setRecords] = useState(null);
  const [currentRecord, setCurrentRecord] = useState(null);

  function reset() {
    setSelected([]);
    setPending(false);
    setCompleted(false);
    setError(null);
    setVerifying(false);
    setRecords(null);
  }

  return (
    <LevelContext
      value={{
        level,
        setLevel,
        isPending,
        setPending,
        error,
        setError,
        completed,
        setCompleted,
        selected,
        setSelected,
        verifying,
        setVerifying,
        records,
        setRecords,
        reset,
        currentRecord,
        setCurrentRecord,
      }}
    >
      {children}
    </LevelContext>
  );
}
export default LevelProvider;
