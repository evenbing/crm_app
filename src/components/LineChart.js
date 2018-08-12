/**
 * @component LineChart.js
 * @description line chart 图
 * @time 2018/7/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Echarts from 'js-rn-echarts';
import { theme } from '../constants';

class LineChart extends React.PureComponent {
  render() {
    const { data, name } = this.props;
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
      },
      toolbox: {
      },
      grid: {
        top: 15,
        bottom: 37,
      },
      xAxis: [
        {
          // 就是一月份这个显示为一个线段，而不是数轴那种一个点点
          boundaryGap: true,
          type: 'category',
          name: null,
          data: data.map(obj => obj.dateId),
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#6F6F6F',
              fontSize: 12,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#6F6F6F',
              fontSize: 12,
            },
          },
          splitLine: {
            lineStyle: {
              color: '#6F6F6F',
              opacity: 0.1,
            },
          },
        },
      ],
      // 图形的颜色组
      color: [theme.chartLineColor],
      // 需要显示的图形名称，类型，以及数据设置
      series: [
        {
          name,
          type: 'line',
          data: data.map(obj => obj.achievement),
          showSymbol: false,
        },
      ],
    }
    return (
      <Echarts
        option={option}
        height={195}
        width={Dimensions.get('window').width}
      />
    );
  }
}

LineChart.defaultProps = {
  data: [],
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  name: PropTypes.string.isRequired,
};

export default LineChart;
