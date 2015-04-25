// Copyright 2015 Interactive Computing project (https://github.com/interactivecomputing).
// All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
// except in compliance with the License. You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the
// License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific language governing permissions
// and limitations under the License.
//
// index.js
// The ijs extension implementation.
//

var util = require('util');
var commands = require('./commands');

var REQUIRE_CONFIG = {
  paths: {
    crossfilter: '//cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.11/crossfilter.min',
    dc: '//cdnjs.cloudflare.com/ajax/libs/dc/1.7.3/dc.min'
  },
  shim: {
    crossfilter: {
      deps: [],
      exports: 'crossfilter'
    }
  }
};

function initialize(shell, callback) {
  shell.registerCommand('dataset', commands.dataset);

  // The result of loading the extension is a small bit of client-side script.

  // In particular this script adds requirejs config to be able to load
  // the crossfilter and dcjs on the client.

  var script = util.format('require.config(%s);', JSON.stringify(REQUIRE_CONFIG));

  process.nextTick(function() {
    callback(null, shell.runtime.data.script(script));
  });
}

module.exports = {
  initialize: initialize
};
