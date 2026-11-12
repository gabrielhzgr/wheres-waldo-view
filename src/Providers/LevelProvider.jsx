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
      let result = await fetch(getAPIString() + "levels");
      result = await result.json();

      if (result.levels) {
        setLevels(result.levels);
      }

      if (result.error) {
        setError(error);
      }

      setPending(false);
    }
    getLevels();
  }, []);

  return (
    <LevelContext value={{ levels, setLevel, isPending, level }}>
      {children}
    </LevelContext>
  );
}
export default LevelProvider;
