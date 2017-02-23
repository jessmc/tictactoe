'use strict';

let gulp = require('gulp');
let git = require('gulp-git');
let prompt = require('gulp-prompt');

gulp.task("hello", function(){
	console.log("hi, this works!");
	});

gulp.task("init", function(){
	git.init(function(err) {
		if (err) throw err;
		})
	});

gulp.task("add", function() {
	return gulp.src('./*')
	.pipe(git.add());
	});

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

gulp.task("push", function() {
	git.push('origin', 'master', function(err) {
		if (err) throw err;
		});
	});

gulp.task("default", ["hello"], function(){
	console.log("this is the default");
	});