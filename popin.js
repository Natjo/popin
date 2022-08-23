/**
 * @description 
 * Accessible popin
 *
 * @param {HTMLElement} btn_open trigger for popin
 * @param {function} params.onopen fire after popin opend
 * @param {function} params.onclose fire after popin closed
 * 
*/

function Popin(btn_open, params = {}) {
	const popin = document.getElementById(btn_open.getAttribute('aria-controls'));
	const box = popin.querySelector('.box');
	const btn_close = popin.querySelector('.btn-close');
	const items = popin.querySelectorAll('button,a,input');
	const lastItem = items[items.length - 1]
	const firstItem = items[0]
	let isShifted = false;
	let isLastItem = false;
	let isFirstItem = false;

	const clicktouch = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
	const clickOut = (e) => {
		if (!box.contains(e.target) && !btn_open.contains(e.target)) close();
	};

	const keyup = (e) => {
        e.key === 'Escape' && close();
        if (e.key === 'Shift') {
            isShifted = false;
        }
        if (isLastItem) {
            firstItem.focus();
            isLastItem = false;
        }
        if (isFirstItem) {
            lastItem.focus();
            isFirstItem = false;
        }
	};
	
	const ontab = () => {
		if (document.activeElement === lastItem && !isShifted) {
			isLastItem = true;
		}
		if (document.activeElement === firstItem && isShifted) {
			isFirstItem = true;
		}
	}

	const keydown = (e) => {
        if (e.key === 'Shift') {
            isShifted = true;
        }
        e.key === 'Tab' && ontab();

		if (isLastItem || isFirstItem) {
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
        }
	};

	const open = () => {
		popin.setAttribute('aria-hidden', false);
		btn_open.setAttribute('aria-expanded', true);
		document.addEventListener('keydown', keydown, false);
		document.addEventListener('keyup', keyup, false);
		window.addEventListener(clicktouch, clickOut);
		if (typeof params.onopen === 'function') params.onopen();
		firstItem.focus();
	};

	const close = () => {
		popin.classList.add('close');
		popin.addEventListener('animationend', () => {
			popin.classList.remove('close');
			popin.setAttribute('aria-hidden', true);
			btn_open.setAttribute('aria-expanded', false);
			document.removeEventListener('keydown', keydown);
			document.removeEventListener('keyup', keyup);
			window.removeEventListener(clicktouch, clickOut);
			if (typeof params.onclose === 'function') params.onclose();
			btn_open.focus();
		}, {once:true});
	};
	
	btn_open.addEventListener('click', open);
	btn_close.addEventListener('click', close);
}




export default Popin;
