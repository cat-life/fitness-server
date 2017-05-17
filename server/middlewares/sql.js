import db from '../db/index';

export default function(app, config) {
    console.log('---------- Extensions: sql ----------');
    db();
}
