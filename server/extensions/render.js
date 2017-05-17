import fs from 'fs';
import _ from 'lodash';
import config from 'config';
import path from 'path';

let tmpl = _.template(fs.readFileSync(path.join(config.path.views, 'index.html')));

export default function render(param) {
    param.csrf = this.csrf;
    this.body = tmpl(param);
}
