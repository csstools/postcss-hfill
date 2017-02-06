// tooling
const generatorics = require('generatorics');
const postcss      = require('postcss');

// sectioning elements
const sections = ['article', 'aside', 'nav', 'section'];

// plugin
module.exports = postcss.plugin('postcss-hfill', ({
	sizes       = ['2em', '1.5em', '1.17em', '1em'],
	tag         = 'x-h'
}) => (root) => {
	// prepend contextual heading font-sizes using only element specificity
	root.prepend(
		permutatedSections(tag, sizes)
	);
});

// generate contextual heading font-sizes using only element specificity
function permutatedSections(tag, sizes) {
	const rules = [];

	for (let depth = 0; sizes[depth]; ++depth) {
		rules.push(
			postcss.rule({
				// selector is all permutations of sections by depth
				selector: Array.from(
					generatorics.clone.baseN(sections, depth)
				).map(
					(x) => x.length ? x.join(' ').concat(` ${ tag }`) : tag
				).join(','),
				// declaration is font-size of depth
				nodes: [
					postcss.decl({
						prop: 'font-size',
						value: sizes[depth],
						raws: declRaws
					})
				],
				raws: ruleRaws
			})
		);
	}

	return rules;
}

// minified raws
const declRaws = { before: '', between: ':', after: '' };
const ruleRaws = { before: '\n', between: '', after: '', semicolon: false };
