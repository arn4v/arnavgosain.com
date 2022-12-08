interface TableOfContentsTree {
	title: string;
	children: TableOfContentsTree[];
}

export function getMarkdownTocTreeFromRawSource(
	source: string,
	headingLevel = 1,
	originalHeadingLevel = 1,
	tree: TableOfContentsTree[] = []
) {
	const lines = source.split('\n');
	const headingString = '#'.repeat(headingLevel);

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.startsWith(headingString + ' ')) {
			const title = line.replace(headingString, '').trim();
			const children = getMarkdownTocTreeFromRawSource(lines.slice(i + 1).join('\n'));
			tree.push({ title, children });
		} else if (line.startsWith('#'.repeat(headingLevel - 1) + ' ')) {
			const title = line.replace('#'.repeat(headingLevel - 1), '').trim();
			const children = getMarkdownTocTreeFromRawSource(lines.slice(i).join('\n'), headingLevel - 1);
			tree.push({ title, children });
		} else if (
			headingLevel > originalHeadingLevel &&
			line.startsWith('#'.repeat(headingLevel) + ' ')
		) {
			return tree;
		}
		// } else if (line.startsWith('#'.repeat(headingLevel + 1) + ' ')) {
		// 	return getMarkdownTocTreeFromRawSource(lines.slice(i).join('\n'), headingLevel + 1);
	}

	return tree;
}
