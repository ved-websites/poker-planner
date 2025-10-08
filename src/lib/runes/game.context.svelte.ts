import type { GameData } from "$lib/types";
import { Context } from "runed";

export const gameContext = new Context<{ value: GameData | null }>("game");
