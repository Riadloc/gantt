import h from '../h';
import { formatTime } from '../utils';

const All = function ({
  x0, y0, cur, current, styles, data, unit, height, offsetY, minTime, rowHeight, barHeight, footerHeight, onClick
}) {
  return (
    <g class="bar">
      {/*  若现在时间小于最小时间则不显示 */}
      {cur >= x0 ? <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} /> : null}
      {data.map((v, i) => {
        // x: 期望时间起点, x1: 实际时间起点, w1: 期望时间宽度, w2: 实际完成时间宽度, w3: 实际开始未完成时间宽度
        let [x, x1, w1, w2, w3] = [0, 0, 0, 0, 0];
        if (!v.expect_to) {
          return <g></g>;
        } else {
          if (!v.expect_from) {
            // 若无期望开始时间，则期望开始时间置为创建时间
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
            // 若无实际结束时间，则实际开始时间置为现在
            w3 = (current - v.reality_from) / unit || 1;
          } else {
            w2 = (v.reality_to - v.reality_from) / unit;
          }
        } else if (v.reality_to) {
          // 若无实际开始时间，则实际开始时间置为创建时间
          x1 = x0 + (v.init_time - minTime) / unit;
          w2 = (v.reality_to - v.init_time) / unit;
        }
        // 裁剪越界的范围(剪去0-x0范围内的部分)
        if (x < x0) {
          if (x + w1 > x0) x = x0;
          else w1 = 0;
        }
        if (x1 < x0) {
          if (x1 + w2 > x0 || x1 + w3 > x0) x1 = x0;
          else {
            w2 = 0;
            w3 = 0;
          }
        }
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const EY = y + barHeight / 4;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>期望起止时间：${v.expect_from?formatTime(new Date(v.expect_from)):formatTime(new Date(v.init_time))} 至 ${formatTime(new Date(v.expect_to))}</p>
        <p>实际起止时间：${v.reality_from?formatTime(new Date(v.reality_from)):'未开始'} ${v.reality_to?'至 '+formatTime(new Date(v.reality_to)):(v.reality_from?'未结束':'')}</p>`;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
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
      {cur >= x0 ? <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} /> : null}
      {data.map((v, i) => {
        let [x, w1] = [0, 0];
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
        // 裁剪越界的范围
        if (x < x0) {
          if (x + w1 > x0) x = x0;
          else w1 = 0;
        }
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>期望起止时间：${v.expect_from?formatTime(new Date(v.expect_from)):formatTime(new Date(v.init_time))} 至 ${formatTime(new Date(v.expect_to))}</p>`;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
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
      {cur >= x0 ? <line x1={cur} x2={cur} y1={offsetY} y2={height - footerHeight} style={styles.cline} /> : null}
      {data.map((v, i) => {
        let [x1, w1, w2] = [0, 0, 0];
        if (v.reality_from) {
          x1 = x0 + (v.reality_from - minTime) / unit;
          if (!v.reality_to) {
            w2 = (current - v.reality_from) / unit || 1;
          } else {
            w1 = (v.reality_to - v.reality_from) / unit;
          }
        } else if (v.reality_to) {
          x1 = x0 + (v.init_time - minTime) / unit;
          w1 = (v.reality_to - v.init_time) / unit;
        } else {
          return <g></g>
        }
        // 裁剪越界的范围
        if (x1 < x0) {
          if (x1 + w1 > x0 || x1 + w2 > x0) x1 = x0;
          else {
            w1 = 0;
            w2 = 0;
          }
        }
        const y = y0 + i * rowHeight;
        const TY = y + barHeight / 2;
        const reality_from = v.reality_from || v.init_time;
        const handler = () => onClick(v);
        const title = `<p>${v.name}-${v.addon.status}</p>
        <p>标签：${v.addon.label}</p>
        <p>被指派人：${v.addon.assigned_user}</p>
        <p>实际起止时间：${formatTime(new Date(reality_from))} 至 ${v.reality_to?formatTime(new Date(v.reality_to)):'未结束'}</p>`;
        return (
          <g title={title} key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            {w1?<rect x={x1} y={y} width={w1} height={barHeight} rx={1.8} ry={1.8} style={styles.greenA} />:null}
            {w2?<rect x={x1} y={y} width={w2} height={barHeight} style={styles.buleA} />:null}
            {w2?<path d={`M${x1+w2} ${y} L${x1+w2} ${y+barHeight} L${x1+w2+2*barHeight/3} ${y+barHeight/2} Z`} style={styles.buleA}/>:null}
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
