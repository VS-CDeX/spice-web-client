var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	stripDebug = require("gulp-strip-debug"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify"),
	uglifycss = require("gulp-uglifycss"),
	concat = require("gulp-concat"),
	htmlmin = require("gulp-htmlmin");


gulp.task("css", function() {
	return (
		gulp
			.src(["spice.css", "lib/jquery.nok.min.css"])
			.pipe(uglifycss({ uglyComments: true }))
			.pipe(concat("style.css"))
			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest("app/assets/css"))
			.pipe(browserSync.reload({ stream: true }))
	);
});

gulp.task("pages", function() {
	return gulp
		.src(["*.html"])
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true
			})
		)
		.pipe(gulp.dest("./app"));
});

gulp.task("lib", function() {
	gulp.src([
		"lib/modernizr.js",
		"lib/jquery-2.0.3.js",
		"lib/jquery-mousewheel.js",
		"lib/jgestures.min.js",
		"lib/pixastic.js",
		"lib/base64.js",
		"lib/biginteger.js",
		"lib/virtualjoystick.js",
		"lib/prettyprint.js",
		"lib/jquery.nok.min.js",
		"lib/jsbn.js",
		"lib/jsbn2.js",
		"lib/prng4.js",
		"lib/rng.js",
		"lib/sha1.js",
		"lib/encrypt.js",
		"swcanvas/swcanvas.js",
		"lib/bowser.js",
		"lib/utils.js",
		"lib/flipper.js",
		"lib/CollisionDetector.js",
		"lib/GlobalPool.js",
		"lib/GenericObjectPool.js",
		"lib/AsyncConsumer.js",
		"lib/AsyncWorker.js",
		"lib/PacketWorkerIdentifier.js",
		"spiceobjects/spiceobjects.js",
		"spiceobjects/generated/protocol.js",
		"lib/graphicdebug.js",
		"lib/images/lz.js",
		"lib/images/bitmap.js",
		"lib/images/png.js",
		"lib/runqueue.js",
		"lib/graphic.js",
		"lib/queue.js",
		"lib/ImageUncompressor.js",
		"lib/SyncAsyncHandler.js",
		"lib/IntegrationBenchmark.js",
		"lib/stuckkeyshandler.js",
		"lib/timelapsedetector.js",
		"lib/displayRouter.js",
		"lib/rasterEngine.js",
		"lib/DataLogger.js"
	])
		.pipe(concat("lib.js"))
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("app/assets/js"))
		.pipe(browserSync.reload({ stream: true, once: true }));
});
gulp.task("js", function() {
	gulp.src([
		"network/socket.js",
		"network/clusternodechooser.js",
		"network/socketqueue.js",
		"network/packetcontroller.js",
		"network/packetextractor.js",
		"network/packetreassembler.js",
		"network/reassemblerfactory.js",
		"network/sizedefiner.js",
		"network/packetlinkfactory.js",
		"network/spicechannel.js",
		"network/busconnection.js",
		"network/websocketwrapper.js",
		"network/connectioncontrol.js",
		"application/agent.js",
		"application/spiceconnection.js",
		"application/clientgui.js",
		"application/packetprocess.js",
		"application/packetfilter.js",
		"application/packetfactory.js",
		"application/application.js",
		"application/virtualmouse.js",
		"application/imagecache.js",
		"application/rasteroperation.js",
		"application/stream.js",
		"application/inputmanager.js",
		"process/busprocess.js",
		"process/displayprocess.js",
		"process/displaypreprocess.js",
		"process/inputprocess.js",
		"process/cursorprocess.js",
		"process/playbackprocess.js",
		"process/mainprocess.js",
		"keymaps/keymapes.js",
		"keymaps/keymapit.js",
		"keymaps/keymapus.js",
		"keymaps/keymapfr.js",
		"keymaps/keymapru.js",
		"keymaps/keymap.js",
		"application/WorkerProcess.js",
		"flexvdi/inactivity.js",
		"flexvdi/flexvdi.js",
		"flexvdi/extwin.js",
		"translation.js",
		"run.js"
	])
		.pipe(concat("scripts.js"))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("app/assets/js"))
		.pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task("browser-sync", function() {
	browserSync.init(null, {
		server: {
			baseDir: "app"
		}
	});
});
gulp.task("bs-reload", function() {
	browserSync.reload();
});

gulp.task("default", ["css", "pages", "lib", "js", "browser-sync"], function() {
	gulp.watch("*/*.css", ["css", "bs-reload"]);
	gulp.watch("src/js/*.js", ["js", "bs-reload"]);
	gulp.watch("app/*.html", ['bs-reload']);
});
