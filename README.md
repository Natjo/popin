
# Popin

![version](https://img.shields.io/github/manifest-json/v/Natjo/popin "vesrion") [https://github.com/Natjo/popin](https://github.com/Natjo/popin)

Light accessible popin modules

- window
    - content is inserted into `.box`, height is set and scrolling is `inside` box
- page
    - content is inserted into `.box`, height is free and scrolling is `outside` box
- media
    - lorem ipsum dolores


## Parameters
| Parameter | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| btn | HTMLElement | - | btn element |
| content | string | - | html to add inside th popin |
| type | media, window, page | window | btn element |

## Methods & Properties
| Methods | Description |
| ------ | ------ |
| myPopin.close | -- |


## Events
| Name | Arguments | Description |
| ------ | ------ | ------ |
| afterOpen | - | fire after popin opened |
| beforeOpen | -  | fire before popin opened |
| afterClose | - | fire after popin closed |
| beforeClose | - | fire before popin closed |




## Usage

### html
```html
<button type="button" class="btn-image">See</button>
<template>
	<h1>Lorem</h1>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laudantium nobis repellat facilis voluptatum alias, tempore expedita corrupti iure quae vitae ea, aspernatur quidem placeat labore voluptas reprehenderit tenetur ullam fuga adipisci facere quo molestias!</p>
</template>
```
### javascript
```javascript
import Popin from './modules/popin/popin';
const btn = document.querySelector('.btn-image');
Popin({
	btn: btn.target,
	content: btn.target.nextElementSibling.innerHTML,
	type: 'media'
});
```
## demo

[codepen](https://codepen.io)
