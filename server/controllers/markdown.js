import Controller from '../controller';
import config from 'config';
import path from 'path';
import fs from 'fs';
import marked from 'marked';

export default class Main extends Controller {
    *common(name) {
        let fileName = path.resolve(config.path.markdown, name + '.md');
        let file = fs.existsSync(fileName) ? fs.readFileSync(fileName, 'utf8') : '';
 
        this.podata({
          data: marked(file)
        });
    }
}
