import { z } from "zod/v4";

export const newGameSchema = z.object({
	gameName: z.string().optional(),
	hostName: z.string().min(1, { message: "Host name is required" }),
	votingSystem: z.string().min(1).default("0,1,2,3,5,8,13,21,34,?,☕"),
});
