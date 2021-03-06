![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Image comparison slider

Simple web component that takes an original image src and a modified image src and creates a comparison component between the two images complete with a draggable slider.

Currently you the slider is only horizontal and you can only set the color of the draggable handle element via `divider-color` on the element.
The component is an MVP for use at my office.

Further development will happen once i get the time!


## Using the web component on your own site

You can include the component via script tag or node_modules as described below.

### Script tag

Put this script tag (`<script src="https://unpkg.com/ptx-image-comparison@2.0.0/dist/ptx-image-comparison.js"></script>`) in the head of your index.html file.
Then you can use the element anywhere in your template, JSX, html etc.

### Node modules

1. Run `npm install ptx-image-comparison --save`
2. Put a script tag similar to this (`<script src="node_modules/ptx-image-comparison/dist/ptx-image-comparison.js"></script>`) into the head of your index.html
3. Use the element anywhere in your template, JSX, html etc.

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).

## Usage

Preview

![Preview](https://media.giphy.com/media/2w4NSDd4GGmjR6K2RX/giphy.gif)

```html
<ptx-image-comparison original="path/to/original-image.png" modified="path/to/modified-image.png" divider-color="#000"></ptx-image-comparison>
```

## Change color of the divider & handle

You can change the color of the slider handle and the arrows using the `divider-color` attribute on the element.
