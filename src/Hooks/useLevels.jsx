import { useEffect, useState } from "react";
import getAPIString from "../lib/getAPIstring.js";
function useLevels() {
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(true);
  const [levels, setLevels] = useState(null);
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

  return { error, isPending, levels };
}

export default useLevels;
