"use client";

import { useState } from "react";
import { Phase, Player } from "@/types/game";
import { Setup } from "@/components/Setup"

export default function Home() {

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [impostorCount, setImpostorCount] = useState<1 | 2>(1);

  console.log(categoryId);

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
        />
      }
    </>
  );
}
