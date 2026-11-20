import styles from "./Home.module.css";
import { useContext } from "react";
import LevelContext from "../../Contexts/LevelContext.jsx";
import Error from "../../Components/Error/Error.jsx";
import { useNavigate } from "react-router";
import useLevels from "../../Hooks/useLevels.jsx";
import getAPIString from "../../lib/getAPIstring.js";

function Home() {
  const { levels, isPending, error } = useLevels();
  const { setLevel } = useContext(LevelContext);
  const navigate = useNavigate();

  function changeLevel(e, level) {
    e.preventDefault();
    setLevel(level);
    navigate("play");
  }

  console.log(getAPIString());
  console.log(import.meta.env.VITE_ENV);

  return (
    <>
      {isPending ? "Loading..." : null}
      {error ? <Error error={error} /> : null}
      {levels ? (
        <>
          <h1 className={styles["main-title"]}>Select a level</h1>

          <ul className={styles["levels"]}>
            {levels.map((level) => {
              return (
                <li key={level.id} className={styles["level"]}>
                  <a
                    onClick={(e) => {
                      changeLevel(e, level);
                    }}
                    className={styles["level-link"]}
                  >
                    {level.name}
                  </a>
                  <img src={level.imageUrl} alt="" />
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
}

export default Home;
