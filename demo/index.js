import {
  SVGGantt,
  CanvasGantt,
  StrGantt
} from '../src';

const data = getData();
const options = {
  viewMode: 'week',
  dataMode: 'all',
  toolTip: {
    arrow: true,
    theme: 'light'
  },
  onClick: v => console.log(v)
};
const svgGantt = new SVGGantt('#svg', data, options);
const canvasGantt = new CanvasGantt('#canvas', data, options);
const strGantt = new StrGantt(data, options);

function renderStr() {
  const dom = document.querySelector('#str');
  dom.textContent = formatXML(strGantt.render());
}

renderStr();

document.querySelector('#viewMode').onchange = e => viewModeChanged(e.target.value);

function viewModeChanged(viewMode) {
  svgGantt.setOptions({
    toolTip: {
      arrow: true,
      theme: 'light'
    },
    viewMode,
    dataMode: 'all'
  });
  canvasGantt.setOptions({
    toolTip: {
      arrow: true,
      theme: 'light'
    },
    viewMode,
    dataMode: 'all'
  });
  strGantt.setOptions({
    toolTip: {
      arrow: true,
      theme: 'light'
    },
    viewMode,
    dataMode: 'all'
  });
  renderStr();
}

function rand(begin) {
  let date;
  let days;
  if (begin) {
    days = Math.random() * 60 + 5;
    date = new Date(begin);
  } else {
    days = Math.random() * 60 - 60;
    date = new Date();
  }
  date.setDate(date.getDate() + days);
  return date;
}

function getData() {
  const data = [{
      id: 11,
      name: 'Requirements'
    }, {
      id: 12,
      name: 'Design'
    }, {
      id: 13,
      name: 'Implement'
    }, {
      id: 14,
      name: 'Verification'
    }, {
      id: 21,
      name: 'Preliminary'
    }, {
      id: 22,
      name: 'Systems design'
    }, {
      id: 23,
      name: 'Development'
    }, {
      id: 24,
      name: 'Integration'
    }];
  data.forEach(item => {
    /* eslint-disable */
    item.expect_from = rand();
    item.expect_to = rand(item.expect_from);
    // item.reality_from = rand();
    // item.reality_to = rand(item.reality_from);
    item.addon = {
      label: 'ff',
      assigned_user: 'ff',
      status: 'ff'
    }
  });
  return data;
}

function formatXML (xml) {
  var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
  var wsexp = / *(.*) +\n/g;
  var contexp = /(<.+>)(.+\n)/g;
  xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
  var pad = 0;
  var formatted = '';
  var lines = xml.split('\n');
  var indent = 0;
  var lastType = 'other';
  // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
  var transitions = {
    'single->single': 0,
    'single->closing': -1,
    'single->opening': 0,
    'single->other': 0,
    'closing->single': 0,
    'closing->closing': -1,
    'closing->opening': 0,
    'closing->other': 0,
    'opening->single': 1,
    'opening->closing': 0,
    'opening->opening': 1,
    'opening->other': 1,
    'other->single': 0,
    'other->closing': -1,
    'other->opening': 0,
    'other->other': 0
  };

  for (var i = 0; i < lines.length; i++) {
    var ln = lines[i];

    // Luca Viggiani 2017-07-03: handle optional <?xml ... ?> declaration
    if (ln.match(/\s*<\?xml/)) {
      formatted += ln + '\n';
      continue;
    }

    var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
    var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
    var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
    var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
    var fromTo = lastType + '->' + type;
    lastType = type;
    var padding = '';

    indent += transitions[fromTo];
    for (var j = 0; j < indent; j++) {
      padding += '  ';
    }
    if (fromTo == 'opening->closing')
      formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
    else
      formatted += padding + ln + '\n';
  }

  return formatted;
}
