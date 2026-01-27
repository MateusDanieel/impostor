"use client";

import { useState } from "react";
import { Phase, Player } from "@/types/game";
import { Setup } from "@/components/Setup"

export default function Home() {

  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player>();

  return (
    <>
      {phase === 'setup' &&
        <Setup
          players=""
          categoryId=""
          impostorCount=""
        />
      }
    </>
  );
}
