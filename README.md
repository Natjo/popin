
# Popin

![version](https://img.shields.io/github/manifest-json/v/Natjo/popin)<br>

<a href="https://github.com/Natjo/popin" target="_blank">https://github.com/Natjo/popin</a>

Light accessible popin modules with 3 differents types:

- window
    - content is inserted into `.box`, height is set and scrolling is `inside` box
- page
    - content is inserted into `.box`, height is free and scrolling is `outside` box
- media
    - img/video/iframe are inserted into `.popin`. heights are homothetic. There's no scroll


## Parameters
| Parameter | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| btn | HTMLElement | - | btn element |
| content | string | - | html to add inside the popin |
| type | media, window, page | window | type of content |

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
	<img src="https://picsum.photos/id/241/800/1400" alt="" loading="lazy" width="800" height="1400">
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

## Usage
[See codepen demo](https://codepen.io/natjo/pen/jOqXEmr?editors=0110)
