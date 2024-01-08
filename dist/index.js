import dotenv from 'dotenv';
import { downloadLatestRelease, unpackLatestRelease, appendToGitHubPath } from './functions/cardano-bins.js';
dotenv.config();
await downloadLatestRelease();
await unpackLatestRelease();
await appendToGitHubPath('./bins');
//# sourceMappingURL=index.js.map