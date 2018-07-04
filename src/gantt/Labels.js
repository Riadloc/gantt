import h from '../h';

export default function Labels({
  styles, data, rowHeight, offsetY
}) {
  return (
    <g>
      {data.map((v, i) => {
        return (
          <g key={i} style={{ cursor: 'pointer' }} onClick={handler}>
            <text
              x={10}
              y={(i + 0.5) * rowHeight + offsetY}
              style={styles.groupLabel}
            >{v.name}
            </text>
          </g>
        )}
      )}
    </g>
  );
}
