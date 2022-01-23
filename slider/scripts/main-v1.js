class Slider {
    constructor(id, cycle = 3000) {
        this.container = document.getElementById(id);
        this.items = this.container.querySelectorAll(
            ".slider-list__item, .slider-list__item--selected"
        );
        this.cycle = cycle;

        const controller = this.container.querySelector(".slider-list__control");
        if (controller) {
            const buttons = controller.querySelectorAll(
                ".slider-list__control-buttons,.slider-list__control-buttons--selected"
            );
            //* When mouse is over, stop the slider.
            controller.addEventListener("mouseover", (evt) => {
                const idx = Array.from(buttons).indexOf(evt.target);
                if (idx >= 0) {
                    this.slideTo(idx);
                    this.stop();
                }
            });
            //*When mouse is out, continue the slider.
            controller.addEventListener("mouseout", (evt) => {
                this.start;
            });
            //*Register the event listener, set the picture and pointer selected.
            this.container.addEventListener("slide", (evt) => {
                const idx = evt.detail.index;
                const selected = controller.querySelector(
                    ".slider-list__control-buttons--selected"
                );
                if (selected) selected.className = "slider-list__control-buttons";
                buttons[idx].className = "slider-list__control-buttons--selected";
            });
        }

        const previous = this.container.querySelector(".slider-list__previous");
        if (previous) {
            //*If the left is clicked, slide  to the previous.
            previous.addEventListener("click", (evt) => {
                this.stop();
                this.slidePrevious();
                this.start();
                evt.preventDefault();
            });
        }
        const next = this.container.querySelector(".slider-list__next");
        if (next) {
            //*If the right is clicked, slide to the next.
            next.addEventListener("click", (evt) => {
                this.stop();
                this.slideNext();
                this.start();
                evt.preventDefault();
            });
        }
    }

    //*Get the elements form picture.
    getSelectedItem() {
        let selected = this.container.querySelector(".slider-list__item--selected"); //?Difference between 'let' and 'const'
        return selected;
    }

    //*Select the index from picture.
    getSelectedItemIndex() {
        return Array.from(this.items).indexOf(this.getSelectedItem());
    }

    //*Slide to the picture with the selected index.
    slideTo(idx) {
            let selected = this.getSelectedItem();
            if (selected) {
                //?Switch selected before to normal.
                selected.className = "slider-list__item";
            }
            let item = this.items[idx];
            if (item) {
                //?Switch selected now to selected.
                item.className = "slider-list__item--selected";
            }
            const detail = { index: idx };
            const event = new CustomEvent("slide", { bubbles: true, detail });
            this.container.dispatchEvent(event);
        }
        //*Slide to the picture to be selected next.
    slideNext() {
            let currentIdx = this.getSelectedItemIndex();
            let nextIdx = (currentIdx + 1) % this.items.length;
            this.slideTo(nextIdx);
        }
        //*Slide to the picture having been selected last.
    slidePrevious() {
        let currentIdx = this.getSelectedItemIndex();
        let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
        this.slideTo(previousIdx);
    }

    //*Start the cycle.
    start() {
            this.stop();
            this._timer = setInterval(() => this.slideNext(), this.cycle);
        }
        //*Stop the cycle.
    stop() {
        clearInterval(this._timer);
    }
}
const slider = new Slider("my-slider");
slider.start();