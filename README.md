
# Popin
![version](https://img.shields.io/github/manifest-json/v/Natjo/popin)

Accessible inline popin 
Set **id**  in `aria-controls` button.  
Set `aria-labelledby` and `aria-describedby` for **title** and **description** if needed.  

## Parameters
| Keys | Type | Description |
| ------ | ------ | ------ |
| btn_open | HTMLElement | btn that expand the popin |
| onopen | function | fire after popin opend |
| onclose | function  | fire after popin closed |


## Usage

### html
```html
<button class="hasPopin" aria-haspopup="dialog" aria-expanded="false" aria-controls="myPopin" aria-label>open</button>
<div class="popin" id="myPopin" role="dialog" aria-modal="true" aria-hidden="true">
	<div class="box">
		<button class="btn-close" aria-label="Close popin">X</button>
		<div>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
			Omnis ad nostrum beatae id harum aspernatur in,<br>
			<a href="">nam voluptatibus</a> quo veniam dicta ullam nihil, hic accusantium soluta tenetur sapiente?
		</div>
	</div>
</div>
```

## javascript


```javascript
import Popin from './modules/popin/popin';
for(let btn of document.querySelectorAll(".hasPopin")){
	Popin(btn, {
		onopen(){},
		onclose(){}
	})
}
```

## Demo
[See codepen demo](https://codepen.io/natjo/pen/LYzRKqJ?editors=1010)
<br>

<div>
With dialog box and polyfill
</div>
<a href="https://codepen.io/natjo/pen/JjMmNVN" target="_blank">with dialog</a>