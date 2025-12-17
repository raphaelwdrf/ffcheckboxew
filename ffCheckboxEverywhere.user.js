// ==UserScript==
// @name        Fast Farming Checkbox Everywhere
// @namespace   https://github.com/raphaelwdrf/ffcheckboxew
// @description Adds checkbox everywhere on Fast-farming site.
// @version     1.0
// @updateURL   https://raw.githubusercontent.com/raphaelwdrf/ffcheckboxew/refs/heads/main/ffCheckBoxEverywhere.user.js
// @downloadURL https://raw.githubusercontent.com/raphaelwdrf/ffcheckboxew/refs/heads/main/ffCheckBoxEverywhere.user.js
// @supportURL  https://github.com/raphaelwdrf/ffcheckboxew/issues
// @match       https://fast.farming-community.eu/*
// @grant       GM_getValue
// @grant       GM_setValue
// @license     MIT
// ==/UserScript==

(function () {
    'use strict';

    const STORAGE_KEY = 'fast_aggrid_checklist_name';

    function loadState() {
        return GM_getValue(STORAGE_KEY, {});
    }

    function saveState(state) {
        GM_setValue(STORAGE_KEY, state);
    }

    function injectCheckboxes() {
        const state = loadState();

        document
            .querySelectorAll('.ag-cell[col-id="Name"] .ag-cell-wrapper')
            .forEach(wrapper => {

                if (wrapper.querySelector('.ff-checkbox')) return;

                const cell = wrapper.querySelector('.ag-cell-value');
                if (!cell) return;

                const name = cell.textContent.trim();
                if (!name) return;

                const pageKey = location.pathname; // current page URL
                if (!pageKey) return;

                const nameKey = `${name}||${pageKey}`;
                if (!nameKey) return;

                const row = wrapper.closest('.ag-row');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'ff-checkbox';
                checkbox.checked = !!state[nameKey];

                checkbox.style.marginRight = '6px';
                checkbox.style.cursor = 'pointer';

                // Restore visual state
                if (row && checkbox.checked) {
                    row.style.opacity = '0.5';
                    row.style.backgroundColor = 'rgba(0, 200, 0, 0.25)';
                }

                checkbox.addEventListener('change', () => {
                    state[nameKey] = checkbox.checked;
                    saveState(state);

                    if (row) {
                        row.style.opacity = checkbox.checked ? '0.5' : '';
                        row.style.backgroundColor = checkbox.checked ? 'rgba(0, 200, 0, 0.25)' : '';
                    }
                });

                wrapper.prepend(checkbox);
            });
    }

    const observer = new MutationObserver(injectCheckboxes);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Reset checklist page
    function addResetButtonPage() {

        const btn = document.createElement('button');
        btn.textContent = '🗑';

        btn.style.background = '#ca8a04';

        btn.style.position = 'fixed';
        btn.style.bottom = '50px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';

        btn.ondblclick = () => {
            if (!confirm(
                'This will uncheck all items on this page only.\n' +
                'This action cannot be undone.\n' +
                'Continue?'
            )) return;

            const state = GM_getValue(STORAGE_KEY, {});
            const pageKey = location.pathname;

            Object.keys(state).forEach(key => {
                if (key.endsWith(`||${pageKey}`)) {
                    delete state[key];
                }
            });

            GM_setValue(STORAGE_KEY, state);

            // Visually uncheck checkboxes on this page
            document
                .querySelectorAll('.ff-checkbox')
                .forEach(cb => {
                    cb.checked = false;

                const row = cb.closest('.ag-row');
                if (row) {
                    row.style.opacity = '';
                    row.style.backgroundColor = '';
                }
            })

        };

        document.body.appendChild(btn);
    }

    // Reset checklist site
    function addResetButtonSite() {

        const btn = document.createElement('button');
        btn.textContent = '🗑';

        btn.style.background = '#dc2626';

        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';

        btn.ondblclick = () => {
            if (!confirm(
                'This will uncheck all items on the ENTIRE SITE.\n' +
                'This action cannot be undone.\n' +
                'Continue?'
            )) return;

            GM_setValue(STORAGE_KEY, {});

            // Visually uncheck checkboxes on this page
            document
                .querySelectorAll('.ff-checkbox')
                .forEach(cb => {
                    cb.checked = false;

                const row = cb.closest('.ag-row');
                if (row) {
                    row.style.opacity = '';
                    row.style.backgroundColor = '';
                }
            })

        };

        document.body.appendChild(btn);
    }

    addResetButtonPage();
    addResetButtonSite();

})();
