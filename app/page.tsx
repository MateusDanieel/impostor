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
  const [impostorIds, setImpostorIds] = useState<string[]>([]);
  const [turnIndex, setTurnIndex] = useState(0);

  function handleStartGame() {
    // set category
    const category = categories.find((cat) => cat.id === categoryId);

    if (!category) return;

    // set secret word
    const i = Math.floor(Math.random() * category.words.length);

    const word = category.words[i];

    setSecretWord(word);

    // set impostor qtd
    const selectedImpostorIds: string[] = [];

    while (selectedImpostorIds.length < impostorCount) {
      const randomIndex = Math.floor(Math.random() * players.length);
      const player = players[randomIndex];

      if (!selectedImpostorIds.includes(player.id)) {
        selectedImpostorIds.push(player.id);
      }
    }

    setImpostorIds(selectedImpostorIds);

    setTurnIndex(0);
    setPhase("reveal");
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
        <>Em construção =]</>
      }
    </>
  );
}
