import LevelContext from "../Contexts/LevelContext.jsx";
import getAPIString from "../lib/getAPIstring";
import { useState, useEffect } from "react";

function LevelProvider({ children }) {
  const [levels, setLevels] = useState(null);
  const [isPending, setPending] = useState(true);
  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getLevels() {
      try {
        const response = await fetch(`${getAPIString()}/levels`);
        const result = await response.json();

        if (result.levels) {
          setLevels(result.levels);
        }

        if (result.error) {
          setError({ name: result.error, message: result.message });
        }
      } catch (err) {
        setError(err);
      }

      setPending(false);
    }
    getLevels();
  }, []);

  return (
    <LevelContext value={{ levels, setLevel, isPending, level, error }}>
      {children}
    </LevelContext>
  );
}
export default LevelProvider;
