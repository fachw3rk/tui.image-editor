/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Add a shape
 */
import commandFactory from '../factory/command';
import Promise from 'core-js/library/es6/promise';
import consts from '../consts';

const {componentNames, commandNames} = consts;
const {SHAPE} = componentNames;

const command = {
    name: commandNames.ADD_SHAPE,

    /**
     * Add a shape
     * @param {Graphics} graphics - Graphics instance
     * @param {string} type - Shape type (ex: 'rect', 'ellipse', 'triangle')
     * @param {Object} options - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'ellipse', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'ellipse', this options can use)
     *      @param {number} [options.left] - Shape x position
     *      @param {number} [options.top] - Shape y position
     *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     * @returns {Promise}
     */
    execute(graphics, type, options) {
        const shapeComp = graphics.getComponent(SHAPE);

        return shapeComp.add(type, options).then(objectProps => {
            this.undoData.object = graphics.getObject(objectProps.id);

            return objectProps;
        });
    },
    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo(graphics) {
        graphics.remove(this.undoData.object);

        return Promise.resolve();
    }
};

commandFactory.register(command);

module.exports = command;
