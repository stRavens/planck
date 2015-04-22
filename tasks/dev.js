"use strict";

var gulp = require('gulp-help')(require('gulp'));
var runSequence = require("run-sequence");
var plumber = require('gulp-plumber');

var paths = (new function(){
	this.dest = "build";
	this.exclude = ["!{node_modules,node_modules/**}", "!{.git,.git/**}","!{build,build/**}", "!{logs,logs/**}", "!{coverage,coverage/**}", "!{tasks,tasks/**}", "!gulpfile.js"];
	this.js = ["./**/*.js"];
}());

var exclude = function(path){
	if(path instanceof Array){
		return path.map(function(el){return "!"+el;});
	}
	return "!"+path;
};

var buildBabel = function(watching){
	var watch = require("gulp-watch");
	var babel = require("gulp-babel");
	var insert = require("gulp-insert");
	var sourcemaps = require("gulp-sourcemaps");

	var src = gulp.src(paths.js.concat(paths.exclude).concat(["!index.js"]))
		.pipe(plumber());
	if (watching) {
		src = src.pipe(watch(paths.js.concat(paths.exclude), {ignoreInitial: true}))
	}
	src.pipe(sourcemaps.init())
		.pipe(babel()).pipe(insert.prepend('require("source-map-support").install();require("babel/polyfill");'))
		.on('error', console.error.bind(console))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.dest));

	var src = gulp.src(["index.js"])
		.pipe(plumber());
	if (watching) {
		src = src.pipe(watch(["index.js"], {ignoreInitial: true}))
	}
	src.pipe(sourcemaps.init())
		.pipe(babel()).pipe(insert.prepend('require("source-map-support").install();require("babel/polyfill");require("./polyfill/system");'))
		.on('error', console.error.bind(console))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.dest));
}
// ==== live rebuild on developement
gulp.task("watch", false, function() {
	var watch = require("gulp-watch");
	buildBabel(true);

	gulp.src(["./**/*", "!./package.json"].concat(paths.exclude, exclude(paths.js)))
		.pipe(watch(["./**/*", "!./package.json"].concat(paths.exclude, exclude(paths.js)), {ignoreInitial: true}))
		.pipe(gulp.dest(paths.dest));
});

gulp.task("copy", false, function(){
	return gulp.src(["./**/*"].concat(paths.exclude, exclude(paths.js)))
		.pipe(gulp.dest(paths.dest));
});

gulp.task("babel", "builds all server scripts from es6 to es5", function(){
	buildBabel(false);
}, {
	aliases: ['bab']
});

gulp.task("clean", "clean server folder in build directory", function (cb) {
	var del = del || require('del');
	del([paths.dest+"/**/*"], {force: true}, cb);
}, {
	aliases: ['c']
});

gulp.task("build", "create full build", function(cb){
	return runSequence("clean", ["copy", "babel"], cb);
}, {
	aliases: ['b']
});

gulp.task("dev", "start develop server for serving assets and incremental builds", ["watch"], function(){}, {
	aliases: ['d']
});

gulp.task("default", false, ["help"]);

gulp.task("prepare", "task for resolve dependencies for this script and grub sources", ["npm-dev-install"]);