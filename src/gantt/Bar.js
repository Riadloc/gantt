import h from '../h';
import { formatDay, formatTime } from '../utils';

const All = function ({
  x0, y0, cur, current, styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, onClick
}) {
  return (
    <g class="bar">
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        let [x, x1, w1, w2, w3] = [0, 0, 0, 0, 0];
        if (!v.expect_to) {
          return <g></g>;
        } else {
          if (!v.expect_from) {
            x = x0 + (v.init_time - minTime) / unit;
            w1 = (v.expect_to - v.init_time) / unit;
          } else {
            x = x0 + (v.expect_from - minTime) / unit;
            w1 = (v.expect_to - v.expect_from) / unit;
          }
        }
        if (v.reality_from) {
          x1 = x0 + (v.reality_from - minTime) / unit;
          if (!v.reality_to) {
            w3 = (current - v.reality_from) / unit || 1;
          } else {
            w2 = (v.reality_to - v.reality_from) / unit;
          }
        } else if (v.reality_to) {
          x1 = x0 + (v.init_time - minTime) / unit;
          w2 = (v.reality_from - v.init_time) / unit;
        }
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const EY = y + barHeight / 4;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>期望起止时间：${formatTime(new Date(v.expect_from))} 至 ${formatTime(new Date(v.expect_to))}</p>
        <p>实际起止时间：${v.reality_from?formatTime(new Date(v.reality_from)):'未开始'} ${v.reality_to?'至 '+formatTime(new Date(v.reality_to)):(v.reality_from?'未结束':'')}</p>`;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            {v.reality_from&&v.reality_from-v.expect_from<0?<text x={x1 - 4} y={TY} style={styles.text1}>{formatDay(new Date(v.reality_from))}</text>:
            <text x={x - 4} y={TY} style={styles.text1}>{formatDay(new Date(v.expect_from))}</text>}
            {v.reality_to&&v.reality_to-v.expect_to>0?<text x={x1 + w2 + 24} y={TY} style={styles.text1}>{formatDay(new Date(v.reality_to))}</text>:
            <text x={x + w1 + 24} y={TY} style={styles.text1}>{formatDay(new Date(v.expect_to))}</text>}
            <rect x={x} y={EY} width={w1} height={barHeight/2} rx={1.8} ry={1.8} style={styles.yellow} />
            {w2?<rect x={x1} y={y} width={w2} height={barHeight} rx={1.8} ry={1.8} style={styles.greenA} />:null}
            {w3>0?<rect x={x1} y={y} width={w3} height={barHeight} style={styles.buleA} />:null}
            {w3>0?<path d={`M${x1+w3} ${y} L${x1+w3} ${y+barHeight} L${x1+w3+2*barHeight/3} ${y+barHeight/2} Z`} style={styles.buleA}/>:null}
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
        if (!v.expect_from || v.expect_to) {
          return <g></g>;
        }
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
  x0, y0, cur, current, styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, onClick
}) {
  return (
    <g class="bar">
      <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} />
      {data.map((v, i) => {
        let [w1, w2] = [0, 0];
        if (!v.reality_from) {
          return <g></g>;
        }
        if (v.reality_from && v.reality_to) {
          w1 = (v.reality_to - v.reality_from) / unit;
        } else {

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
            { v.reality_to ? <text x={x + w1 + 4} y={TY} style={styles.text2}>{formatDay(new Date(v.reality_to))}</text> : null}
            <rect x={x} y={y} width={w1} height={barHeight} rx={1.8} ry={1.8} style={styles.green} />
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
