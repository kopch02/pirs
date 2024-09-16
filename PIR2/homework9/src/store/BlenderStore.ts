import { makeAutoObservable } from 'mobx';

class BlenderStore {
    color1: string  = '';
    color2: string  = '';

    constructor() {
        makeAutoObservable(this);
    }

    setColor1(color: string) {
        this.color1 = color;
    }

    setColor2(color: string) {
        this.color2 = color;
    }

    resetColors() {
        this.color1 = '';
        this.color2 = '';
    }

    get blendedColor() {
        if (this.color1 && this.color2) {
            return `Смешанный цвет: ${this.color1} и ${this.color2}`;
        }
        return 'Цвета не выбраны или неполные.';
    }
}

export default new BlenderStore();
