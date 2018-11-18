/**
 * @component Divider.js
 * @description 常量打包
 * @time 2018/7/30
 * @author JUSTIN XU
 */
import routers from './routers';
import theme from './theme';

// export * from './form';

// 首页actionSheet
const CreateActionSheetType = [
  { leftText: '新建日程', path: routers.addSchedule },
  { leftText: '新建任务', path: routers.addTask },
];

const DelayActionSheetType = [
  { leftText: '1小时以后', delayHours: 1 },
  { leftText: '3小时以后', delayHours: 3 },
  { leftText: '明天', delayHours: 24 },
  { leftText: '后天', delayHours: 48 },
];

export {
  routers,
  theme,
  CreateActionSheetType,
  DelayActionSheetType,
};
