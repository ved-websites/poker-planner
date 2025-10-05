export interface Player {
	id: string;
	name: string;
	vote?: string;
}

export interface GameState {
	id: string;
	name: string;
	votingSystem: string[];
	players: Player[];
	createdAt: number;
}
