const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

console.log(`👀 Watching for image changes in ${imagesDir}...`);

// Initialize watcher
const watcher = chokidar.watch(imagesDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true // Don't trigger on startup for existing files
});

let buildTimeout = null;

// Function to trigger the build script with debounce
const triggerBuild = (event, path) => {
    // We only care about .jpg, .gif, or .webp files starting with kulili_
    const ext = path.split('.').pop().toLowerCase();
    const basename = path.split('/').pop().split('\\').pop();

    if (basename.startsWith('kulili_') && ['jpg', 'webp', 'gif'].includes(ext)) {
        console.log(`\n🔄 Detected ${event} on ${basename}. Rebuilding images...`);

        // Clear existing timeout to debounce rapid events (like multiple files dropped at once)
        if (buildTimeout) clearTimeout(buildTimeout);

        buildTimeout = setTimeout(() => {
            exec('node build.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Build Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Build Stderr: ${stderr}`);
                    return;
                }
                console.log(stdout.trim());
                console.log('✅ Automatic update complete. Waiting for new changes...\n');
            });
        }, 500); // Wait 500ms after last event before building
    }
};

// Add event listeners
watcher
    .on('add', path => triggerBuild('addition', path))
    .on('change', path => triggerBuild('change', path))
    .on('unlink', path => triggerBuild('deletion', path));
