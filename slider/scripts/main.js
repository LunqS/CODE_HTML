class Slider {
    constructor(id) {
        this.container = document.getElementById(id);
        this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    }

    //*Get the elements form picture.
    getSelectedItem() {
        const selected = this.container.querySelector('.slider-list__item--selected');
        return selected;
    }

    //*Select the index from picture.
    getSelectedItemIndex() {
        return Array.from(this.items).indexOf(this.getSelectedItem());
    }

    //*Slide to the picture with the selected index.
    slideTo(idx) {
            const selected = this.getSelectedItem();
            if (selected) {
                //?Switch selected before to normal.
                selected.className = 'slider-list__item';
            }
            const item = this.items[idx];
            if (item) {
                //?Switch selected now to selected.
                item.className = 'slider-list__item--selected';
            }
        }
        //*Slide to the picture to be selected next.
    slideNext() {
            const currentIdx = this.getSelectedItemIndex();
            const nextIdx = (currentIdx + 1) % this.items.length;
            this.slideTo(nextIdx);
        }
        //*Slide to the picture having been selected last.
    slidePrevious() {
        const currentIdx = this.getSelectedItemIndex();
        const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
        this.slideTo(previousIdx);
    }
}
const slider = new Slider('my-slider');
setInterval(() => {
    slider.slideNext();
}, 1000);