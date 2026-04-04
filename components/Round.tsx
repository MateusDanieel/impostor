"use client";

import { useState } from "react";
import { Player } from "@/types/game";
import { Button } from "@/components/ui/button";

type RoundProps = {
  players: Player[];
  secretWord: string | null;
  impostorIds: string[];
};

export const Round = ({ players, secretWord, impostorIds }: RoundProps) => {
  const [starterIndex] = useState(() => Math.floor(Math.random() * players.length));
  const impostors = players.filter((player) => impostorIds.includes(player.id));
  const [finished, setFinished] = useState(false);

  return (
    <div className="space-y-6">
      {!finished ? (
        <>
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Rodada
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">Discussão aberta</h2>
          </div>

          <div className="rounded-xl border bg-background p-5 text-center">
            <p className="text-sm text-muted-foreground">Quem começa é:</p>
            <p className="mt-2 text-2xl font-bold uppercase">{players[starterIndex].name}</p>
          </div>

          <Button className="w-full" onClick={() => setFinished(true)}>
            Finalizar rodada
          </Button>
        </>
      ) : (
        <>
          <div className="rounded-xl border bg-background p-5 text-center">
            <p className="text-sm text-muted-foreground">A palavra era:</p>
            <p className="mt-1 text-2xl font-bold uppercase">{secretWord}</p>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <p className="text-sm text-muted-foreground">Os impostores eram:</p>
            <ul className="mt-2 space-y-1 text-lg font-semibold uppercase">
              {impostors.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>

          <Button className="w-full" onClick={() => location.reload()}>
            Recomeçar
          </Button>
        </>
      )}
    </div>
  );
};
