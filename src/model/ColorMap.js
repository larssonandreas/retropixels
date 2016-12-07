/* jshint esversion: 6 */
/**
 * Maps x, y coordinates to a pixel value.
 * The map has a certain resolution specifying the size of an area of the same color.
 * @param {PixelImage} pixelImage - Image to extract the color map from.
 * @param {number} width - Width of the map in pixels
 * @param {number} height - Height of the map in pixels
 * @param {number} [resX] - Number of horizontal pixels in color areas.
 * @param {number} [resY] - Number of vertical pixels in color areas.
 *
 * A color is an index into a palette. A pixel is a set of RGBA values.
 */

// http://stackoverflow.com/questions/8580540/javascript-calling-private-method-from-prototype-method

class ColorMap {

    constructor(widthVal, heightVal, resXVal, resYVal) {
        this.colors = [];
        this.width = widthVal;
        this.height = heightVal;
        this.resX = resXVal !== undefined ? resXVal : widthVal;
        this.resY = resYVal !== undefined ? resYVal : heightVal;
    }

    /**
     * Is a coordinate in range?
     */
    isInRange(x, y) {
        return (x >= 0 && x < this.width && y >= 0 && y < this.height);
    }

    /**
     * Map an image x coordinate to a map x coordinate.
     */
    mapX(x) {
        return Math.floor(x / this.resX);
    }

    /**
     * Map an image y coordinate to a map y coordinate.
     */
    mapY(y) {
        return Math.floor(y / this.resY);
    }

    /**
     * Set an area to a certain color.
     * TODO: rename to put
     */
    add(x, y, color) {
        if (!this.isInRange(x, y)) {
            return;
        }

        let rx = this.mapX(x);

        // add it to the color map
        if (this.colors[rx] === undefined) {
            this.colors[rx] = [];
        }
        this.colors[rx][this.mapY(y)] = color;
    }

    /**
     * Get the palette index at x, y coordinate.
     * TODO: rename to getIndex
     */
    getColor(x, y) {
        let mX = this.mapX(x),
            mY = this.mapY(y);

        if (this.colors[mX] !== undefined) {
            return this.colors[mX][mY];
        }
        return undefined;
    }

    subtract(colorMap) {
        for (let x = 0; x < this.width; x += this.resX) {
            for (let y = 0; y < this.height; y += this.resY) {
                if (this.getColor(x, y) === colorMap.getColor(x, y)) {
                    this.add(x, y, undefined);
                }
            }
        }
    }
}
module.exports = ColorMap;