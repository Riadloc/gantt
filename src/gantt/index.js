import h from '../h';
import { DAY, getExtremeTimeByDataMode } from '../utils';
import Layout from './Layout';
import DayHeader from './DayHeader';
import WeekHeader from './WeekHeader';
import MonthHeader from './MonthHeader';
import Grid from './Grid';
import Labels from './Labels';
import Bar from './Bar';
import Legend from './Legend';
import getStyles from './styles';

const LEGENDS = [{
  type: 'yellow',
  name: '期望'
}, {
  type: 'greenA',
  name: '实际'
}, {
  type: 'buleA',
  name: '进行中'
}];
const UNIT = {
  day: DAY / 28,
  week: 7 * DAY / 56,
  month: 30 * DAY / 56
};
function NOOP() {}

export default function Gantt({
  data = [],
  onClick = NOOP,
  onLabelClick = NOOP,
  viewMode = 'week',
  dataMode = 'all',
  maxTextWidth = 140,
  offsetY = 60,
  rowHeight = 40,
  barHeight = 16,
  thickWidth = 1.4,
  footerHeight = 50,
  legends = LEGENDS,
  styleOptions = {}
}) {
  const unit = UNIT[viewMode];
  const current = (new Date()).getTime();
  const { minTime, maxTime } = getExtremeTimeByDataMode({data, dataMode, current, unit});
  const width = (maxTime - minTime) / unit + maxTextWidth;
  const height = data.length * rowHeight + offsetY + footerHeight;
  const box = `0 0 ${width} ${height}`;
  const styles = getStyles(styleOptions);

  return (
    <svg width={width} height={height} viewBox={box}>
      <Layout
        styles={styles}
        width={width}
        height={height}
        offsetY={offsetY}
        thickWidth={thickWidth}
        maxTextWidth={maxTextWidth}
      />
      {viewMode === 'day' ? <DayHeader
        styles={styles}
        unit={unit}
        height={height}
        offsetY={offsetY}
        minTime={minTime}
        maxTime={maxTime}
        maxTextWidth={maxTextWidth}
        footerHeight={footerHeight}
      /> : null}
      {viewMode === 'week' ? <WeekHeader
        styles={styles}
        unit={unit}
        height={height}
        offsetY={offsetY}
        minTime={minTime}
        maxTime={maxTime}
        maxTextWidth={maxTextWidth}
        footerHeight={footerHeight}
      /> : null}
      {viewMode === 'month' ? <MonthHeader
        styles={styles}
        unit={unit}
        offsetY={offsetY}
        minTime={minTime}
        maxTime={maxTime}
        maxTextWidth={maxTextWidth}
        footerHeight={footerHeight}
      /> : null}
      <Grid
        styles={styles}
        data={data}
        width={width}
        height={height}
        offsetY={offsetY}
        rowHeight={rowHeight}
        thickWidth={thickWidth}
        footerHeight={footerHeight}
        maxTextWidth={maxTextWidth}
      />
      <Labels
        styles={styles}
        data={data}
        onLabelClick={onLabelClick}
        offsetY={offsetY}
        rowHeight={rowHeight}
      />
      <Bar
        styles={styles}
        data={data}
        dataMode={dataMode}
        unit={unit}
        height={height}
        current={current}
        offsetY={offsetY}
        minTime={minTime}
        onClick={onClick}
        rowHeight={rowHeight}
        barHeight={barHeight}
        maxTextWidth={maxTextWidth}
        footerHeight={footerHeight}
      />
      <Legend
        styles={styles}
        legends={legends}
        width={width}
        height={height}
        barHeight={barHeight}
        footerHeight={footerHeight}
      />
    </svg>
  );
}
