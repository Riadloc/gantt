import h from '../h';
import { formatDay } from '../utils';

export default function Bar({
  styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, maxTextWidth, current, onClick
}) {
  const x0 = maxTextWidth;
  const y0 = (rowHeight - barHeight) / 2 + offsetY;
  const cur = x0 + (current - minTime) / unit;
  return (
    <g>
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        let [w3, w4, w5] = [0, 0, 0];
        const w1 = (v.expect_to - v.expect_from) / unit;
        if (v.reality_from) {
          w3 = (v.reality_from - v.expect_from) / unit;
        }
        if (v.reality_to) {
          if (v.reality_to > v.expect_to) {
            w4 = (v.expect_to - v.reality_from) / unit;
            w5 = (v.reality_to - v.expect_to) / unit;
          } else {
            w4 = (v.reality_to - v.reality_from) / unit;
          }
        }
        const w2 = w1 * v.percent;
        const x = x0 + (v.expect_from - minTime) / unit;
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const handler = () => onClick(v);
        return (
          <g key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text x={x - 4} y={TY} style={styles.text1}>{formatDay(new Date(v.expect_from))}</text>
            <text x={x + w1 + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.expect_to))}</text>
            <rect x={x} y={y} width={w1} height={barHeight} rx={1.8} ry={1.8} style={styles.yellow} />
            {w3 ? <rect x={x+w3} y={y} width={w4?w4:2} height={barHeight} rx={1.8} ry={1.8} style={styles.red}></rect> : null}
            {w5 ? <rect x={x+w1} y={y} width={w5} height={barHeight} rx={1.8} ry={1.8} style={styles.grey}></rect> : null}
          </g>
        );
      })}
    </g>
  );
}
