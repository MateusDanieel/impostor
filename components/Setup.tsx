"use client";

import { categories } from "@/data/categories";
import { useState } from "react";

export const Setup = ({
    players,
    setPlayers,
    categoryId,
    setCategoryId,
    impostorCount,
    setImpostorCount,
    onStart
}) => {

    const [playerName, setPlayerName] = useState("");
    const hasCategory = categoryId !== "";
    const hasEnoughPlayers = (impostorCount === 1 && players.length >= 4) || (impostorCount === 2 && players.length >= 6);
    const canStart = hasCategory && hasEnoughPlayers;

    function handleAddPlayer() {
        const name = playerName.trim();

        if (name === "") {
            return;
        } else {
            const novoPlayer = {
                id: Date.now().toString(),
                name: name,
                alive: true
            };

            setPlayers([...players, novoPlayer]);
            setPlayerName("");
        }
    }

    function handleRemovePlayer(id) {
        setPlayers(players.filter(p => p.id !== id));
    }

    return (
        <>
            <input type="text" value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} />
            <button type="button" onClick={handleAddPlayer}>Adicionar Jogador</button>

            <table>
                <tbody>
                    {players.map((player) =>
                        <tr key={player.id}>
                            <td>{player.name}</td>
                            <td>
                                <button type="button" onClick={() => handleRemovePlayer(player.id)}>
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); }}>
                <option value="" disabled>Selecione uma categoria</option>
                {categories.map((cat) =>
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                )}
            </select>

            <select value={impostorCount} onChange={(e) => setImpostorCount(e.target.value === "1" ? 1 : 2)}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>

            <button type="button" disabled={!canStart} onClick={() => onStart()}>
                Iniciar
            </button>
        </>
    );
}