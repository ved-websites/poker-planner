import { PersistedState } from "runed";

export function useUserName() {
	return new PersistedState<string>("player-name", "");
}