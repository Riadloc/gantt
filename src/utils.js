function padZero(date) {
  return ('0' + date).slice(-2);
}

export const DAY = 24 * 3600 * 1000;

export function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

export function getDates(begin, end) {
  const dates = [];
  const s = new Date(begin);
  s.setHours(24, 0, 0, 0);
  while (s.getTime() <= end) {
    dates.push(s.getTime());
    addDays(s, 1);
  }
  return dates;
}

let ctx = null;
export function textWidth(text, font, pad) {
  ctx = ctx || document.createElement('canvas').getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width + pad;
}

export function formatMonth(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}/${m > 9 ? m : `0${m}`}`;
}

export function formatDay(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m}/${d}`;
}

export function formatTime(date) {
  const Y = date.getFullYear();
  const M = padZero(date.getMonth() + 1);
  const D = padZero(date.getDate());
  const h = padZero(date.getHours());
  const m = padZero(date.getMinutes());
  const s = padZero(date.getSeconds());
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

export function formatData(data) {
  return data.map((v) => {
    return {
      id: v.id,
      name: v.name,
      expect_from: v.expect_from.getTime(),
      expect_to: v.expect_to.getTime(),
      reality_from: v.reality_from?v.reality_from.getTime():null,
      reality_to: v.reality_to?v.reality_to.getTime():null,
      addon: v.addon
    };
  });
}

