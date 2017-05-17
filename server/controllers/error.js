import Controller from '../controller';
import config from 'config';

export default class Component extends Controller {
    *base() {
        let { request } = this.ctx;

        this.render({
            page: 'error'
        });
    }
}
