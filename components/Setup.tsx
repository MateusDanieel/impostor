"use client";

import { categories } from "@/data/categories";
import { Player } from "@/types/game";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type SetupProps = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    categoryId: string;
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;
    impostorCount: 1 | 2;
    setImpostorCount: React.Dispatch<React.SetStateAction<1 | 2>>;
    onStart: () => void;
};

export const Setup = ({
    players,
    setPlayers,
    categoryId,
    setCategoryId,
    impostorCount,
    setImpostorCount,
    onStart
}: SetupProps) => {

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

    function handleRemovePlayer(id: string) {
        setPlayers(players.filter(p => p.id !== id));
    }

    return (
        <>
            <Field>
                <FieldLabel htmlFor="input-button-group">Adicionar Jogadores</FieldLabel>
                <ButtonGroup>
                    <Input id="input-button-group" value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} placeholder="Insira o nome do jogador..." />

                    <Button variant="outline" type="button" onClick={handleAddPlayer}>
                        Adicionar Jogador
                    </Button>
                </ButtonGroup>
            </Field>


            <Table>
                <TableBody>
                    {players.map((player) =>
                        <TableRow key={player.id}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem variant="destructive" onClick={() => handleRemovePlayer(player.id)}>
                                            Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Select value={categoryId} onValueChange={(e) => { setCategoryId(e); }}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Escolha uma categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {categories.map((cat) =>
                            <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select value={String(impostorCount)} onValueChange={(e) => setImpostorCount(e === "1" ? 1 : 2)}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Quantidade de Impostores" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button disabled={!canStart} onClick={() => onStart()}>
                Iniciar
            </Button>

        </>
    );
}