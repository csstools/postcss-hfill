# PostCSS hfill [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]
[![Gitter Chat][git-img]][git-url]

[PostCSS hfill] lets you style contextual headings in CSS, like the [proposed `<h>` element].

```css
x-h { font-size: 2em }

article x-h,aside x-h,nav x-h,section x-h { font-size: 1.5em }

article article x-h,article aside x-h,article nav x-h,article section x-h,
aside article x-h,aside aside x-h,aside nav x-h,aside section x-h,
nav article x-h,nav aside x-h,nav nav x-h,nav section x-h,
section article x-h,section aside x-h,section nav x-h,section section x-h { font-size: 1.17em }

/* etc. */
```

Only element specificity is used so that heading styles may be more easily overwritten. Despite the longevity of selectors, default styling contributes, at most, 311 bytes.

The default `<x-h>` element is used to prevent stomping on the native namespace. This plugin is intended to produce contextual headings in JavaScript-free experiences, and may improve seach engine crawling. For dynamic usage, see [hfill]. For an HTML preprocessing option, see [posthtml-hfill].

## Options

#### `tag`

Type: `String`  
Default: `"x-h"`

The tag used by contextual headings.

#### `sizes`

Type: `Array`  
Default: `[ "2em", "1.5em", "1.17em", "1em" ]`

The font sizes given to each heading as it descends into the outline.

## Usage

Add [PostCSS hfill] to your build tool:

```bash
npm install postcss-hfill --save-dev
```

#### Node

Use [PostCSS hfill] to process your CSS:

```js
require('postcss-hfill').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Use [PostCSS hfill] as a plugin:

```js
postcss([
	require('postcss-hfill')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS hfill] in your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-hfill')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS hfill] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-hfill')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[npm-url]: https://www.npmjs.com/package/postcss-hfill
[npm-img]: https://img.shields.io/npm/v/postcss-hfill.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-hfill
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-hfill.svg
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/npm/l/postcss-hfill.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[PostCSS hfill]: https://github.com/jonathantneal/postcss-hfill
[PostCSS]: https://github.com/postcss/postcss
[posthtml-hfill]: https://github.com/jonathantneal/posthtml-hfill
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[hfill]: https://github.com/jonathantneal/hfill
[proposed `<h>` element]: https://github.com/w3c/html/issues/774
