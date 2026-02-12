"use client";

import { useState } from "react";
import { Phase, Player } from "@/types/game";
import { Setup } from "@/components/Setup"

export default function Home() {

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [impostorCount, setImpostorCount] = useState<1 | 2>(1);

  const [secretWord, setSecretWord] = useState(null);
  const [impostorIds, setImpostorIds] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);

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
          setPhase={setPhase}
          secretWord={secretWord}
          setSecretWord={setSecretWord}
        />
      }
    </>
  );
}
