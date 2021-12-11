
# Popin
![version](https://codepen.io/natjo/pen/LYzRKqJ?editors=0110)

Accessible popin 


## Parameters
| Keys | Type  | Description |
| ------ | ------ | ------ | ------ |
| btn_open | HTMLElement | id of the inline popin (DOM) |
| onopen | function  | fired when opening popin |
| onopen | function  | fired when closing popin |


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
	Popin(btn)
}
```

## css
```css
.popin{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: none;
	background: rgba(0,0,0,.8);
	place-items: center;
	padding: 40px;
	box-sizing: border-box;
	
	.box{
		background: #fff;
		padding: 30px 20px 20px;
		box-sizing: border-box;
	}
	
	.btn-close{
		float: right;
		margin-top: -25px;
		margin-right: -15px;
	}
	
	&[aria-hidden="false"]{
		display: grid;
	}
}
```

## Demo
[See codepen demo](https://codepen.io/natjo/pen/jOqXEmr?editors=0110)
