import { promises as fs } from 'fs';
import { URL } from 'url';
import * as path from 'path';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execCallback);

const BINS_BASE_URL = 'https://github.com/input-output-hk/cardano-wallet';

const get_latest_release_tag = async () => {
    const response = await fetch(`${BINS_BASE_URL}/releases/latest`, { method: 'GET',
        headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    return data.tag_name;
};
const getPlatformReleaseUrl = async () => {
    const platform = process.platform;
    const tag = await get_latest_release_tag();
    let file_name = '';
    if (platform === 'linux') {
        file_name = `cardano-wallet-${tag}-linux64.tar.gz`;
    }
    else if (platform === 'darwin') {
        file_name = `cardano-wallet-${tag}-macos-intel.tar.gz`;
    }
    else if (platform === 'win32') {
        file_name = `cardano-wallet-${tag}-win64.zip`;
    }
    else {
        throw new Error(`Platform ${platform} not supported`);
    }
    return `${BINS_BASE_URL}/releases/download/${tag}/${file_name}`;
};
export const downloadLatestRelease = async () => {
    const url = await getPlatformReleaseUrl();
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const urlObj = new URL(url);
    const file_name = urlObj.pathname.split('/').pop();
    if (!file_name) {
        throw new Error('Unable to determine the file name from the URL');
    }
    const dir = './bins';
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, file_name);
    await fs.writeFile(filePath, Buffer.from(buffer));
};
export const unpackLatestRelease = async () => {
    const url = await getPlatformReleaseUrl();
    const urlObj = new URL(url);
    const file_name = urlObj.pathname.split('/').pop();
    if (!file_name) {
        throw new Error('Unable to determine the file name from the URL');
    }
    const dir = './bins';
    const filePath = path.join(dir, file_name);
    try {
        if (['linux', 'darwin', 'win32'].includes(process.platform)) {
            await exec(`tar -xf "${filePath}" -C "${dir}"`);
        }
        else {
            throw new Error(`Platform ${process.platform} not supported`);
        }
    }
    catch (error) {
        console.error(`Error occurred while unpacking: ${error}`);
        throw error;
    }
    const fullPath = path.resolve(dir, file_name.replace(/\.tar\.gz$/, ''));
    console.log(`Unpacked to ${fullPath}`);
    return `${fullPath}/`;
};
export const appendToGitHubPath = async (directory) => {
    console.log(`Appending ${directory} to GITHUB_PATH`);
    const path = process.env['GITHUB_WORKSPACE'];
    console.log(`GITHUB_WORKSPACE: ${path}`);
    try {
        const command = `echo "CARDANO_PATH=${path}/bins" >> $GITHUB_PATH`;
        await exec(command);
        console.log(`Command executed: ${command}`);
    }
    catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
};