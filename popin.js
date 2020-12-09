/**
 * @param content - will be insert into box popin
 * @param type - window(default) / page
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
	
	const escape = event => event.key === 'Escape' && close();
	
	var focusableIndex = 0; 
	const focusables = [];
	el.querySelectorAll('button,a').forEach(el => focusables.push(el));
 
 	const trapFocus = e => {
        if(e.key === 'Tab') {
           	if(e.preventDefault) e.preventDefault();
           	else e.returnValue = false;
			  	focusableIndex ++;
			  	if(focusableIndex >= focusables.length) focusableIndex = 0;
				focusables[focusableIndex].focus();
        }
    }

	const close = () => {
		window.removeEventListener(clicktouch, clickOut);
		el.classList.add('close');
		el.style.overflow = 'hidden';
		document.body.classList.remove('hasPopin');
		document.removeEventListener('keydown', trapFocus, false);
		document.removeEventListener('keyup', escape);
		el.addEventListener('animationend', e => {
			el.remove();
			exec(params.afterClose);
			params.btn.focus();
		}, {once: true});
		exec(params.beforeClose);
	}
	
	btn_close.onclick = () => close();
	
	btn_close.focus();
	
	el.addEventListener('animationend', () => {
		exec(params.afterOpen);
		window.addEventListener(clicktouch, clickOut);
	}, {once: true});
	
	exec(params.beforeOpen);
	
	document.addEventListener('keydown', trapFocus, false);
	document.addEventListener('keyup', escape);
}

export default Popin;