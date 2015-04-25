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
// commands.js
// The commands implemented by the data extension.
//

var fs = require('fs'),
    util = require('util');


// Implements the %%dataset command, that can be used to load a dataset.
function datasetCommand(shell, args, text, evaluationId) {
  var data;
  if (args.type == 'json') {
    data = JSON.parse(fs.readFileSync(args.data, { encoding: 'utf8' }));
  }
  else if (args.type == 'csv') {
    //code
  }

  var datasetScript = util.format('window.%s = crossfilter(%s);', args.name, JSON.stringify(data));

  return shell.runtime.data.html('')
              .addScript(datasetScript)
              .addDependency('crossfilter', 'crossfilter');
}
datasetCommand.options = function(parser) {
  return parser
    .help('Loads the specified data (json or csv).')
    .option('name', {
      full: 'name',
      metavar: 'variable',
      type: 'string',
      required: true,
      help: 'the name of the dataset to produce'
    })
    .option('type', {
      full: 'type',
      metavar: 'type',
      type: 'string',
      choices: [ 'json', 'csv' ],
      default: 'json',
      help: 'the type of data to load (json, csv)'
    })
    .option('data', {
      full: 'data',
      metavar: 'path',
      type: 'string',
      required: true,
      help: 'the path of the dataset to load'
    });
}


module.exports = {
  dataset: datasetCommand
};
