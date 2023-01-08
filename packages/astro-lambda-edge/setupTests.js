//import { polyfill } from '@astrojs/webapi';
const nodeFetch = require('node-fetch-commonjs');

//polyfill(global);
global.Response = nodeFetch.Response;
global.Request = nodeFetch.Request;
global.Headers = nodeFetch.Headers;
