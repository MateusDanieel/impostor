export type Phase = "setup" | "reveal" | "round";

export type Player = {
    id: string;
    name: string;
    alive: boolean;
}

export type GameState = {
    phase: Phase;
    players: Player[];
    categoryId: string | "";
    impostorCount: 1 | 2;
    secretWord: string | null;
    impostorIds: string[];
    turnIndex: number;
    winner: "crew" | "impostor" | null;
}