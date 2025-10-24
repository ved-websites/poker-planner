/**
 * Calculates the distance to the center of the k-th element, ensuring the gap
 * at the start, end, and between elements is equal.
 *
 * @param lineLength The total length of the line.
 * @param elementWidth The diameter of the elements.
 * @param elementCount The total number of elements (must be >= 1).
 * @param elementIndex The 1-based index of the element (1 for the first, n for the last).
 *
 * @returns The distance to the center of the k-th element.
 */
export function getUniformlySpacedElementCenter(
	lineLength: number,
	elementWidth: number,
	elementCount: number,
	elementIndex: number
) {
	if (elementCount <= 0) {
		return 0;
	}

	if (elementCount === 1) {
		return lineLength / 2;
	}

	const totalEmptySpace = lineLength - elementCount * elementWidth;
	const totalGaps = elementCount + 1;
	const uniformGap = totalEmptySpace / totalGaps;

	const centerPosition =
		elementIndex * uniformGap +
		(elementIndex - 1) * elementWidth +
		elementWidth / 2;

	return centerPosition;
}

export function getEdgePositions({
	playerCount,
	tableWidth,
	tableHeight,
	playerPathMargin: pathMargin,
	playerSize,
}: {
	playerCount: number;
	tableWidth: number;
	tableHeight: number;
	playerPathMargin: number;
	playerSize: number;
}) {
	function getLengthWithMargin(length: number) {
		return length + 2 * pathMargin;
	}

	const tableLengthDelta =
		(getLengthWithMargin(tableWidth) /
			(2 * getLengthWithMargin(tableWidth) +
				2 * getLengthWithMargin(tableHeight))) *
		100;

	const edgeSections = [
		{ start: 0, end: Math.min(tableLengthDelta, 50) }, // top
		{ start: Math.min(tableLengthDelta, 50), end: 50 }, // right
		{ start: 50, end: Math.min(50 + tableLengthDelta, 100) }, // bottom
		{ start: Math.min(50 + tableLengthDelta, 100), end: 100 }, // left
	];

	// Margin to avoid corners
	const margin = 5;
	const edgeLengths = edgeSections.map((e) => e.end - e.start - 2 * margin);
	const totalEdgeLength = edgeLengths.reduce((a, b) => a + b, 0);

	// Calculate how many players per edge (distribute as evenly as possible)
	let playersPerEdge = edgeLengths.map((len) =>
		Math.round(playerCount * (len / totalEdgeLength))
	);
	// Adjust to ensure total matches playerCount
	let diff = playerCount - playersPerEdge.reduce((a, b) => a + b, 0);
	for (let i = 0; diff !== 0; i = (i + 1) % edgeSections.length) {
		if (diff > 0) {
			playersPerEdge[i]++;
			diff--;
		} else if (
			playersPerEdge[
				Math.abs((edgeSections.length - i - 1) % edgeSections.length)
			] > 0
		) {
			playersPerEdge[
				Math.abs((edgeSections.length - i - 1) % edgeSections.length)
			]--;
			diff++;
		}
	}

	// Calculate positions
	let positions = [];

	for (let edge = 0; edge < edgeSections.length; edge++) {
		let count = playersPerEdge[edge];
		if (count === 0) continue;

		let { start, end } = edgeSections[edge];

		let sectionStart = start + margin;
		let sectionEnd = end - margin;

		const sectionLength = sectionEnd - sectionStart;

		const playerRelativeLength =
			(playerSize /
				getLengthWithMargin(
					edge % 1 === 0 ? tableWidth : tableHeight
				)) *
				sectionLength +
			margin;

		for (let i = 1; i <= count; i++) {
			let pos =
				sectionStart +
				getUniformlySpacedElementCenter(
					sectionLength,
					playerRelativeLength,
					count,
					i
				);

			positions.push(pos);
		}

		// for (let i = 0; i < count; i++) {
		//     let t = count === 1 ? 0.5 : i / (count - 1);
		//     let pos = sectionStart + t * (sectionEnd - sectionStart);
		//     positions.push(pos);
		// }
	}

	return positions;
}
