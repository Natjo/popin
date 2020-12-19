/**
 * @param content - will be insert into box popin
 * @param type - window(default) / page / media
 * @param closeSelector - btn-close(default)
 * @param beforeOpen
 * @param afterOpen
 * @param beforeClose
 * @param afterClose
*/

const Popin = params => {
	const root = document.documentElement || window;
	const clicktouch = ('ontouchstart' in root) ? "touchstart" : "click";
	const type = params.type || "window";
	const el = document.createElement('div');
	el.setAttribute('role', 'dialog');
	el.setAttribute('aria-modal', true);
	el.className = `popin${type ? ' ' + type : '' }`;
	let box;
	if(type == 'media'){
		el.innerHTML = `
		<button class="btn-close" type="button"></button>
		${params.content}`;
		box = el.querySelector('img, video, iframe');
	} 
	else {
		el.innerHTML = `
		<button class="btn-close" type="button"></button>
		<div class="box">${params.content}</div>`;
		box = el.querySelector('.box');
	}
	document.body.appendChild(el);
	
	const btn_close = el.querySelector('.btn-close');

	document.body.classList.add('hasPopin');

	const exec = func => typeof func === 'function' && func();
	
	const clickOut = e => {
		if(!box.contains(e.target) && !btn_close.contains(e.target)) close();
	}
	
	const trap = {
		index: 0,
		els: [],
		isShifted: false,
		init(){
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
		add(){
			btn_close.focus();
			document.addEventListener('keydown', trap.keydown, false);
			document.addEventListener('keyup', trap.keyup, false);
		},
		remove(){
			document.removeEventListener('keydown', trap.keydown);
			document.removeEventListener('keyup', trap.keyup);
		}
	}

	const activeEl = document.activeElement;

	const close = () => {
		window.removeEventListener(clicktouch, clickOut);
		el.classList.add('close');
		el.style.overflow = 'hidden';
		document.body.classList.remove('hasPopin');
		trap.remove();
		el.addEventListener('animationend', e => {
			el.remove();
			exec(params.afterClose);
			if(activeEl.type === 'button') activeEl.focus();
		}, {once: true});
		exec(params.beforeClose);
	}
	
	btn_close.onclick = () => close();
	
	el.addEventListener('animationend', () => {
		exec(params.afterOpen);
		window.addEventListener(clicktouch, clickOut);
	}, {once: true});
	
	exec(params.beforeOpen);
	
	trap.init();
	trap.add();
}
