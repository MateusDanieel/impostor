"use client";

import { useState } from "react";

export const Reveal = ({
    players,
    turnIndex,
    secretWord,
    impostorIds,
    setTurnIndex,
    setPhase
}) => {
    const player = players[turnIndex];
    const isImpostor = impostorIds.includes(player.id);
    const [revealed, setRevealed] = useState(false);

    function handleNext() {
        if (turnIndex < players.length - 1) {
            setTurnIndex(turnIndex + 1);
            setRevealed(false);
        } else {
            setPhase("discussion");
        }


    }

    return (
        <>
            <h2>Vez de: {player.name}</h2>

            {revealed && (
                <>
                    {isImpostor ? (
                        <p>Você é o IMPOSTOR</p>
                    ) : (
                        <p>A palavra é: <span className="uppercase">{secretWord}</span></p>
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