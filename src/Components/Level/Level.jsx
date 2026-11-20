import styles from "./Level.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import LevelContext from "../../Contexts/LevelContext";
import Error from "../Error/Error.jsx";
import Mark from "../Mark/Mark.jsx";
import getAPIString from "../../lib/getAPIstring.js";
import Records from "../Records/Records.jsx";

function Level() {
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [onloadCount, setOnloadCount] = useState(0);

  const imageRef = useRef(null);

  const {
    level,
    error,
    setError,
    isPending,
    setPending,
    selected,
    setSelected,
    completed,
    setCompleted,
    verifying,
    setVerifying,
    records,
    setRecords,
    reset,
    currentRecord,
    setCurrentRecord,
  } = useContext(LevelContext);

  const navigate = useNavigate();

  const loaded = level && onloadCount == level.positions.length + 1;
  const characters = level
    ? level.positions.map((position) => {
        return position.character;
      })
    : [];

  async function startGame() {
    try {
      const url = `${getAPIString()}/levels/${level.id}/new-game`;
      console.log(url);

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(err);
    }
  }

  function selectCharacter(e) {
    if (!verifying) {
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
  }

  useEffect(() => {
    if (!level) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(imageRef.current.width);
      setHeight(imageRef.current.height);
      setNaturalHeight(imageRef.current.naturalHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (onloadCount == characters.length + 1) {
      startGame();
    }
  }, [onloadCount]);

  return (
    <section className={styles["game-board"]}>
      {level ? (
        <>
          {error ? <Error error={error} /> : null}
          <h1>{level.name}</h1>
          <CharacterList
            characters={characters}
            handleOnLoad={() => {
              setOnloadCount((prevCount) => prevCount + 1);
            }}
          />
          {completed ? (
            <button
              className={styles["restart-button"]}
              onClick={() => {
                reset();
                startGame();
              }}
            >
              Restart
            </button>
          ) : null}

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
              className={`${styles["game-image"]} ${verifying || completed ? styles["verifying"] : ""}`}
              src={level.imageUrl}
            />
            {loaded ? (
              <>
                {selected.map((selection, index) => {
                  const cancelCb = () => {
                    let copyAr = [...selected];
                    copyAr.splice(index, 1);
                    setSelected(copyAr);
                    setPending(false);
                  };
                  const selectCb = async (characterId) => {
                    try {
                      let copyAr = [...selected];
                      copyAr[index].characterId = characterId;
                      setVerifying(true);
                      const response = await fetch(
                        `${getAPIString()}/levels/${level.id}/place-character`,
                        {
                          headers: { "Content-Type": "application/json" },
                          method: "POST",
                          credentials: "include",
                          body: JSON.stringify({
                            characterId,
                            x: selection.x,
                            y: selection.y,
                          }),
                        },
                      );
                      const result = await response.json();
                      setPending(false);
                      setVerifying(false);
                      if (result.error) {
                        setError(result.error);
                      } else {
                        console.log(result);
                        if (result.status == "completed") {
                          setCompleted(true);
                          setRecords(result.records);
                          setCurrentRecord(result.time);
                        } else if (result.status == "correct") {
                          alert(result.message);
                        } else if (result.status == "failed") {
                          alert(result.message);
                          cancelCb();
                        }
                      }
                    } catch (err) {
                      console.log(err);
                      setError(err);
                      setPending(false);
                      setVerifying(false);
                      cancelCb();
                    }
                  };

                  return (
                    <Mark
                      key={index}
                      imageRef
                      isSet={"characterId" in selection}
                      characters={characters}
                      selectCb={selectCb}
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
      <a
        className={styles["home-link"]}
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Levels
      </a>
      {completed ? (
        <Records
          levelId={level.id}
          records={records}
          setRecords={setRecords}
          currentRecord={currentRecord}
        />
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
