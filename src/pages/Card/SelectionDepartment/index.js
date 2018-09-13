/**
 * @component index.js
 * @description 选择部门容器
 * @time 2018/9/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TouchableView from '../../../components/TouchableView';
import Thumbnail from '../../../components/Thumbnail';

const ListView = styled.View`
  background-color: ${theme.whiteColor};
  padding: 0 ${theme.moderateScale(14)}px;
`;

const ListItemView = styled(TouchableView)`
  padding: ${theme.moderateScale(11)}px 0;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.borderColor};
`;

const TextView = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.textColor};
`;

const list = ['总裁办', '销售部', '设计部', '开发部', '运营部'];

class SelectionDepartment extends React.Component {
  state = {
    selectedIndex: 0,
  };
  onPressItem = ({ index }) => {
    if (this.state.selectedIndex === index) return;
    this.setState({ selectedIndex: index });
  };
  renderItem = () => {
    const { selectedIndex } = this.state;
    if (!list.length) return null;
    return list.map((_, i) => (
      <ListItemView
        key={_}
        onPress={() => this.onPressItem({ index: i })}
      >
        <TextView>{_}</TextView>
        {
          selectedIndex === i ? (
            <Thumbnail
              source={require('../../../img/modal/ok.png')}
              size={16}
            />
          ) : null
        }
      </ListItemView>
    ));
  };
  render() {
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider height={9} />
        <ListView>
          {this.renderItem()}
        </ListView>
      </ContainerScrollView>
    );
  }
}

SelectionDepartment.navigationOptions = ({ navigation }) => ({
  title: '选择部门',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

SelectionDepartment.defaultProps = {};

SelectionDepartment.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default SelectionDepartment;
