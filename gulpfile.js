const { watch, series, parallel, src, dest } = require('gulp')
const postcss = require('gulp-postcss')
// const sass = require('gulp-sass')(require('sass'))
const less = require('gulp-less')
const cssnext = require('postcss-cssnext')
const shortcss = require('postcss-short')
const del = require('del')
const concat = require('gulp-concat')
const path = require('path')

const destName = 'compiled'
const destination = `./src/styles/${destName}`
const destinationCss = `./src/styles/${destName}/**/*.css`

const defaultTask = (cb) => {
	// place code for your default task here
	cb()
}

const cleanCss = (cb) => {
	return del([destinationCss])
	cb()
}

const processLess = (cb) => {
	// Files to compile to the "destination" directory as css
	// No need to include files that use @import
	return src(['./src/components/**/*.less'])
		.pipe(
			less({
				paths: [path.join(__dirname, 'src')],
			})
		)
		.pipe(dest(destination, { overwrite: true }))
	cb()
}

// Run CSS prefixing, cleanup, and minify
const css = (cb) => {
	const plugins = [shortcss, cssnext]
	return src([destinationCss], { sourcemaps: true })
		.pipe(postcss(plugins))
		.pipe(concat('App.css'))
		.pipe(dest('./src/', { overwrite: true, sourcemaps: true }))
	cb()
}

const watchLess = (cb) => {
	watch('./src/**/*.less', series(cleanCss, processLess, css))
	cb()
}

exports.watch = watchLess
exports.default = defaultTask
