"use client";

import { categories } from "@/data/categories";
import { useState } from "react";

export const Setup = ({ players, setPlayers, categoryId, setCategoryId, impostorCount, setImpostorCount }) => {

    const [playerName, setPlayerName] = useState("");

    function handleAddPlayer() {
        if (playerName !== "") {
            const novoPlayer = {
                id: Date.now().toString(),
                name: playerName,
                alive: true
            };

            setPlayers([...players, novoPlayer]);
            setPlayerName("");
        }
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
                        </tr>
                    )}
                </tbody>
            </table>

            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="" disabled>Selecione uma categoria</option>
                {categories.map((cat) =>
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                )}
            </select>

            <select value={impostorCount} onChange={(e) => setImpostorCount(e.target.value === "1" ? 1 : 2)}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </>
    );
}