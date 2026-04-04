"use client";

import { useState } from "react";
import { Player, Phase } from "@/types/game";
import { Button } from "@/components/ui/button";

type RevealProps = {
  players: Player[];
  turnIndex: number;
  secretWord: string | null;
  impostorIds: string[];
  setTurnIndex: (index: number) => void;
  setPhase: (phase: Phase) => void;
};

export const Reveal = ({
  players,
  turnIndex,
  secretWord,
  impostorIds,
  setTurnIndex,
  setPhase,
}: RevealProps) => {
  const [revealed, setRevealed] = useState(false);
  const player = players[turnIndex];

  if (!player) return null;

  const isImpostor = impostorIds.includes(player.id);

  function handleNext() {
    if (turnIndex < players.length - 1) {
      setTurnIndex(turnIndex + 1);
      setRevealed(false);
    } else {
      setPhase("round");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-muted/20 p-4">
        <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          Revelação
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">Vez de {player.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {turnIndex + 1} de {players.length} jogadores
        </p>
      </div>

      <div className="rounded-xl border bg-background p-5 text-center">
        {!revealed ? (
          <p className="text-sm text-muted-foreground">
            Passe o celular para este jogador e revele a informação secreta.
          </p>
        ) : isImpostor ? (
          <p className="text-lg font-semibold text-destructive">Você é o IMPOSTOR</p>
        ) : (
          <p className="text-lg font-semibold">
            A palavra é: <span className="uppercase">{secretWord}</span>
          </p>
        )}
      </div>

      {!revealed ? (
        <Button className="w-full" onClick={() => setRevealed(true)}>
          Revelar
        </Button>
      ) : (
        <Button className="w-full" onClick={handleNext}>
          {turnIndex < players.length - 1 ? "Próximo jogador" : "Ir para rodada"}
        </Button>
      )}
    </div>
  );
};
