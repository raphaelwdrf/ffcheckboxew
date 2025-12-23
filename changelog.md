## Changelog

### v1.1
- Added a new **Priority checkbox** next to each existing checkbox.
- Implemented **independent persistence** for priority state using a separate storage key.
- Added a **visual priority indicator** using a non-layout-breaking overlay.
- Applied **native checkbox colors** using `accent-color`:
  - Green for completed items
  - Orange for priority items
- Updated reset buttons to:
  - Clear both **Done** and **Priority** checkboxes
  - Reset all related visual styles (opacity, background, priority indicator).

### v1.0
- Initial release.
- Added persistent **Done checkboxes** to Fast Farming AG Grid tables.
- Stored checkbox state locally per page.
- Added visual feedback for completed rows (opacity and green background).
- Included reset buttons for:
  - Current page only
  - Entire site.