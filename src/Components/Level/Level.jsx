import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import LevelContext from "../../Contexts/LevelContext";

import styles from "./Level.module.css";
function Level() {
  const { level } = useContext(LevelContext);
  const [onloadCount, setSOnloadCount] = useState(0);
  const [time, setTime] = useState(0);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  function selectCharacter(e) {
    console.log("X", e.nativeEvent.offsetX);
    console.log("Y", e.nativeEvent.offsetY);
  }

  useEffect(() => {
    if (level && onloadCount == level.positions.length + 1) {
      setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
  }, [onloadCount]);

  useEffect(() => {
    if (!level) {
      navigate("/");
    }
  }, []);

  return (
    <section className={styles["game-board"]}>
      {level ? (
        <>
          <h1>{level.name}</h1>
          <p>{time}</p>
          <CharacterList
            characters={level.positions.map((position) => {
              return position.character;
            })}
            handleOnLoad={() => setSOnloadCount((prevCount) => prevCount + 1)}
          />

          <img
            ref={imageRef}
            onLoad={() => setSOnloadCount((prevCount) => prevCount + 1)}
            onClick={(e) => {
              selectCharacter(e);
            }}
            className={styles["game-image"]}
            src={level.imageUrl}
          />
        </>
      ) : null}
    </section>
  );
}

const CharacterList = ({ characters, handleOnLoad }) => {
  return (
    <section>
      <ul className={styles["characters-list"]}>
        {characters.map((character) => {
          return (
            <li>
              <h2>{character.name}</h2>
              <img
                onLoad={handleOnLoad}
                src={character.imageUrl}
                alt={character.name}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Level;
