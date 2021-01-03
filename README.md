
# Popin
![version](https://img.shields.io/github/manifest-json/v/Natjo/popin)

Accessible popin for content and medias,with 3 differents types of displaying: `window`, `page` and `media`, see below.  

### Inline
If popin is in **DOM**, set **id**  in `aria-controls` button.  
Set `aria-labelledby` and `aria-describedby` for **title** and **description** is needed.  

### Dynamic
Set **htmlString** in `content` parameter
Set **htmlString** in `content` and `type` parameters. 
Default type value is `window`.

## Parameters
| Keys | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| id | string | - | id of the inline popin (DOM) |
| content | htmlString | - | Dynamic content |
| type | string | <small>window</small> | window<small>(default)</small> \| page \| media |
| afterOpen | function | - | fire after popin opened |
| beforeOpen | function  | - | fire before popin opened |
| afterClose | function | - | fire after popin closed |
| beforeClose | function | - | fire before popin closed |

## Methods
| Methods | Description |
| ------ | ------ |
| myPopin.close() | To close dynamically the popin |

## Usage

### type Window
For small content in a `.box` with **fixed max-height** and **fixed max-width**.  
> Add `.window` to the popin.  

```html
<button type="button" aria-haspopup="dialog" aria-controls="dialog-1">open</button>
<div id="dialog-1" class="popin window"
    role="dialog" 
    aria-labelledby="dialog-1-title" 
    aria-describedby="dialog-1-desc"
    aria-modal="true"
    aria-hidden="true"
    tabindex="-1" >
	<button class="btn-close" type="button"></button>
	<div class="box">
		<h1 id="dialog-1-title">Lorem</h1>
		<p id="dialog-1-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	</div>
</div>
```

### type Page
For big content in a `.box` with **fixed max-width** and **free height**.  
> Add `.page` to the popin. 

```html
<button type="button" aria-haspopup="dialog" aria-controls="dialog-2">open</button>
	<div id="dialog-2" class="popin page"
    role="dialog" 
    aria-labelledby="dialog-2-title" 
    aria-describedby="dialog-2-desc"
    aria-modal="true"
    aria-hidden="true"
    tabindex="-1" >
	<button class="btn-close" type="button" aria-label="Close"></button>
	<div class="box">
		<h1 id="dialog-2-title">Lorem</h1>
		<div class="rte" id="dialog-2-desc">
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laudantium nobis repellat facilis voluptatum alias, tempore expedita corrupti iure quae vitae ea, aspernatur quidem placeat labore voluptas reprehenderit tenetur ullam fuga adipisci facere quo molestias! Officia, repellat. Eius odio voluptatem soluta nemo animi? At nemo odio, tenetur in sequi voluptate neque reprehenderit alias voluptatibus? Nemo quaerat dolores voluptate magnam reprehenderit ad nostrum modi necessitatibus expedita est molestiae obcaecati nulla quibusdam placeat amet soluta voluptates, impedit hic? Eaque, quia itaque! Dignissimos reiciendis quidem, enim explicabo esse consequuntur repellendus maiores unde, officia id non iure est ex harum? Necessitatibus itaque debitis corporis.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laudantium nobis repellat facilis voluptatum alias, tempore expedita corrupti iure quae vitae ea, aspernatur quidem placeat labore voluptas reprehenderit tenetur ullam fuga adipisci facere quo molestias! Officia, repellat. Eius odio voluptatem soluta nemo animi? At nemo odio, tenetur in sequi voluptate neque reprehenderit alias voluptatibus? Nemo quaerat dolores voluptate magnam reprehenderit ad nostrum modi necessitatibus expedita est molestiae obcaecati nulla quibusdam placeat amet soluta voluptates, impedit hic? Eaque, quia itaque! Dignissimos reiciendis quidem, enim explicabo esse consequuntur repellendus maiores unde, officia id non iure est ex harum? Necessitatibus itaque debitis corporis.
			</p>
		</div>
	</div>
</div>
```

### type Medias
Medias are in `popin`, there is no `box`.
> Add `.media` to the popin.  

#### Image
The image will be resized **homothetically** end centered.

```html
<button type="button" aria-haspopup="dialog" aria-controls="dialog-3">Image</button>
<div id="dialog-3" class="popin media"
	role="dialog"
	aria-modal="true"
	aria-hidden="true"
	tabindex="-1" >
	<button class="btn-close" type="button" aria-label="Close"></button>
	<picture>
		<img src="https://picsum.photos/id/241/800/1400" alt="" loading="lazy" width="800" height="1400">
	</picture>
</div>
```

#### Video
The ratio of the vidéo is `16/9`, you can change it in the css.

```html
<button type="button" aria-haspopup="dialog" aria-controls="dialog-4">Video</button>
<div id="dialog-4" class="popin media"
    role="dialog"
    aria-modal="true"
    aria-hidden="true"
    tabindex="-1" >
	<button class="btn-close" type="button" aria-label="Close"></button>
	<video controls>
		<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"type="video/webm">
	</video>
</div>
```

#### Youtube Iframe
The ratio of the iframe is `16/9`, you can change it in the css.

```html
<button type="button" aria-haspopup="dialog" aria-controls="dialog-5">Iframe</button>
	<div id="dialog-5" class="popin media"
    role="dialog"
    aria-modal="true"
    aria-hidden="true"
    tabindex="-1" >
	<button class="btn-close" type="button" aria-label="Close"></button>
	<iframe width="560" height="315" src="https://www.youtube.com/embed/2oJEw_lTcyI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

## javascript

### DOM content
Just put the id of the popin.
```javascript
const btn_popins = document.querySelectorAll('button[aria-haspopup]');
btn_popins.forEach(btn => btn.onclick = () => 
	Popin({
		id: btn.getAttribute('aria-controls')
	})
);
```

### Dynamic content
We don't need id, because the popin will be created dynamically.  
Put the content in `content`, and set the type. `window` is default.
```javascript
const btn_ajax = document.querySelector('.btn-ajax');
btn_ajax.onclick = btn => {
	Popin({
		type: 'page',
		content: '<h1>hello</h2>'
	});
};
```

## Demo
[See codepen demo](https://codepen.io/natjo/pen/jOqXEmr?editors=0110)
