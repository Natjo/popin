/**
 * @description 
 * Accessible popin with 3 types of displaying content
 *
 * @param {Object} params
 * @param {string} params.id - id of the popin
 * @param {string} params.content - insert dynamically content
 * @param {string} params.type - set type of dynamic popin window(default)/page/media
 * @param {function} params.beforeOpen
 * @param {function} params.afterOpen
 * @param {function} params.beforeClose
 * @param {function} params.afterClose
*/

function Popin(params) {
	let el;
	if(params.id){	
		el = document.getElementById(params.id);
	}else{
		el = document.createElement('div');
		el.setAttribute('role', 'dialog');
		el.setAttribute('aria-modal', true);
		el.className = `popin${params.type ? ` ${params.type}` : '' }`;
		el.innerHTML = `<button class="btn-close" type="button"></button>
		${params.type !== 'media' ? `<div class="box">${params.content}</div>`: params.content}`
		document.body.appendChild(el);
	}
	const btn_close = el.querySelector('.btn-close');
	const exec = func => typeof func === 'function' && func();
	
	const root = document.documentElement || window;
	const clicktouch = ('ontouchstart' in root) ? "touchstart" : "click";
	const box = el.querySelector('.box,iframe,video,img');
	const clickOut = e => {
		if(!box.contains(e.target) && !btn_close.contains(e.target)) close();
	}
	
	const trap = {
		btn: null,
		index: 0,
		els: [],
		isShifted: false,
		init(){
			trap.btn = document.activeElement;
			trap.els = [];
			el.querySelectorAll('button,a,input').forEach(el => trap.els.push(el));
		},
		keyup(e){
			e.key === 'Escape' && close();
			if(e.key === 'Shift') {
				trap.isShifted = false;
			}
		},
		keydown(e){
			if(e.key === 'Shift') {
				trap.isShifted = true;
			}
        	if(e.key === 'Tab') {
           	if(e.preventDefault) e.preventDefault();
				else e.returnValue = false;
				trap.isShifted ? trap.index -- : trap.index ++;
				if(trap.index < 0) trap.index = trap.els.length-1;
				if(trap.index >= trap.els.length) trap.index = 0;
				trap.els[trap.index].focus();
			}
		},
		start(){
			trap.els[0].focus();
			document.addEventListener('keydown', trap.keydown, false);
			document.addEventListener('keyup', trap.keyup, false);
		},
		stop(){
			trap.btn.focus();
			document.removeEventListener('keydown', trap.keydown);
			document.removeEventListener('keyup', trap.keyup);
		}
	}

	const close = () => {
		window.removeEventListener(clicktouch, clickOut);
		document.body.classList.remove('hasPopin');
		el.classList.add('close');
		trap.stop();
		el.addEventListener('animationend', e => {
			el.classList.remove('close');
			el.setAttribute('aria-hidden', true);
			exec(params.afterClose);
		}, {once: true});
		exec(params.beforeClose);
	}

	btn_close.onclick = () => close();
	
	el.addEventListener('animationend', () => {
		exec(params.afterOpen);
		window.addEventListener(clicktouch, clickOut);
	}, {once: true});
	document.body.classList.add('hasPopin');
	exec(params.beforeOpen);
	el.setAttribute('aria-hidden', false);
	trap.init();
	trap.start();
	
	this.close = () => close();
}



export default Popin;
