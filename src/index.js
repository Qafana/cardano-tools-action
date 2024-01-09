import dotenv from 'dotenv';
import { downloadLatestRelease, unpackLatestRelease, appendToGitHubPath, moveToGithubWorkspace } from './functions/cardano-bins.js';

dotenv.config();
await downloadLatestRelease();
const fullPath = await unpackLatestRelease();
await moveToGithubWorkspace();
//await appendToGitHubPath(fullPath);