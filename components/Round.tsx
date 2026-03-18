"use client";

import { useState } from "react";
import { Player } from "@/types/game";

type RoundProps = {
    players: Player[];
    secretWord: string | null;
    impostorIds: string[];
};

export const Round = ({
    players,
    secretWord,
    impostorIds
}: RoundProps) => {

    const player = Math.floor(Math.random() * players.length);
    const impostors = players.filter(player => impostorIds.includes(player.id));
    const [finished, setFinished] = useState(false);

    return (
        <>
            {!finished ? (
                <>
                    <h2>
                        Quem começa é: <br />
                        <span className="uppercase">
                            {players[player].name}
                        </span>
                    </h2>

                    <button onClick={() => setFinished(true)}>
                        Finalizar
                    </button>
                </>
            ) : (
                <>
                    <h2>
                        A palavra era: <br />
                        <span className="uppercase">
                            {secretWord}
                        </span>
                    </h2>

                    <h2>
                        E os impostores eram: <br />
                        <ul className="uppercase">
                            {impostors.map(player => (
                                <li key={player.id}>
                                    {player.name}
                                </li>
                            ))}
                        </ul>
                    </h2>

                    <button onClick={() => location.reload()}>
                        Recomeçar
                    </button>
                </>
            )}
        </>
    );
}