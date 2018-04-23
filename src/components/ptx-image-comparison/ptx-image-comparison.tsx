import { Component, Prop, Element, Listen, State, Watch } from "@stencil/core";

@Component({
  tag: "ptx-image-comparison",
  styleUrl: "ptx-image-comparison.css",
  shadow: true
})
export class FitImageCompare {

  /** Internal state of the divider color, used for re-rendering when color changes */
  @State() color: string;

  /**
   * Path to original image src
   */
  @Prop() original: string;

  /**
   * Path to modified image src
   */
  @Prop() modified: string;


  /** Sets the color of the draggable handle */
  @Prop() dividerColor: string = "#383838";

  // Host element
  @Element() el: HTMLElement;

  /** The draggable handle element */
  handleElement: HTMLElement;

  /** Resize element container containing the modified image */
  resizeElement: HTMLElement;

  /**
   * `<img />` tag for the modified image
   */
  resizeImage: HTMLImageElement;

  /**
   * We hook up to the window resize event in order to adjust the size of the modified image
   */
  @Listen("window:resize")
  resize() {
    this.resizeImage.width = this.el.clientWidth;
  }

  @Watch("dividerColor")
  changeColorHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.color = newValue;
    }
  }

  componentDidLoad() {
    this.handleElement = this.el.shadowRoot.querySelector(".divider");
    this.resizeElement = this.el.shadowRoot.querySelector(".resize");
    this.resizeImage = this.el.shadowRoot.querySelector(".img__modified");

    // Set initial image width
    this.resizeImage.width = this.el.clientWidth;

    // Set initial color
    this.color = this.dividerColor;

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

        // Prevent selecting the image on drag
        event.type === "mousemove" && event.preventDefault();

        let pageX = this.getPageX(event);

        if (pageX !== false) {
          let leftValue = pageX + posX - handleWidth;

          if (pageX < minLeft) {
            leftValue = -(handleWidth / 2) + 1;
          } else if (pageX > maxLeft) {
            leftValue = containerWidth - (handleWidth / 2);
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

  render() {

    const style = {
      backgroundColor: this.color,
      borderColor: this.color
    };

    return [
      <img class="img img__original" src={this.original} />,
      <div class="resize">
        <img class="img img__modified" src={this.modified} />
      </div>,
      <div class="divider" style={style}>
        <span class="arrow arrow__left" />
        <span class="arrow arrow__right" />
      </div>
    ];
  }
}
