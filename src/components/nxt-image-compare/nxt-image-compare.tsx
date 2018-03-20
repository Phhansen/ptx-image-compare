import { Component, Prop, Element, Listen } from '@stencil/core';

@Component({
    tag: 'nxt-image-compare',
    styleUrl: 'nxt-image-compare.css',
    shadow: true
})
export class NxtImageCompare {

    /**
     * Path to original image src
     */
    @Prop() original: string;

    /**
     * Path to modified image src
     */
    @Prop() modified: string;

    // Host element
    @Element() el: HTMLElement;

    /**
     * The draggable handle
     */
    handleElement: HTMLElement;

    /**
     * Resize element container containing the modified image
     */
    resizeElement: HTMLElement;

    /**
     * `<img />` tag for the modified image
     */
    resizeImage: HTMLImageElement;

    /**
     * If touch is used
     */
    isTouched: boolean = false;

    componentDidLoad() {
        this.handleElement = this.el.shadowRoot.querySelector('.divider');
        this.resizeElement = this.el.shadowRoot.querySelector('.resize');
        this.resizeImage = this.el.shadowRoot.querySelector('.img__modified');

        // Set initial image width
        this.resizeImage.width = this.el.clientWidth;

        // Setup eventlisteners and initialize the comparison slider
        this.init();
    }

    componentDidUnload() {
        // Remove event listeners in here
        document.removeEventListener('touchmove', this.scrollBlock, false);
    }

    @Listen("window:touchstart")
    touch() {
        this.isTouched = true;
    }

    /**
     * We hook up to the window resize event in order to adjust the size of the modified image
     */
    @Listen("window:resize")
    resize() {
        this.resizeImage.width = this.el.clientWidth;
    }

    private getPageX(e) {
        if (e.pageX || e.targetTouches[0].pageX) {
            return e.pageX || e.targetTouches[0].pageX;
        } else if (typeof e.originalEvent !== 'undefined') {
            return e.originalEvent.targetTouches[0].pageX;
        } else {
            return false;
        }
    }

    private scrollBlock(e) {
        e.preventDefault();
    }

    private unbindScrollBlock() {
        document.removeEventListener('touchmove', this.scrollBlock);
    }

    init() {
        let moveWidth = "0%";

        let initSlide = event => {
            this.handleElement.classList.add("draggable");
            this.resizeElement.classList.add("resizable");

            // Get the initial X position value
            let startX = this.getPageX(event);
            // Width of the handle
            let handleWidth = this.handleElement.offsetWidth;
            let posX = this.handleElement.offsetLeft + handleWidth - startX;
            let containerOffset = this.el.offsetLeft;
            let containerWidth = this.el.offsetWidth;
            let minLeft = containerOffset + 1;
            let maxLeft = containerOffset + containerWidth - 1;

            let moveSlider = (event: Event) => {
                !this.isTouched && event.preventDefault(); // Prevent selecting the images
                let pageX = this.getPageX(event);

                if (pageX !== false) {
                    console.log('handleWidth', handleWidth);
                    let leftValue = pageX + posX - handleWidth;

                    if (pageX < minLeft) {
                        leftValue = 1;
                    } else if (pageX > maxLeft) {
                        leftValue = containerWidth - 1;
                    }

                    moveWidth = (leftValue + handleWidth / 2) * 100 / this.el.offsetWidth + '%';
                    this.handleElement.style.left = moveWidth;
                    this.resizeElement.style.width = moveWidth;
                }
            }

            document.addEventListener('touchmove', this.scrollBlock, false);
            document.addEventListener("mousemove", moveSlider);

            // Bind events to container
            document.addEventListener("mouseup", () => {
                this.handleElement.classList.remove("draggable");
                this.resizeElement.classList.remove("resizable");

                document.removeEventListener("mousemove", moveSlider);
            });
        }


        // Bind events to handle
        this.handleElement.addEventListener("mousedown", initSlide);
        document.addEventListener("touchend", this.unbindScrollBlock);
    }

    /**
     * Render component contents
     */
    render() {
        return [
            <img class="img img__original" src={this.original} />,
            <div class="resize">
                <img class="img img__modified" src={this.modified} />
            </div>,
            <div class="divider">
                <span class="left-arrow"></span>
                <span class="right-arrow"></span>
            </div>,
        ]
    }
}
