import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import LevelContext from "../../Contexts/LevelContext";
import Mark from "../Mark/Mark.jsx";

import styles from "./Level.module.css";
function Level() {
  const { level } = useContext(LevelContext);
  const navigate = useNavigate();

  const [onloadCount, setSOnloadCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const imageRef = useRef(null);

  const loaded = level && onloadCount == level.positions.length + 1;
  const characters = level
    ? level.positions.map((position) => {
        return position.character;
      })
    : [];

  useEffect(() => {
    if (!level) {
      navigate("/");
    }
  }, []);

  function selectCharacter(e) {
    if (loaded) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;

      const normalizedX = naturalWidth * (offsetX / width);
      const normalizedY = naturalHeight * (offsetY / height);

      console.log(offsetX, "Select Offset X");
      console.log(offsetY, "Select Offset Y");

      console.log(normalizedX, "Select Normalized X");
      console.log(normalizedY, "Select Normalized Y");

      if (selected.length < characters.length) {
        setSelected([...selected, { x: normalizedX, y: normalizedY }]);
      }
    }
  }

  function handleResize() {}

  return (
    <section className={styles["game-board"]}>
      {level ? (
        <>
          <h1>{level.name}</h1>
          <CharacterList
            characters={characters}
            handleOnLoad={() => {
              setSOnloadCount((prevCount) => prevCount + 1);
            }}
          />
          <section className={styles["image-container"]}>
            <img
              ref={imageRef}
              onLoad={() => {
                setSOnloadCount((prevCount) => prevCount + 1);
                setWidth(imageRef.current.width);
                setHeight(imageRef.current.height);
                setNaturalWidth(imageRef.current.naturalWidth);
                setNaturalHeight(imageRef.current.naturalHeight);
              }}
              onResize={handleResize}
              onClick={(e) => {
                selectCharacter(e);
              }}
              className={styles["game-image"]}
              src={level.imageUrl}
            />
            {loaded ? (
              <>
                {selected.map((selection, index) => {
                  return (
                    <Mark
                      key={index}
                      offsetX={(width / naturalWidth) * selection.x}
                      offsetY={(height / naturalHeight) * selection.y}
                    />
                  );
                })}
              </>
            ) : null}
          </section>
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
