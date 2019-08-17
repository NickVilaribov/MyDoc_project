
var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		rigger        = require('gulp-rigger'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		replace 			= require("gulp-replace");
		cheerio 			= require("gulp-cheerio");
		rsync         = require('gulp-rsync');
		ftp       		= require('vinyl-ftp');
		gzip 					= require('gulp-gzip');


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/sass/*.sass')
	//.pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError()))
	.pipe(sass({ outputStyle: '' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleancss()) // Opt., comment out when debugging
	//.pipe(gzip()) //GZIP compression
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream())
});


gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/popper.js/dist/umd/popper.js',
		'app/libs/bootstrap/dist/js/bootstrap.min.js',

		//'app/libs/bootstrap/dist/js/bootstrap.bundle.js',
		//'app/libs/mixitup/dist/mixitup.min.js',
		'app/libs/owl.carousel/dist/owl.carousel.min.js',
		//'app/libs/jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.min.js',
		//'app/libs/jquery-nice-select/js/jquery.nice-select.min.js',
		//'app/libs/masonry-layout/dist/masonry.pkgd.min.js',
		//'app/libs/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
		//'app/libs/ddslick/jquery.ddslick.min.js',
		'app/libs/smoothscroll/smoothscroll.js',
		'app/libs/cookie/cookie.js',
		//'app/libs/wow/dist/wow.min.js',
		//'app/libs/parallax.js/parallax.min.js',
		'app/libs/fancybox-master/dist/jquery.fancybox.min.js',
		//'app/libs/svg-include/svg.js',
		//'app/libs/MaskedInput/maskedinput.min.js',
		'app/libs/lazysizes/lazysizes.min.js',
		'app/libs/air-datepicker/dist/js/datepicker.min.js',
		'app/libs/button-visually-impaired-jquery-master/dist/js/responsivevoice.min.js',
		'app/libs/button-visually-impaired-jquery-master/dist/js/js.cookie.min.js',
		'app/libs/button-visually-impaired-jquery-master/dist/js/bvi.js',
		'app/js/debounce.js',
		'app/js/hours.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	//.pipe(uglify()) // Mifify js (opt.)
	//.pipe(gzip()) //GZIP compression
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({ stream: true }))
});





gulp.task('build:html', function () {
    return gulp.src('app/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({ stream: true }))
});

// gulp.task('build:template', function() {
// 		return gulp.src('app/*.html')
//     //gulp.src('app/*.html')
//         .pipe(gulp.dest('build/templates'))
//         .pipe(browserSync.reload({ stream: true }))
// });

// gulp.task('build:template_thempla', function() {
// 		return gulp.src('app/template/**/*.*')
//     //gulp.src('app/template/**/*.*')
//         .pipe(gulp.dest('build/templates/thempla'))
//         .pipe(browserSync.reload({ stream: true }))
// });

gulp.task('build:img', function() {
		return gulp.src('app/img/**/*.*')
    //gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('build:fonts', function() {
    gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(browserSync.reload({ stream: true }))
});

// gulp.task('build:json', function() {
//      gulp.src('app/json/**/*.*')
//          .pipe(gulp.dest('build/json'))
//          .pipe(browserSync.reload({ stream: true }))
//  });


gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

//FTP deploy
gulp.task('deploy', function() {
	var conn = ftp.create({
		host:      'ftp.volnastudio.com',
		user:      '//destore.by',
		password:  'C2y9O7d2',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'build/**',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/assets/build/'));
});

//GULP v3

// gulp.task('watch', ['styles', 'js', 'build:html', 'build:template', 'build:template_thempla', 'build:img', 'build:fonts', 'build:json', 'browser-sync'], function() {
// 	gulp.watch('app/sass/**/*.*', ['styles']);
// 	//gulp.watch('app/img/svg/*.svg', ['svg']);
// 	//gulp.watch('app/svg-sprite/svg/sprite.symbol.svg', ['svg:replace']);
// 	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
// 	gulp.watch('app/img/**/*.*', ['build:img']);
// 	gulp.watch('app/fonts/**/*.*', ['build:fonts']);
// 	gulp.watch('app/json/**/*.*', ['build:json']);
// 	gulp.watch('app/template/**/*.html',  ['build:template_thempla']);
// 	gulp.watch('app/*.html',  ['build:template']);
// 	gulp.watch(['app/template/**/*.html', 'app/*.html'],  ['build:html']);
// 	gulp.watch('app/*.html', browserSync.reload)
// });


// gulp.task('default', ['watch']);

//GULP v4
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.*', gulp.parallel('styles'));
	//gulp.watch('app/img/svg/*.svg', ['svg']);
	//gulp.watch('app/svg-sprite/svg/sprite.symbol.svg', ['svg:replace']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/img/**/*.*', gulp.parallel('build:img'));
	gulp.watch('app/fonts/**/*.*', gulp.parallel('build:fonts'));
	//gulp.watch('app/json/**/*.*', gulp.parallel('build:json'));
	//gulp.watch('app/template/**/*.html',  gulp.parallel('build:template_thempla'));
	//gulp.watch('app/*.html',  gulp.parallel('build:template'));
	gulp.watch(['app/template/**/*.html', 'app/template/*.html', 'app/*.html'],  gulp.parallel('build:html'));
	gulp.watch('app/*.html', browserSync.reload)
});


gulp.task('default', gulp.parallel('styles', 'js', 'build:html', 'build:img', 'build:fonts', 'browser-sync', 'watch'));

