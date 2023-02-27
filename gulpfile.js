const gulp = require('gulp'); 
const cssnano = require('gulp-cssnano'); 
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat'); 
const uglify = require('gulp-uglify');

gulp.task('sass', function(){    
    return gulp.src('src/scss/styles.scss')       
        .pipe(sass())       
        .pipe(cssnano())       
        .pipe(gulp.dest('dist/css')); 
});

gulp.task('js', function(){    
    return gulp.src('src/js/*.js')
        .pipe(uglify())              
        .pipe(gulp.dest('dist/js')); 
});

gulp.task('html', function(){    
    return gulp.src('src/html/*.html')
        .pipe(gulp.dest('dist/html')); 
});

gulp.task('images', function(){    
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images')); 
});

gulp.task('build', gulp.series('sass', 'js', 'html', 'images'));