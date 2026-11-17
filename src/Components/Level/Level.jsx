import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import LevelContext from "../../Contexts/LevelContext";
import Mark from "../Mark/Mark.jsx";
import getAPIString from "../../lib/getAPIstring.js";

import styles from "./Level.module.css";
function Level() {
  const { level } = useContext(LevelContext);
  const navigate = useNavigate();

  const [onloadCount, setOnloadCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isPending, setPending] = useState(false);

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

  console.log(selected);

  useEffect(() => {
    function handleResize() {
      setWidth(imageRef.current.width);
      setHeight(imageRef.current.height);
      setNaturalWidth(imageRef.current.naturalWidth);
      setNaturalHeight(imageRef.current.naturalHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    async function startGame() {
      const response = await fetch(
        `${getAPIString()}/levels/${level.id}/new-game`,
        { method: "GET", credentials: "include" },
      );
      const result = await response.json();
      console.log(result);
    }

    if (onloadCount == characters.length + 1) {
      startGame();
    }
  }, [onloadCount]);

  function selectCharacter(e) {
    if (loaded && !isPending) {
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
        setPending(true);
      }
    } else if (loaded && isPending) {
      let copyAr = [...selected];
      copyAr.splice(copyAr.length - 1, 1);
      setSelected(copyAr);
      setPending(false);
    }
  }

  async function endGame() {
    const response = await fetch(`${getAPIString()}/levels/end-game`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(selected),
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <section className={styles["game-board"]}>
      {level ? (
        <>
          <h1>{level.name}</h1>
          <CharacterList
            characters={characters}
            handleOnLoad={() => {
              setOnloadCount((prevCount) => prevCount + 1);
            }}
          />
          <button onClick={endGame} className={styles["finish-button"]}>
            Submit
          </button>
          <section className={styles["image-container"]}>
            <img
              ref={imageRef}
              onLoad={() => {
                setOnloadCount((prevCount) => prevCount + 1);
                setWidth(imageRef.current.width);
                setHeight(imageRef.current.height);
                setNaturalWidth(imageRef.current.naturalWidth);
                setNaturalHeight(imageRef.current.naturalHeight);
              }}
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
                      imageRef
                      isSet={selection.characterId in selection}
                      characters={characters}
                      selectCb={(characterId) => {
                        let copyAr = [...selected];
                        copyAr[index].characterId = characterId;
                        setPending(false);
                      }}
                      cancelCb={() => {
                        let copyAr = [...selected];
                        copyAr.splice(index, 1);
                        setSelected(copyAr);
                        setPending(false);
                      }}
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
