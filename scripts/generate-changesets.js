const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const PACKAGE_DIR = path.resolve(__dirname, '../../packages')

console.log('==== Generate changeset ====')

// Function to get all commits and their related modified files on the current branch
function getCommitsWithFiles() {
  console.log('getCommitsWithFiles')

  const branchName = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim()

  let logOutput

  try {
    // Try to get log from the remote branch if it exists
    logOutput = execSync(
      `git log --format="%H %s" --no-merges --first-parent origin/${branchName}..HEAD`,
    )
      .toString()
      .trim()
  } catch (_error) {
    console.warn(
      `⚠️  Remote branch "origin/${branchName}" not found. Using local commits instead.`,
    )
    // Fallback to the local branch if the remote branch doesn't exist
    logOutput = execSync(
      `git log --format="%H %s" --no-merges ${branchName} ^$(git merge-base ${branchName} main)`,
    )
      .toString()
      .trim()
  }

  const commits = logOutput
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [commitHash, ...messageParts] = line.split(' ')
      const commitMessage = messageParts.join(' ')

      if (commitMessage.startsWith('ci:')) {
        return { commitMessage: '', fileList: [] }
      }

      const fileList = execSync(
        `git show --name-only --pretty="format:" ${commitHash}`,
      )
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean)

      return { commitMessage, fileList }
    })

  return commits
}

function getCommitMessagesForPackage(commits, packagePath) {
  // Create a changeset array to collect changes for the specific package
  const changeset = []

  // Iterate through each commit and collect changes for the given package
  for (const commit of commits) {
    for (const filePath of commit.fileList) {
      // Check if the file path includes the package path
      if (filePath.startsWith(packagePath)) {
        changeset.push(commit.commitMessage)
      }
    }
  }

  return changeset
}

function writeChangesetFile(packageFolderName, commitMessages) {
  let allCommits = ''
  let bumpType = 'patch'

  // Read package name from package.json
  const packageJsonPath = path.join(
    PACKAGE_DIR,
    packageFolderName,
    'package.json',
  )
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  const actualPackageName = packageJson.name

  for (const message of commitMessages) {
    allCommits += `- ${message}\n`
    if (message.includes('BREAKING CHANGE')) {
      bumpType = 'major'
    } else if (message.startsWith('feat') && bumpType !== 'major') {
      bumpType = 'minor'
    }
  }

  const changesetFilename = `../.changeset/${packageFolderName}-update.md`
  const changesetContent = `---\n"${actualPackageName}": ${bumpType}\n---\n\n${allCommits}`

  fs.writeFileSync(
    path.resolve(__dirname, '../', changesetFilename),
    changesetContent.trim(),
  )
  console.log(
    `✅ Changeset created for ${actualPackageName}: ${changesetFilename}`,
  )
}

// Execute functions
const commits = getCommitsWithFiles()

const packageFolders = fs.readdirSync(PACKAGE_DIR).filter((folder) => {
  const packagePath = path.join(PACKAGE_DIR, folder)
  return fs.lstatSync(packagePath).isDirectory()
})

for (const packageFolderName of packageFolders) {
  console.log(`\n📦 Processing package: ${packageFolderName}`)

  const packagePath = `packages/${packageFolderName}`
  const commitMessages = getCommitMessagesForPackage(commits, packagePath)
  if (commitMessages.length > 0) {
    writeChangesetFile(packageFolderName, commitMessages)
  }
}
