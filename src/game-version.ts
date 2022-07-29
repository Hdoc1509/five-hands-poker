import { gid } from './utils/dom';
import { version } from '../package.json';

const $version = gid('game-version');
const releaseURL = 'https://github.com/Hdoc1509/five-hands-poker/releases/tag';
const currentVersion = `v${version}`;

$version!.setAttribute('href', `${releaseURL}/${currentVersion}`);
$version!.textContent = `${currentVersion}`;
