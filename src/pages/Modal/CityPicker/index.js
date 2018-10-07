import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ContainerView } from '../../../components/Drawer/Styles';
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import CityList from './components/CityList';
import { theme } from '../../../constants';
import { mapTree } from '../../../constants/address';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

class CityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: mapTree,
      cityList: mapTree[0].children,
      areaList: mapTree[0].children[0].children,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }

  onPressRight = () => {
    const {
      goBack,
      state: { params: { callback } },
    } = this.props.navigation;
    const {
      provinceList,
      cityList,
      areaList,
    } = this.state;
    const { label: provinceName, value: provinceId } = provinceList.filter(item => item.selected)[0];
    const { label: cityName, value: cityId } = cityList.filter(item => item.selected)[0];
    const { label: districtName, value: districtId } = areaList.filter(item => item.selected)[0];
    callback && callback({
      formatLocation: `${provinceName}-${cityName}-${districtName}`,
      provinceName,
      provinceId,
      cityName,
      cityId,
      districtName,
      districtId,
    });
    goBack();
  };

  onPressProvinceItem = ({ selected, value, children }) => () => {
    if (selected) return;
    const { provinceList } = this.state;
    this.setState({
      provinceList: provinceList.map(province => ({
        ...province,
        selected: province.value === value,
      })),
      cityList: children,
      areaList: children[0].children,
    });
  }

  onPressCityItem = ({ selected, value, children }) => () => {
    if (selected) return;
    const { cityList } = this.state;
    this.setState({
      cityList: cityList.map(city => ({
        ...city,
        selected: city.value === value,
      })),
      areaList: children,
    });
  }

  onPressAreaItem = ({ selected, value }) => () => {
    if (selected) return;
    const { areaList } = this.state;
    this.setState({
      areaList: areaList.map(area => ({
        ...area,
        selected: area.value === value,
      })),
    });
  }

  render() {
    const {
      provinceList,
      cityList,
      areaList,
    } = this.state;
    return (
      <ContainerView >
        <CommStatusBar />
        <Container>
          <CityList
            data={provinceList}
            onPressItem={this.onPressProvinceItem}
          />
          <CityList
            style={{ marginLeft: 2 }}
            data={cityList}
            onPressItem={this.onPressCityItem}
          />
          <CityList
            style={{ marginLeft: 2 }}
            data={areaList}
            onPressItem={this.onPressAreaItem}
          />
        </Container>
      </ContainerView>
    );
  }
}

CityPicker.propTypes = {
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

CityPicker.navigationOptions = ({ navigation }) => ({
  title: '选择地区',
  headerLeft: (
    <LeftBackIcon />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

export default CityPicker;
