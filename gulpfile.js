'use strict';

let gulp = require('gulp');
let git = require('gulp-git');
let prompt = require('gulp-prompt');
let sass = require('gulp-sass');
let maps = require('gulp-sourcemaps');

// SASS TASKS //

//compile scss file
gulp.task("compileSass", function(){
	return gulp.src("scss/style.scss")
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
	});
// watches scss file
gulp.task("watchSass", function() {
	gulp.watch('scss/*.scss', ['compileSass']);
	});


// GITHUB TASKS //

// git init
gulp.task("init", function(){
	git.init(function(err) {
		if (err) throw err;
		})
	});
// git add - adds all files
gulp.task("add", function() {
	return gulp.src('./*')
	.pipe(git.add());
	});
// git commit - commits added files and ignores the .gitignore files, prompts for a commit message
gulp.task("commit", function(){
	 gulp.src('package.json')
	.pipe(prompt.prompt({
		type: 'input',
		name: 'commit',
		message: 'Please enter a commit message...'
		}, function(res){
			return gulp.src([ '!node_modules/', './*' ], {buffer:false})
	.pipe(git.commit(res.commit));
	}));
	});
// git push - to origin master
gulp.task("push", function() {
	git.push('origin', 'master', function(err) {
		if (err) throw err;
		});
	});