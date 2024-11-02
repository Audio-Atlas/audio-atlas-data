const from  = 'C:/Users/camoc/Desktop/Code/AudioAtlas/audio-atlas-data1/ZapPacksClean';
const to = 'C:/Users/camoc/Desktop/Code/AudioAtlas/audio-atlas-data/SFX';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// for each directory in from
// copy the contents to a new directory in to
const directories = fs.readdirSync(from);
for (const directory of directories) {
    console.log(`Copying ${directory}...`);
    const fromDirectory = path.join(from, directory);
    const toDirectory = path.join(to, directory);

    // if the directory already exists, skip it
    if (fs.existsSync(toDirectory)) {
        console.log(`Directory ${directory} already exists. Skipping...`);
        continue;
    }

    console.log(`Copying ${fromDirectory} to ${toDirectory}...`);
    // break;
    fs.mkdirSync(toDirectory);

    const files = fs.readdirSync(fromDirectory);
    for (const file of files) {
        const fromFile = path.join(fromDirectory, file);
        const toFile = path.join(toDirectory, file);
        fs.copyFileSync(fromFile, toFile);
    }

    // git add and commit
    console.log('Adding and committing...');
    execSync(`git add ${toDirectory}`);
    execSync(`git commit -m "Initial commit of ${directory}"`);

    // git push
    execSync('git push');
    console.log('Done.');
    console.log();
}