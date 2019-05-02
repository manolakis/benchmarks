/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {appData, renderApp} from './elements/shack-app.js';

(async function() {
  appData.categories = {
    'mens_outerwear': {
      title: 'Men\'s Outerwear',
    },
    'ladies_outerwear': {
      title: 'Ladies Outerwear',
    },
    'mens_tshirts': {
      title: 'Men\'s T-Shirts',
    },
    'ladies_tshirts': {
      title: 'Ladies T-Shirts',
    },
  };

  const promises = [];
  for (const c in appData.categories) {
    promises.push((async () => {
      const resp = await fetch(`./${c}.json`);
      appData.categories[c].items = await resp.json();
      appData.categories[c].slug = c;
    })());
  }
  await Promise.all(promises);

  renderApp();
})();
