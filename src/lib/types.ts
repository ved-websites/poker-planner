import type { Connection } from "sveltekit-sse";

export interface Player {
	id: string;
	name: string;
	vote?: string;
}

export interface GameData {
	id: string;
	name: string;
	votingSystem: string[];
	players: Player[];
	createdAt: number;
	isCurrentlyRevealed: boolean;
	hostPlayerId: string | undefined;
}

export interface GameState {
	connections: Map<string, Connection>;
	data: GameData;
}
