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
	// generate contextual heading font-sizes using only element specificity
	const cssRules = sizes.reduce(
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

			return rules.concat(
				postcss.rule({
					selectors: result.map(
						(x) => x.length ? x.join(' ').concat(` ${ tag }`) : tag
					),
					nodes: [
						postcss.decl({
							prop: 'font-size',
							value: sizes[size],
							source: source,
							raws: declRaws
						})
					],
					source: source,
					raws: ruleRaws
				})
			);
		},
		[]
	);

	// prepend contextual heading font-sizes using only element specificity
	root.prepend(
		cssRules
	);
});


// minified raws
const declRaws = { before: '', between: ':', after: '' };
const ruleRaws = { before: '\n', between: '', after: '', semicolon: false };
const source = {
	input: {
		file: 'postcss-hfill'
	}
};
