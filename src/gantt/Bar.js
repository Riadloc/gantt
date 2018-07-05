import h from '../h';
import { formatDay, formatTime } from '../utils';

const All = function ({
  x0, y0, cur, styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, onClick
}) {
  return (
    <g class="bar">
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        let [w3, w4, w5, w6] = [0, 0, 0, 0];
        const w1 = (v.expect_to - v.expect_from) / unit;
        if (v.reality_from) {
          w3 = (v.reality_from - v.expect_from) / unit;
          if (!v.reality_to) {
            w4 = 2;
          }
        }
        if (v.reality_to) {
          if(v.reality_to > v.expect_to && v.reality_from < v.expect_from) {
            w4 = w1;
            w5 = (v.expect_from - v.reality_from) / unit;
            w6 = (v.reality_to - v.expect_to) / unit;
          } else if (v.reality_to > v.expect_to) {
            if (v.reality_from > v.expect_to) {
              w4 = (v.reality_to - v.reality_from) / unit;
              w5 = w4;
            } else {
              w4 = (v.expect_to - v.reality_from) / unit;
              w5 = (v.reality_to - v.expect_to) / unit;
            }
          } else if (v.reality_from < v.expect_from) {
            if (v.reality_to < v.expect_from) {
              w4 = (v.reality_to - v.reality_from) / unit;
              w5 = w4;
            } else {
              w4 = (v.reality_to - v.expect_from) / unit;
              w5 = (v.expect_from - v.reality_from) / unit;
            }
          } else {
            w4 = (v.reality_to - v.reality_from) / unit;
          }
        }
        const x = x0 + (v.expect_from - minTime) / unit;
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>期望起止时间：${formatTime(new Date(v.expect_from))} 至 ${formatTime(new Date(v.expect_to))}</p>
        <p>实际起止时间：${v.reality_from?formatTime(new Date(v.reality_from)):'未开始'} ${v.reality_to?'至 '+formatTime(new Date(v.reality_to)):(v.reality_from?'未结束':'')}</p>`;
        const hasOver = w3<0 || w3>w1;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text x={x - 4 + (w3<0?w3:0)} y={TY} style={styles.text1}>{formatDay(new Date(v.expect_from))}</text>
            {w5 ? <text x={x + w1 + (w6?w6:(w3>0?w5:0)) + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.reality_to))}</text> : 
            <text x={x + w1 + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.expect_to))}</text>}
            <rect x={x} y={y} width={w1} height={barHeight} rx={1.8} ry={1.8} style={styles.yellow} />
            {w4 !== w5 ? <rect x={x+((w3<0)?0:w3)} y={y} width={w4} height={barHeight} rx={1.8} ry={1.8} style={styles.red}></rect> : null}
            {(w5 || w4 === w5) ? <rect x={x+(hasOver?w3:w1)} y={y} width={w5} height={barHeight} rx={1.8} ry={1.8} style={styles.grey}></rect> : null}
            {w6 ? <rect x={x+w1} y={y} width={w6} height={barHeight} rx={1.8} ry={1.8} style={styles.grey}></rect> : null}
            { w4 && hasOver && !w5 ? <rect x={x+w3} y={y} width={w4} height={barHeight} rx={1.8} ry={1.8} style={styles.grey}></rect> : null}
          </g>
        );
      })}
    </g>
  );
}

const Expect = function ({
  x0, y0, cur, styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, onClick
}) {
  return (
    <g class="bar">
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        const w1 = (v.expect_to - v.expect_from) / unit;
        const x = x0 + (v.expect_from - minTime) / unit;
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>期望起止时间：${formatTime(new Date(v.expect_from))} 至 ${formatTime(new Date(v.expect_to))}</p>`;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text x={x - 4} y={TY} style={styles.text1}>{formatDay(new Date(v.expect_from))}</text>
            <text x={x + w1 + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.expect_to))}</text>
            <rect x={x} y={y} width={w1} height={barHeight} rx={1.8} ry={1.8} style={styles.yellow} />
          </g>
        );
      })}
    </g>
  );
}

const Reality = function ({
  x0, y0, cur, styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, onClick
}) {
  return (
    <g class="bar">
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        let w4 = 3;
        if (!v.reality_from) {
          return <g></g>;
        }
        if (v.reality_to) {
          w4 = (v.reality_to - v.reality_from) / unit;
        }
        const x = x0 + (v.reality_from - minTime) / unit;
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>实际起止时间：${v.reality_from?formatTime(new Date(v.reality_from)):'未开始'} ${v.reality_to?'至 '+formatTime(new Date(v.reality_to)):(v.reality_from?'未结束':'')}</p>`;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text x={x - 4} y={TY} style={styles.text1}>{formatDay(new Date(v.reality_from))}</text>
            { v.reality_to ? <text x={x + w4 + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.reality_to))}</text> : null}
            <rect x={x} y={y} width={w4} height={barHeight} rx={1.8} ry={1.8} style={styles.red} />
          </g>
        );
      })}
    </g>
  );
}

export default function Bar(props) {
  const { unit, dataMode, offsetY, minTime, rowHeight, barHeight, maxTextWidth, current } = props;
  const x0 = maxTextWidth;
  const y0 = (rowHeight - barHeight) / 2 + offsetY;
  const cur = x0 + (current - minTime) / unit;
  const mode = { all: All, expect: Expect, reality: Reality };
  return (mode[dataMode])({x0, y0, cur, ...props});
}
