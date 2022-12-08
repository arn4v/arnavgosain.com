interface MarkdownTocTree {
	text: string;
	lvl: number;
	children: MarkdownTocTree[];
}

export function markdownToc(markdown: string): MarkdownTocTree[] {
	const lines = markdown.split('\n');

	// The current level of heading we're on (1 for top-level headings, 2 for second-level headings, etc.)
	let currentHeadingLvl = 0;

	// The current array of child headings at the current heading level
	let currentHeadingChildren: MarkdownTocTree[] = [];

	// The final array of top-level headings
	const headings: MarkdownTocTree[] = [];

	for (const line of lines) {
		// The regular expression matches any line that starts with one or more '#' characters followed by a space
		// and captures the number of '#' characters and the heading text in two separate capture groups
		const headingRegex = /^(#+) (.*)/;
		const matches = headingRegex.exec(line);

		if (matches) {
			// If the line is a heading, get the number of '#' characters and the heading text
			const numHashes = matches[1].length;
			const headingText = matches[2];

			if (numHashes > currentHeadingLvl) {
				// If the number of '#' characters is greater than the current heading level,
				// then this heading is a child of the previous heading at the same level
				currentHeadingChildren.push({
					text: headingText,
					lvl: numHashes,
					children: []
				});

				// Update the current heading level and the array of child headings
				currentHeadingLvl = numHashes;
				currentHeadingChildren = currentHeadingChildren[currentHeadingChildren.length - 1].children;
			} else if (numHashes === currentHeadingLvl) {
				// If the number of '#' characters is equal to the current heading level,
				// then this heading is a sibling of the previous heading at the same level
				currentHeadingChildren.push({
					text: headingText,
					lvl: numHashes,
					children: []
				});
			} else {
				// If the number of '#' characters is less than the current heading level,
				// then this heading is a sibling of a heading at a higher level, so we need to
				// go back up the tree to find the correct level for this heading
				while (currentHeadingLvl > numHashes) {
					// Pop the last element off of the current array of child headings
					// until we reach the correct level for this heading
					currentHeadingChildren = headings[headings.length - 1].children;
					currentHeadingLvl--;
				}

				// Add the new heading at the correct level
				currentHeadingChildren.push({
					text: headingText,
					lvl: numHashes,
					children: []
				});
			}
		}
	}

	return headings;
}
