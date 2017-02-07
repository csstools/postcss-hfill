// tooling
const postcss = require('postcss');

// sectioning elements
const sections = ['article', 'aside', 'nav', 'section'];
const length   = sections.length;

// plugin
module.exports = postcss.plugin('postcss-hfill', ({
	sizes       = ['2em', '1.5em', '1.17em', '1em'],
	tag         = 'x-h'
} = {}) => (root) => {
	// generate contextual heading styles using only element specificity
	const cssText = sizes.reduce(
		(rules, value, size) => {
			const total = Math.pow(length, size);
			const result = [];

			for (let i = -1; ++i < total;) {
				const combo = [];

				for (let ii = i, j = -1; ++j < size;) {
					let modulus = ii % length;

					combo.push(sections[modulus]);

					ii = (ii - modulus) / length;
				}

				result.push(combo);
			}

			return `${ rules + result.map(
				(x) => x.length ? x.join(' ').concat(` ${ tag }`) : tag
			).join(', ') } {${ size ? '' : ' display: block;' } font-size: ${ sizes[size] }; }\n`;
		},
		''
	);

	const cssRoot = postcss.parse(
		cssText,
		{
			from: 'postcss-hfill'
		}
	);

	// prepend contextual heading styles using only element specificity
	root.prepend(cssRoot);
});
