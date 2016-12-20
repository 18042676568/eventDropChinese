import d3 from 'd3';

const config = {
    lineHeight: 40,
    start: new Date(0),
    end: new Date(),
    minScale: 0,
    maxScale: Infinity,
    margin: {
        top: 60,
        left: 200,
        bottom: 40,
        right: 50,
    },
    labelsWidth: 210,
    labelsRightMargin: 10,
    locale: null,
    axisFormat: null,
    tickFormat: [
        ['.%L', (d) => d.getMilliseconds()],
        [':%S', (d) => d.getSeconds()],
        ['%I:%M', (d) => d.getMinutes()],
        ['%I %p', (d) => d.getHours()],
        ['%a %d', (d) => d.getDay() && d.getDate() !== 1],
        ['%b %d', (d) => d.getDate() !== 1],
        ['%B', (d) => d.getMonth()],
        ['%Y', () => true],
    ],
    mouseout: () => {},
    mouseover: () => {},
    zoomend: () => {},
    click: () => {},
    hasDelimiter: true,
    date: d => d,
    hasTopAxis: true,
    hasBottomAxis: (d) => d.length >= 10,
    eventLineColor: 'black',
    eventColor: null,
    metaballs: true,
    zoomable: true,
};

const myFormatters = d3.locale({
    'decimal': '.',
    'thousands': ',',
    'grouping': [3],
    'currency': ['￥', ''],
    'dateTime': '%a %b %e %X %Y',
    'date': '%YYYY-%MM-%DD',
    'time': '%H:%M:%S',
    'periods': ['上午', '下午'],
    'days': ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    'shortDays': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'months': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'shortMonths': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  });

d3.time.format = myFormatters.timeFormat;

config.dateFormat = config.locale ? config.locale.timeFormat('%Y年%B%d日') : d3.time.format('%Y年%B%d日');

module.exports = config;
