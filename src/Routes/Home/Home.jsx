import { useContext } from "react";
import LevelContext from "../../Contexts/LevelContext.jsx";
import Error from "../../Components/Error/Error.jsx";
import { useNavigate } from "react-router";

function Home() {
  const { levels, setLevel, error, isPending } = useContext(LevelContext);
  const navigate = useNavigate();

  function changeLevel(e, level) {
    e.preventDefault();
    setLevel(level);
    navigate("play");
  }

  return (
    <>
      {isPending ? "Loading..." : null}
      {error ? <Error error={error} /> : null}
      {levels ? (
        <>
          <h1>Select a level</h1>

          <ul>
            {levels.map((level) => {
              return (
                <li>
                  <a
                    onClick={(e) => {
                      changeLevel(e, level);
                    }}
                  >
                    {level.name}
                  </a>
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
