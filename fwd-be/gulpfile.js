/**
 * @author LocNT
 * @description test gulp
 * @type {*|Gulp}
 */

const gulp = require('gulp');
const shell = require('gulp-shell');
const apidoc = require('gulp-apidoc');
const argv = require('yargs')['argv'];
const runSequence = require('run-sequence').use(gulp);

gulp.task('copy-non-ts', () => {
    return gulp.src(['src/**/*', '!src/**/*.ts', '!src/types'])
        .pipe(gulp.dest('dist/'));
});

//#region Block Document
gulp.task('gen-doc', function(done) {
    apidoc({
        src: 'src/api',
        dest: 'dist/public',
        debug: true,
        silent: true,
        verbose: true,
        config: `./document/${argv.env || 'dev'}`,
        debug: true,
        includeFilters: [".*\\.controller\\.js|ts$"]
    }, done);
});
gulp.task('document-watch', ['gen-doc'], () => {
    gulp.watch('src/api/**/*.controller.ts', ['gen-doc']);
});
//#endregion

//#region Block Test
gulp.task('exec-test', (done) => {
    let reports = argv['reports'] !== undefined;
    let files = argv['files'];
    let windows = argv['windows'];
    if (files) files = 'test/scripts/s00.pre.spec.{ts,js} ' + files.trim().replace(',', ' ');
    else files = 'test/scripts/**/*.spec.{ts,js}';

    shell.task([
        `${windows ? 'set NODE_ENV=test &&' : 'NODE_ENV=test'} TS_NODE_FILES=true ${reports ? 'nyc' : ''} mocha ` +
        `--require ts-node/register tsconfig.json ${reports ? '--opts ./mocha.cfg' : ''} ${files} ${!reports ? '--timeout=50000' : ''} --exit`,
    ])(done);
});
gulp.task('clean-test', () => {
    shell.task([
        `rm -rf .nyc_output`
    ])();
});
gulp.task('test', (done) => {
    runSequence('clean-test', 'exec-test', done);
});
//#endregion

//#region Block Build
gulp.task('compile-ts', (done) => {
    shell.task(['rm -rf dist', 'tsc', 'tslint -c tslint.json -p tsconfig.json'])(done);
});
gulp.task('build', (done) => {
    runSequence('compile-ts', 'copy-non-ts', done);
});
gulp.task('build:local', () => {
    shell.task([`gulp build`, 'gulp gen-doc --env=local'])();
});
gulp.task('build:staging', () => {
    shell.task(['gulp build', 'gulp gen-doc --env=staging'])();
});
gulp.task('build:dev', () => {
    shell.task(['gulp build', 'gulp gen-doc --env=dev'])();
});
// production ignore document
gulp.task('build:production', () => {
    shell.task(['gulp build'])();
});
//#endregion