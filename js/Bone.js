class Bone {
    constructor(x, y, whole, broken_left, broken_right) {
        this.x = x;
        this.y = y;
        this._whole = whole;
        this._broken_left = broken_left;
        this._broken_right = broken_right;
    }

    show(state) {
        clear();
        if (state == 0) {
            image(this._whole, this.x, this.y);
        }
        if (state == 1) {
            image(this._broken_left, this.x, this.y);
        }
        if (state == 2) {
            image(this._broken_right, this.x, this.y);
        }
    }
}