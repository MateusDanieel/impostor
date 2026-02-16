"use client";

import { useState } from "react";
import { Phase, Player } from "@/types/game";
import { Setup } from "@/components/Setup"
import { categories } from "@/data/categories";

export default function Home() {

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [impostorCount, setImpostorCount] = useState<1 | 2>(1);

  const [secretWord, setSecretWord] = useState<string | null>(null);
  const [impostorIds, setImpostorIds] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);

  function handleStartGame() {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const i = Math.floor(Math.random() * category.words.length);

    const word = category.words[i];

    setSecretWord(word);
  }

  return (
    <>
      {phase === 'setup' &&
        <Setup
          players={players}
          setPlayers={setPlayers}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          impostorCount={impostorCount}
          setImpostorCount={setImpostorCount}
          onStart={handleStartGame}
        />
      }

      {phase === 'reveal' &&
        <>Em construção</>
      }
    </>
  );
}
