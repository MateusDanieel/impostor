"use client";

import { categories } from "@/data/categories";
import { Player } from "@/types/game";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontalIcon, UsersIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  onStart,
}: SetupProps) => {
  const [playerName, setPlayerName] = useState("");
  const hasCategory = categoryId !== "";
  const hasEnoughPlayers =
    (impostorCount === 1 && players.length >= 4) ||
    (impostorCount === 2 && players.length >= 6);
  const canStart = hasCategory && hasEnoughPlayers;

  function handleAddPlayer() {
    const name = playerName.trim();

    if (name === "") {
      return;
    }

    const novoPlayer = {
      id: Date.now().toString(),
      name,
      alive: true,
    };

    setPlayers([...players, novoPlayer]);
    setPlayerName("");
  }

  function handleRemovePlayer(id: string) {
    setPlayers(players.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-muted/20 p-4">
        <p className="text-sm font-medium">Configuração da partida</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Adicione os participantes, escolha a categoria e defina a quantidade de impostores.
        </p>
      </div>

      <Field>
        <FieldLabel htmlFor="input-button-group">Adicionar Jogadores</FieldLabel>
        <ButtonGroup className="w-full">
          <Input
            id="input-button-group"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
            placeholder="Insira o nome do jogador..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPlayer();
              }
            }}
          />

          <Button variant="outline" type="button" onClick={handleAddPlayer}>
            Adicionar
          </Button>
        </ButtonGroup>
      </Field>

      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <p className="text-sm font-medium">Jogadores ({players.length})</p>
          <UsersIcon className="size-4 text-muted-foreground" />
        </div>

        {players.length > 0 ? (
          <Table>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Abrir ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleRemovePlayer(player.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Nenhum jogador ainda. Adicione pelo menos 4 para começar.
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>Categoria</FieldLabel>
          <Select
            value={categoryId}
            onValueChange={(value) => {
              setCategoryId(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Impostores</FieldLabel>
          <Select
            value={String(impostorCount)}
            onValueChange={(value) => setImpostorCount(value === "1" ? 1 : 2)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Quantidade de impostores" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1 impostor</SelectItem>
                <SelectItem value="2">2 impostores</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
        {impostorCount === 1
          ? "Regra atual: mínimo de 4 jogadores para 1 impostor."
          : "Regra atual: mínimo de 6 jogadores para 2 impostores."}
      </div>

      <Button className="w-full" disabled={!canStart} onClick={onStart}>
        Iniciar partida
      </Button>
    </div>
  );
};
