"use client";

import { useState } from "react";
import { Player, Phase } from "@/types/game";

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
    setPhase
}: RevealProps) => {
    const player = players[turnIndex];

    if (!player) return null;

    const isImpostor = impostorIds.includes(player.id);
    const [revealed, setRevealed] = useState(false);

    function handleNext() {
        if (turnIndex < players.length - 1) {
            setTurnIndex(turnIndex + 1);
            setRevealed(false);
        } else {
            setPhase("round");
        }
    }

    return (
        <>
            <h2>Vez de: {player.name}</h2>

            {revealed && (
                <>
                    {isImpostor ? (
                        <p>
                            Você é o IMPOSTOR
                        </p>
                    ) : (
                        <p>
                            A palavra é: <span className="uppercase">{secretWord}</span>
                        </p>
                    )}
                </>
            )}

            {!revealed ? (
                <button onClick={() => setRevealed(true)}>
                    Revelar
                </button>
            ) : (
                <button onClick={handleNext}>
                    Próximo Jogador
                </button>
            )}

        </>
    );

};