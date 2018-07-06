import h from '../h';

export default function Labels({
  styles, data, onLabelClick, rowHeight, offsetY
}) {
  return (
    <g class="labels">
      {data.map((v, i) => {
        const handler = () => onLabelClick(v);
        return (
          <g key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text
              x={10}
              y={(i + 0.5) * rowHeight + offsetY}
              style={v.important ? styles.addressLabel : styles.groupLabel}
            >{v.name}
            </text>
          </g>
        )}
      )}
    </g>
  );
}
