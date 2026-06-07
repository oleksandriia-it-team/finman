/**
 * Postbuild patch for @ducanh2912/next-pwa generated sw.js.
 *
 * The plugin compiles its SW template with SWC and emits calls to
 * `_async_to_generator` / `_ts_generator` (TypeScript runtime helpers) without
 * bundling the actual helper implementations. Service workers run in a
 * restricted global scope where those helpers are undefined, causing:
 *   ReferenceError: _async_to_generator is not defined
 *
 * This script injects the two missing helpers at the top of public/sw.js
 * immediately after `npm run build`.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const swPath = join(__dirname, '../public/sw.js');

if (!existsSync(swPath)) {
  console.log('patch-sw: public/sw.js not found, skipping.');
  process.exit(0);
}

const sw = readFileSync(swPath, 'utf8');

let patched = sw;

const needsHelpers = !sw.includes('function _async_to_generator');
const helpers = `\
// ---- TypeScript runtime helpers injected by scripts/patch-sw.mjs ----
function _async_to_generator(fn) {
  return function () {
    var self = this, args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) { resolve(value); } else {
          Promise.resolve(value).then(
            function (v) { step('next', v); },
            function (v) { step('throw', v); }
          );
        }
      }
      step('next');
    });
  };
}
function _ts_generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () { if (t[0] & 1) throw t[1]; return t[1]; },
    trys: [],
    ops: [],
  }, f, y, t, g;
  return (g = { next: verb(0), throw: verb(1), return: verb(2) },
    typeof Symbol === 'function' && (g[Symbol.iterator] = function () { return this; }), g);
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return']
          : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0)
          : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0: case 1: t = op; break;
          case 4: _.label++; return { value: op[1], done: false };
          case 5: _.label++; y = op[1]; op = [0]; continue;
          case 7: op = _.ops.pop(); _.trys.pop(); continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0; continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
            if (t[2]) _.ops.pop();
            _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
}
// ---- end helpers ----

`;

// At install time, pre-cache the pages that serve as the offline app shell.
// "/" alone is not suitable — it has a NotAuthGuard that redirects logged-in
// users. We cache "/profile" instead: its HTML + the already-precached JS
// chunks are enough for React to boot and for client-side routing to take
// the user to whichever page they actually requested.
const pagesToPrecache = ['/', '/profile'];
// We also pre-cache the RSC payloads (fetched with Accept: text/x-component)
// for every STATIC profile route, so that Next.js client-side navigation to
// them works offline even if the user never visited / hovered the link while
// online (many of these links live behind menus and are never prefetched).
// Dynamic ([id]) routes can't be enumerated here — they get cached at runtime
// by the rsc-payloads NetworkFirst route when visited online.
const rscToPrecache = [
  '/',
  '/profile',
  '/profile/settings',
  '/profile/analytics',
  '/profile/budget/plans',
  '/profile/budget/regular-operations',
  '/profile/budget/regular-operations/add',
  '/profile/tracking-operations/add',
];
const installHandler = `\
self.addEventListener("install",function(ev){` +
  `var pages=${JSON.stringify(pagesToPrecache)};` +
  `var rsc=${JSON.stringify(rscToPrecache)};` +
  `ev.waitUntil(` +
    `caches.open("pages").then(function(c){` +
      `return Promise.all(pages.map(function(u){return c.add(u).catch(function(){});}));` +
    `}).then(function(){` +
      `return caches.open("rsc-payloads");` +
    `}).then(function(rc){` +
      `return Promise.all(rsc.map(function(u){` +
        `return fetch(u,{headers:{"Accept":"text/x-component","RSC":"1"}})` +
          `.then(function(r){if(r.ok)return rc.put(u,r);})` +
          `.catch(function(){});` +
      `}));` +
    `})` +
  `);` +
`});`;

if (needsHelpers) {
  patched = helpers + patched;
  console.log('patch-sw: ✅ injected _async_to_generator + _ts_generator');
} else {
  console.log('patch-sw: helpers already present, skipping helpers injection.');
}

if (!patched.includes('ev.waitUntil(caches.open("pages")')) {
  patched = installHandler + '\n' + patched;
  console.log('patch-sw: ✅ injected install handler to pre-cache "/"');
} else {
  console.log('patch-sw: install handler already present, skipping.');
}

// Cache RSC (React Server Component) payload requests so that Next.js
// client-side navigation works offline.  When the user visits a page while
// online the SW stores the ?_rsc= response; offline it serves from cache
// instead of throwing "Failed to fetch RSC payload … Falling back to
// browser navigation" which causes a full reload and shows the wrong page.
const rscRoute = `e.registerRoute(` +
  `({url:u})=>u.searchParams.has("_rsc"),` +
  `new e.NetworkFirst({cacheName:"rsc-payloads",networkTimeoutSeconds:3,` +
  `plugins:[{` +
    `cacheKeyWillBeUsed:async({request:r})=>{` +
      `var u=new URL(r.url);` +
      `u.searchParams.delete("_rsc");` +
      `return u.toString();` +
    `},` +
    `handlerDidError:async({request:r})=>{` +
      `var u=new URL(r.url);` +
      `u.searchParams.delete("_rsc");` +
      `return(await caches.match(u.toString()))||Response.error();` +
    `}` +
  `}]}));`;

// When a navigate request is offline AND not yet in the "pages" cache,
// fall back to the precached root "/" so the app shell still loads.
const navigateRoute = `e.registerRoute(` +
  `({request:r})=>"navigate"===r.mode,` +
  `new e.NetworkFirst({cacheName:"pages",networkTimeoutSeconds:3,` +
  `plugins:[{handlerDidError:async()=>` +
  `(await caches.match("/profile",{ignoreSearch:true}))` +
  `||(await caches.match("/",{ignoreSearch:true}))` +
  `||Response.error()}]}));`;

// Insert the new route just before the closing of the define() callback.
// The generated file always ends with ...,"GET")});  — we insert before });
// Check specifically for navigate route that includes the cache fallback.
const hasNavigateWithFallback = patched.includes('"navigate"===r.mode') &&
  patched.includes('caches.match("/",{ignoreSearch:true})');

if (!hasNavigateWithFallback) {
  if (patched.includes('"navigate"===r.mode')) {
    // Old navigate route exists but lacks handlerDidError — replace it.
    patched = patched.replace(
      /e\.registerRoute\(\(\{request:r\}\)=>"navigate"===r\.mode,[^;]+\);/,
      navigateRoute,
    );
    console.log('patch-sw: ✅ replaced navigate route with handlerDidError fallback');
  } else {
    // No navigate route at all — inject at the end.
    patched = patched.replace(/\}\);(\s*)$/, `,${navigateRoute}});$1`);
    console.log('patch-sw: ✅ injected NetworkFirst navigate route into public/sw.js');
  }
} else {
  console.log('patch-sw: navigate route with fallback already present, skipping.');
}

// RSC payload route — inject before the navigate route so it takes priority.
// NOTE: check for the route matcher specifically, NOT just "rsc-payloads" —
// the install handler also references that cache name, which would cause a
// false positive and skip injecting the actual registerRoute call.
const hasRscRoute = patched.includes('searchParams.has("_rsc")');
if (!hasRscRoute) {
  // Insert just before the navigate route (or before closing }); if no navigate).
  if (patched.includes('"navigate"===r.mode')) {
    patched = patched.replace(
      /e\.registerRoute\(\(\{request:r\}\)=>"navigate"===r\.mode/,
      `${rscRoute}e.registerRoute(({request:r})=>"navigate"===r.mode`,
    );
  } else {
    patched = patched.replace(/\}\);(\s*)$/, `,${rscRoute}});$1`);
  }
  console.log('patch-sw: ✅ injected RSC payload NetworkFirst route into public/sw.js');
} else {
  console.log('patch-sw: RSC payload route already present, skipping.');
}

writeFileSync(swPath, patched);
console.log('patch-sw: ✅ injected _async_to_generator + _ts_generator into public/sw.js');
