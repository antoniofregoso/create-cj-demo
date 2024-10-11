#!/usr/bin/env node

const degit = require('degit');
const path = require('path');
const fs = require('fs');


// Check if the project name was passed as an argument
const projectName = process.argv[2];
if (!projectName) {
  console.error('Please provide a name for the project.');
  process.exit(1);
}

// Project route
const projectPath = path.join(process.cwd(), projectName);

// Check if the project folder already exists
if (fs.existsSync(projectPath)) {
    console.error(`The directory ${projectName} already exists.`);
    process.exit(1);
  }
  
// Configure `degit` to clone GitHub repository
const emitter = degit('antoniofregoso/bj-app', {
    cache: false,
    force: true,
    verbose: true
  });

  // Start cloning
emitter.clone(projectPath).then(() => {
    console.log(`Project ${projectName} successfully created from GitHub!`);
    console.log('1. Go to the project directory:');
    console.log(`   cd ${projectName}`);
    console.log('2. Install the dependencies:');
    console.log('   npm install');
    console.log('3. Create the configuration directory:');
    console.log('   mkdir src/.env');
    console.log('4. Create the configuration file:');
    console.log('   echo "{}" | cat > src/.env/conf.json');
    console.log('5. Create css files:');
    console.log('   npm run scss');
    console.log('6. Start the application:');
    console.log('   npm run watch');
    console.log('7. Enjoy:');
    console.log('   Go to http://localhost:8000/');
  }).catch(err => {
    console.error('Error cloning repository:', err);
  });
  