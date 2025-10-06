import type { Connection } from "sveltekit-sse";
import type { GameData, Player } from "./types";

export abstract class Event<T extends object> {
	abstract name: string;
	data: T;

	constructor(data: T) {
		this.data = data;
	}

	create() {
		const dataToSend = {
			...this.data,
			date: Date.now(), // Add a timestamp to ensure no 2 events are the same
		};

		return [this.name, JSON.stringify(dataToSend)] satisfies Parameters<
			Connection["emit"]
		>;
	}
}

export class NewPlayerEvent extends Event<Player> {
	override name = "new-player";
}

export class PlayerLeavingEvent extends Event<Pick<Player, "id">> {
	override name = "player-leaving";
}

export class PlayerVotedEvent extends Event<Pick<Player, "id" | "vote">> {
	override name = "player-voted";
}

export class GameRevealCardsEvent extends Event<GameData> {
	override name = "game-reveal-cards";
}

export class GameNewRoundCardsEvent extends Event<GameData> {
	override name = "game-new-round";
}
