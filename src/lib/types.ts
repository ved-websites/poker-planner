import type { Connection } from "sveltekit-sse";

export interface Player {
	id: string;
	name: string;
	vote?: string;
	voted: boolean;
}

export interface GameData {
	id: string;
	name: string;
	votingSystem: string[];
	players: Player[];
	createdAt: number;
}

export interface GameState {
	connections: Map<string, Connection>;
	data: GameData;
}
