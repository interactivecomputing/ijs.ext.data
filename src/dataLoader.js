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

var fs = require('fs');
var csv = require('csv-parse');


function loadData(path, type, callback) {
  var data = fs.readFileSync(path, { encoding: 'utf8' });
  if (type == 'json') {
    process.nextTick(function() {
      try {
        data = JSON.parse(data);
        callback(null, data);
      }
      catch(e) {
        callback(e);
      }
    });
  }
  else {
    csv(data, {columns: true, trim: true, skip_empty_lines: true, auto_parse: true}, callback);
  }
}


module.exports = {
  load: loadData
};
