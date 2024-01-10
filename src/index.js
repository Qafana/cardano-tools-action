import dotenv from 'dotenv';
import { downloadLatestRelease, unpackLatestRelease, moveToRunnerBin } from './functions/cardano-bins.js';

dotenv.config();
await downloadLatestRelease();
await unpackLatestRelease();
await moveToRunnerBin();
//await appendToGitHubPath(fullPath);