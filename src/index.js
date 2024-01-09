import dotenv from 'dotenv';
import { downloadLatestRelease, unpackLatestRelease, appendToGitHubPath } from './functions/cardano-bins.js';

dotenv.config();
await downloadLatestRelease();
const fullPath = await unpackLatestRelease();
await appendToGitHubPath(fullPath);