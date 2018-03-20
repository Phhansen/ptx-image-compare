import { Component, Prop, Element, Listen } from "@stencil/core";

@Component({
  tag: "fit-image-compare",
  styleUrl: "fit-image-compare.css",
  shadow: true
})
export class FitImageCompare {
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

  /**
   * True if passive event listeners are supported by the browser
   */
  passiveSupported = false;

  /**
   * Listen for touchstart in order to prevent imageSelection with mouseMove
   */
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

  componentDidLoad() {
    this.handleElement = this.el.shadowRoot.querySelector(".divider");
    this.resizeElement = this.el.shadowRoot.querySelector(".resize");
    this.resizeImage = this.el.shadowRoot.querySelector(".img__modified");

    // Set initial image width
    this.resizeImage.width = this.el.clientWidth;

    // Setup eventlisteners and initialize the comparison slider
    this.init();
  }

  /**
   * Initialize the slider component
   */
  init() {
    let moveWidth = "0%";

    const initSlide = event => {
      this.handleElement.classList.add("draggable");
      this.resizeElement.classList.add("resizable");

      // Get the initial X position value
      const startX = this.getPageX(event);
      // Width of the handle
      const handleWidth = this.handleElement.offsetWidth;
      const posX = this.handleElement.offsetLeft + handleWidth - startX;
      const containerOffset = this.el.offsetLeft;
      const containerWidth = this.el.offsetWidth;
      const minLeft = containerOffset;
      const maxLeft = containerOffset + containerWidth;

      const moveSlider = (event: Event) => {
        if ( !this.isTouched ) {
          event.preventDefault(); // Prevent selecting the images
        }
        let pageX = this.getPageX(event);

        if (pageX !== false) {
          let leftValue = pageX + posX - handleWidth + 1;

          if (pageX < minLeft) {
            leftValue = -(handleWidth / 2) + 3;
          } else if (pageX > maxLeft) {
            leftValue = containerWidth - handleWidth / 2 + 1;
          }

          moveWidth = (leftValue + handleWidth / 2) * 100 / this.el.offsetWidth + "%";
          this.handleElement.style.left = moveWidth;
          this.resizeElement.style.width = moveWidth;
        }
      };

      document.addEventListener("touchmove", moveSlider);
      document.addEventListener("mousemove", moveSlider);

      document.addEventListener("mouseup", () => {
        this.handleElement.classList.remove("draggable");
        this.resizeElement.classList.remove("resizable");

        document.removeEventListener("mousemove", moveSlider);
      });

      document.addEventListener("touchend", () => {
        this.handleElement.classList.remove("draggable");
        this.resizeElement.classList.remove("resizable");
        document.removeEventListener("touchmove", moveSlider);
      });
    };

    // Bind events to handle
    this.handleElement.addEventListener("mousedown", initSlide);
    this.handleElement.addEventListener("touchstart", initSlide);
  }

  /**
   * Returns X position of the mousemove or touchmove events
   * @param event event
   */
  private getPageX(event) {
    if (event.pageX || event.targetTouches[0].pageX) {
      return event.pageX || event.targetTouches[0].pageX;
    } else if (typeof event.originalEvent !== "undefined") {
      return event.originalEvent.targetTouches[0].pageX;
    } else {
      return false;
    }
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
        <span class="arrow arrow__left" />
        <span class="arrow arrow__right" />
      </div>
    ];
  }
}
