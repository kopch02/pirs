import { makeAutoObservable } from 'mobx';

class BlenderStore {
    selectedColors: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addColor(color: string) {
        this.selectedColors.push(color);
    }

    resetColors() {
        this.selectedColors = [];
    }
}

export default new BlenderStore();
