/* Row sizes for the old list menu (?menu=list). A short tube drops the second line,
   then the row height and the gap, until the footer still sits on the glass.
   Seven disks on the shortest landscape tube use a 1px gap. */

export interface MenuRows { rowH: number; gap: number; top: number }

/** `lh` is the low-res tube height. `diskCount` is how many rows the menu has to show. */
export function menuRows(diskCount: number, lh: number): MenuRows {
  const n = Math.max(1, diskCount);
  const frame = (rowH: number, gap: number, minTop: number) => {
    const block = 64 + n * (rowH + gap) + 36;
    const top = Math.max(minTop, Math.round((lh - block) / 2));
    const bottom = top + 88 + n * (rowH + gap);   // the drive line's pixel font ends here
    return { top, bottom };
  };
  let rowH = Math.max(18, Math.min(36, Math.floor((lh - 16 - 64 - 36) / n) - 6));
  let gap = rowH >= 30 ? 6 : 3;
  const first = frame(rowH, gap, 8);
  if (first.bottom <= lh - 1) return { rowH, gap, top: first.top };
  gap = 2;
  for (let rh = Math.min(rowH, 22); rh >= 12; rh--) {
    const next = frame(rh, gap, 4);
    if (next.bottom <= lh - 1) return { rowH: rh, gap, top: next.top };
  }
  gap = 1;
  for (let rh = 12; rh >= 11; rh--) {
    const next = frame(rh, gap, 4);
    if (next.bottom <= lh - 1) return { rowH: rh, gap, top: next.top };
  }
  return { rowH: 11, gap: 1, top: 4 };
}
