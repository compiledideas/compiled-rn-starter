#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function validateBundleId(bundleId) {
  const regex = /^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/;
  return regex.test(bundleId);
}

function validateProjectName(name) {
  const regex = /^[a-z][a-z0-9-]*$/;
  return regex.test(name);
}

async function main() {
  console.log('🚀 Welcome to CompiledIdeas Starter CLI!');
  console.log(
    'This will create a new React Native project with Expo Router + Tailwind CSS + Convex\n',
  );

  try {
    const projectName = await question(
      '📱 Project name (lowercase, hyphens allowed): ',
    );
    if (!validateProjectName(projectName)) {
      console.error(
        '❌ Invalid project name. Use lowercase letters, numbers, and hyphens only.',
      );
      process.exit(1);
    }

    const displayName = await question('📝 Display name (for app stores): ');

    const bundleId = await question(
      '📦 Bundle ID (e.g., com.yourcompany.appname): ',
    );
    if (!validateBundleId(bundleId)) {
      console.error('❌ Invalid bundle ID format.');
      process.exit(1);
    }

    const expoUsername = await question('👤 Expo username/organization: ');

    const scheme =
      (await question(`🔗 URL scheme (default: ${projectName}): `)) ||
      projectName;

    rl.close();

    console.log('\n📥 Cloning starter template...');

    execSync(
      `git clone https://github.com/compiledideas/compiled-rn-starter.git ${projectName}`,
      {
        stdio: 'inherit',
      },
    );

    process.chdir(projectName);

    execSync('rm -rf rn-starter-cli', { stdio: 'inherit' });
    execSync('rm -rf .git', { stdio: 'inherit' });

    console.log('\n🔧 Configuring project...');

    const packageJsonPath = './package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    updateEnvConfig(projectName, displayName, bundleId, expoUsername, scheme);

    updateAppConfig(projectName);

    createEnvFiles();

    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync(
      'git commit -m "Initial commit from CompiledIdeas starter template"',
      {
        stdio: 'inherit',
      },
    );

    console.log('\n✅ Project created successfully!');
    console.log('\n📋 Next steps:');
    console.log(`   cd ${projectName}`);
    console.log('   pnpm install');
    console.log('   npx convex dev  # Set up your Convex backend');
    console.log('   pnpm start      # Start the development server');
    console.log("\n📚 Don't forget to:");
    console.log('   - Update your Convex deployment URLs in .env files');
    console.log('   - Configure your EAS project ID');
    console.log('   - Set up your authentication keys');
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    process.exit(1);
  }
}

function updateEnvConfig(
  projectName,
  displayName,
  bundleId,
  expoUsername,
  scheme,
) {
  const envPath = './env.js';
  let envContent = fs.readFileSync(envPath, 'utf8');

  envContent = envContent.replace(
    /const BUNDLE_ID = '[^']*';/,
    `const BUNDLE_ID = '${bundleId}';`,
  );
  envContent = envContent.replace(
    /const PACKAGE = '[^']*';/,
    `const PACKAGE = '${bundleId}';`,
  );
  envContent = envContent.replace(
    /const NAME = '[^']*';/,
    `const NAME = '${displayName}';`,
  );
  envContent = envContent.replace(
    /const EXPO_ACCOUNT_OWNER = '[^']*';/,
    `const EXPO_ACCOUNT_OWNER = '${expoUsername}';`,
  );
  envContent = envContent.replace(
    /const SCHEME = '[^']*';/,
    `const SCHEME = '${scheme}';`,
  );

  envContent = envContent.replace(
    /const EAS_PROJECT_ID = '[^']*';/,
    `const EAS_PROJECT_ID = 'YOUR_EAS_PROJECT_ID_HERE';`,
  );

  fs.writeFileSync(envPath, envContent);
}

function updateAppConfig(projectName) {
  const appConfigPath = './app.config.ts';
  let appConfigContent = fs.readFileSync(appConfigPath, 'utf8');

  appConfigContent = appConfigContent.replace(
    /slug: '[^']*',/,
    `slug: '${projectName}',`,
  );

  fs.writeFileSync(appConfigPath, appConfigContent);
}

function createEnvFiles() {
  const envTemplate = `CONVEX_DEPLOYMENT=YOUR_CONVEX_DEPLOYMENT_HERE

EXPO_PUBLIC_CONVEX_URL=YOUR_CONVEX_URL_HERE

CONVEX_SITE_URL=YOUR_CONVEX_SITE_URL_HERE

AUTH_RESEND_KEY=YOUR_RESEND_KEY_HERE
`;

  fs.writeFileSync('.env.development', envTemplate);
  fs.writeFileSync('.env.staging', envTemplate);
  fs.writeFileSync('.env.prod', envTemplate);
}

if (require.main === module) {
  main();
}
