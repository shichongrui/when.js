var gulp = require("gulp"),
    uglify = require("gulp-uglifyjs");

gulp.task("default", function () {
    return gulp.src("when.js")
        .pipe(uglify("when.min.js", {
            outSourceMap: true
        }))
        .pipe(gulp.dest("./"));
});