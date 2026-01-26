"use client";

import { useState } from "react";
import { Phase } from "@/types/game";

export default function Home() {

  const [phase, setPhase] = useState<Phase>("setup");

  return (
    <>
      {phase === 'setup' ? 'SETUP' : 'REVEAL'}
    </>
  );
}
