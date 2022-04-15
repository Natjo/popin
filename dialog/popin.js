function Popin(btn_open, params = {}) {
    const popin = document.getElementById(btn_open.getAttribute('aria-controls'));
    const btn_close = document.querySelector('.btn-close');
    const box = popin.querySelector('.box');
    const clicktouch = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    const clickOut = (e) => {
        if (!box.contains(e.target) && !btn_open.contains(e.target)) close();
    };

    const trap = {
        init: true,
        index: 0,
        els: [],
        shifted: false,
        keyup(e) {
            e.key === 'Escape' && close();
            if (e.key === 'Shift') trap.shifted = false;
        },
        keydown(e) {
            if (e.key === 'Shift') trap.shifted = true;
            if (e.key === 'Tab') {
                e.preventDefault();
                trap.shifted ? trap.index-- : trap.index++;
                if (trap.index < 0) trap.index = trap.els.length - 1;
                if (trap.index >= trap.els.length) trap.index = 0;
                trap.els[trap.index].focus();
            }
        },
        init() {
            trap.index = 0;
            popin
                .querySelectorAll('button,a,input,summary')
                .forEach((el, i) => {
                    el.tabIndex !== null && el.tabIndex >= 0 && trap.els.push(el);
                    el.addEventListener('focus', () => {
                        trap.index = i;
                    });
                });
            trap.init = false;
        },
        start() {
            if (trap.init) trap.init();
            trap.els[0].focus();
            document.addEventListener('keydown', trap.keydown, false);
            document.addEventListener('keyup', trap.keyup, false);
        },
        stop() {
            document.removeEventListener('keydown', trap.keydown);
            document.removeEventListener('keyup', trap.keyup);
        },
    };

    const open = () => {
        popin.showModal();
		document.body.classList.add('noscroll');
        window.addEventListener(clicktouch, clickOut);
        if (typeof params.onopen === 'function') params.onopen();
        trap.start();
    };

    const close = () => {
        trap.stop();
        popin.classList.add('close');
		document.body.classList.remove('noscroll');
        popin.addEventListener('animationend',() => {
                popin.close();
                popin.classList.remove('close');
                window.removeEventListener(clicktouch, clickOut);
                if (typeof params.onclose === 'function') params.onclose();
            },
            { once: true }
        );
    };

    btn_open.onclick = () => open();
    btn_close.onclick = () => close();
}

export default Popin;