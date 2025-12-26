## Changelog

### v1.4
- Disabled native table checkboxes.
- Updated visual for Done and Priority reaction.

### v1.3
- Reduced visual impact of “Done” items (lower opacity instead of background color).
- Changed Priority highlight from left border to orange text glow.

### v1.2
- Added **separate reset buttons per page**:
  - One button to reset **Done** items only.
  - One button to reset **Priority** items only.
- Added **distinct visual reset actions** for Done and Priority states, ensuring styles are properly cleared.
- Improved reset UX with **color-coded buttons**:
  - Green for Done
  - Orange for Priority
  - Red for full site reset
- Refined reset logic to target **only the relevant storage key** per action.
- Improved clarity and control when managing large checklists with mixed Done and Priority states.

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