"use client";

import { useEffect, useState } from "react";
import { Phase, Player } from "@/types/game";
import { Setup } from "@/components/Setup";
import { categories } from "@/data/categories";
import { Reveal } from "@/components/Reveal";
import { Round } from "@/components/Round";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersLoaded, setPlayersLoaded] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [impostorCount, setImpostorCount] = useState<1 | 2>(1);

  const [secretWord, setSecretWord] = useState<string | null>(null);
  const [impostorIds, setImpostorIds] = useState<string[]>([]);
  const [turnIndex, setTurnIndex] = useState(0);

  useEffect(() => {
    let parsedPlayers: Player[] = [];

    const saved = localStorage.getItem("players");

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Player[];
        parsedPlayers = Array.isArray(parsed) ? parsed : [];
      } catch {
        parsedPlayers = [];
      }
    }

    queueMicrotask(() => {
      setPlayers(parsedPlayers);
      setPlayersLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!playersLoaded) return;

    localStorage.setItem("players", JSON.stringify(players));
  }, [players, playersLoaded]);

  function handleStartGame() {
    const category = categories.find((cat) => cat.id === categoryId);

    if (!category) return;

    const wordDrawnId = Math.floor(Math.random() * category.words.length);

    const wordDrawn = category.words[wordDrawnId];

    setSecretWord(wordDrawn);

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
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="rounded-2xl border bg-card/90 px-6 py-5 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Party Game
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Impostor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Prepare o jogo, revele os papéis e descubra quem está blefando.
          </p>
        </header>

        <section className="rounded-2xl border bg-card px-4 py-5 shadow-sm sm:px-6">
          {phase === "setup" && (
            <Setup
              players={players}
              setPlayers={setPlayers}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              impostorCount={impostorCount}
              setImpostorCount={setImpostorCount}
              onStart={handleStartGame}
            />
          )}

          {phase === "reveal" && (
            <Reveal
              players={players}
              turnIndex={turnIndex}
              secretWord={secretWord}
              impostorIds={impostorIds}
              setTurnIndex={setTurnIndex}
              setPhase={setPhase}
            />
          )}

          {phase === "round" && (
            <Round
              players={players}
              secretWord={secretWord}
              impostorIds={impostorIds}
            />
          )}
        </section>
      </div>
    </main>
  );
}
