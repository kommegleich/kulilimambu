const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'images');

async function processImages() {
    try {
        const files = fs.readdirSync(dir);

        // Step 1: Filter relevant images starting with "kulili_"
        const relevantFiles = files.filter(f => f.startsWith('kulili_') && (f.endsWith('.jpg') || f.endsWith('.gif') || f.endsWith('.webp')));

        // Data structure to hold final results for the frontend
        const imagesData = [];

        // Create a Set for easy lookup to see if a webp and gif version exists
        const fileSet = new Set(relevantFiles);

        for (const file of relevantFiles) {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);

            // If it's a JPG, check if a WebP version already exists. If not, convert it.
            if (ext === '.jpg') {
                const webpName = `${baseName}.webp`;
                const webpPath = path.join(dir, webpName);

                if (!fs.existsSync(webpPath)) {
                    console.log(`Converting ${file} to WebP...`);
                    await sharp(path.join(dir, file))
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    console.log(`Converted ${webpName}`);

                    // Add to our set so subsequent loop iterations know it exists
                    fileSet.add(webpName);
                }
            }
        }

        // Refresh directory content after potential conversions
        const updatedFiles = fs.readdirSync(dir).filter(f => f.startsWith('kulili_'));
        const updatedSet = new Set(updatedFiles);

        // We only want to push unique base names to our data array.
        const uniqueBaseNames = new Set(updatedFiles.map(f => {
            const ext = path.extname(f);
            return path.basename(f, ext);
        }));

        for (const baseName of uniqueBaseNames) {
            const hasWebp = updatedSet.has(`${baseName}.webp`);
            const hasGif = updatedSet.has(`${baseName}.gif`);
            const hasJpg = updatedSet.has(`${baseName}.jpg`);

            // Prefer WebP for static. Fallback to JPG.
            let staticSrc = null;
            if (hasWebp) staticSrc = `${baseName}.webp`;
            else if (hasJpg) staticSrc = `${baseName}.jpg`;

            // If there's no static version at all (e.g. only a standalone GIF exists), use the GIF as static
            if (!staticSrc && hasGif) {
                staticSrc = `${baseName}.gif`;
            }

            // Only add if we have a valid static source to show initially
            if (staticSrc) {
                imagesData.push({
                    static: staticSrc,
                    animated: hasGif ? `${baseName}.gif` : null,
                    baseName: baseName
                });
            }
        }

        // Write the output to images.json
        fs.writeFileSync('images.json', JSON.stringify(imagesData, null, 2));
        console.log(`Successfully built images.json with ${imagesData.length} items.`);

    } catch (error) {
        console.error('Error processing images:', error);
        process.exit(1);
    }
}

processImages();
