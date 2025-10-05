import { PersistedState } from "runed";

export function getUserId() {
	let userId = new PersistedState<string>("user-id", crypto.randomUUID());

	return userId;
}
