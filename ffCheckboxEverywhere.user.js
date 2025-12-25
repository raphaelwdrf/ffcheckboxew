// ==UserScript==
// @name        Fast Farming Checkbox Everywhere
// @namespace   https://github.com/raphaelwdrf/ffcheckboxew
// @description Adds checkbox everywhere on Fast-farming site.
// @version     1.3
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
    const PRIORITY_KEY = 'fast_aggrid_priority_name';

    function injectCheckboxes() {
        const state = GM_getValue(STORAGE_KEY, {});
        const priorityState = GM_getValue(PRIORITY_KEY, {});

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

                // Done Checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'ff-checkbox';
                checkbox.checked = !!state[nameKey];

                checkbox.style.marginRight = '6px';
                checkbox.style.cursor = 'pointer';
                checkbox.style.accentColor = 'rgba(0, 200, 0)';

                // Restore visual state Done Checkbox
                if (row && checkbox.checked) {
                    row.style.opacity = '0.3';
                    //row.style.backgroundColor = 'rgba(0, 200, 0, 0.25)';
                }

                checkbox.addEventListener('change', () => {
                    state[nameKey] = checkbox.checked;
                    GM_setValue(STORAGE_KEY, state);

                    if (row) {
                        row.style.opacity = checkbox.checked ? '0.3' : '';
                        //row.style.backgroundColor = checkbox.checked ? 'rgba(0, 200, 0, 0.25)' : '';
                    }
                });

                //Priority Checkbox
                const priorityCheckbox = document.createElement('input');
                priorityCheckbox.type = 'checkbox';
                priorityCheckbox.className = 'ff-priority-checkbox';
                priorityCheckbox.checked = !!priorityState[nameKey];

                priorityCheckbox.style.marginRight = '6px';
                priorityCheckbox.style.cursor = 'pointer';
                priorityCheckbox.style.accentColor = 'orange';

                // Restore visual state Priority Checkbox
                if (row && priorityCheckbox.checked) {
                    //row.style.boxShadow = 'inset 8px 0 0 orange';
                    row.style.textShadow = '0 0 10px orange';
                }
                priorityCheckbox.addEventListener('change', () => {
                    priorityState[nameKey] = priorityCheckbox.checked;
                    GM_setValue(PRIORITY_KEY, priorityState);

                    if (row) {
                        /*row.style.boxShadow = priorityCheckbox.checked
                            ? 'inset 8px 0 0 orange'
                            : '';*/
                        row.style.textShadow = priorityCheckbox.checked
                            ? '0 0 10px orange'
                            : '';
                    }
                });

                wrapper.prepend(checkbox);
                wrapper.prepend(priorityCheckbox);
            });
    }

    const observer = new MutationObserver(injectCheckboxes);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Reset done checklist page
    function addResetButtonPageDone() {

        const btn = document.createElement('button');
        btn.textContent = '🗑';

        btn.style.background = 'green';

        btn.style.position = 'fixed';
        btn.style.bottom = '50px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';

        btn.ondblclick = () => {
            if (!confirm(
                'This will uncheck all done items on this page only.\n' +
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
                .querySelectorAll('input[type="checkbox"].ff-checkbox')
                .forEach(cb => {
                    cb.checked = false;

                const row = cb.closest('.ag-row');
                if (row) {
                    row.style.opacity = '';
                    //row.style.textShadow = '';
                }
            })

        };

        document.body.appendChild(btn);
    }


    // Reset priority checklist page
    function addResetButtonPagePriority() {

        const btn = document.createElement('button');
        btn.textContent = '🗑';

        btn.style.background = 'orange';

        btn.style.position = 'fixed';
        btn.style.bottom = '50px';
        btn.style.right = '50px';
        btn.style.zIndex = '9999';

        btn.ondblclick = () => {
            if (!confirm(
                'This will uncheck all priority items on this page only.\n' +
                'This action cannot be undone.\n' +
                'Continue?'
            )) return;

            const state = GM_getValue(PRIORITY_KEY, {});
            const pageKey = location.pathname;

            Object.keys(state).forEach(key => {
                if (key.endsWith(`||${pageKey}`)) {
                    delete state[key];
                }
            });

            GM_setValue(PRIORITY_KEY, state);

            // Visually uncheck checkboxes on this page
            document
                .querySelectorAll('input[type="checkbox"].ff-priority-checkbox')
                .forEach(cb => {
                    cb.checked = false;

                const row = cb.closest('.ag-row');
                if (row) {
                    //row.style.opacity = '';
                    row.style.textShadow = '';
                }
            })

        };

        document.body.appendChild(btn);
    }

    // Reset checklist site
    function addResetButtonSite() {

        const btn = document.createElement('button');
        btn.textContent = '🗑';

        btn.style.background = 'red';

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
            GM_setValue(PRIORITY_KEY, {});

            // Visually uncheck checkboxes on this page
            document
                .querySelectorAll('input[type="checkbox"].ff-checkbox, input[type="checkbox"].ff-priority-checkbox')
                .forEach(cb => {
                    cb.checked = false;

                const row = cb.closest('.ag-row');
                if (row) {
                    row.style.opacity = '';
                    row.style.textShadow = '';
                }
            })

        };

        document.body.appendChild(btn);
    }

    addResetButtonPageDone();
    addResetButtonPagePriority();
    addResetButtonSite();

})();