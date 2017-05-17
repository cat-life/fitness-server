import Salt from 'koa-salt';

import render from './extensions/render';
import podata from './extensions/podata';

export default class Controller extends Salt.Controller {
    render(dir) {
        render.apply(this.ctx, arguments);
    }

    podata(query) {
        podata.apply(this.ctx, arguments);
    }
}
