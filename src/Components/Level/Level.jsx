import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import LevelContext from "../../Contexts/LevelContext";

import styles from "./Level.module.css";
function Level() {
  const { level } = useContext(LevelContext);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  function selectCharacter(e) {
    console.log("X", e.nativeEvent.offsetX);
    console.log("Y", e.nativeEvent.offsetY);
  }

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
          <img
            ref={imageRef}
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

const CharacterList = ({ characters }) => {
  return (
    <section>
      <h2>Characters to find</h2>
      <ul>
        {characters.map((character) => {
          return (
            <li>
              <h2>{character.name}</h2>
              <img src={character.imageUrl} alt="" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Level;
