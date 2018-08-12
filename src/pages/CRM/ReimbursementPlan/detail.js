import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native'
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';

import { moderateScale } from '../../../utils/scale';
// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import FlatListTable from '../../../components/FlatListTable';
import TabContainer from '../../../components/TabContainer';
import { theme } from '../../../constants'

const ContainerView = styled.View`
flex: 1;
background-color: #F6F6F6;
height: 100%;
`;

const MainView = styled.View`
flex: 1;
height: 100%;
paddingBottom: 50px;
`;

const HeaderView = styled.View`
height: ${moderateScale(225)};
align-items: center;
`;

const TextView = styled.View`
flex-direction: row;
align-items: center;
`

const Icon = styled.View`

`

const MediumText = styled.Text`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(20)};
color: #ffffff;
background-color: transparent;
`
const RegularText = styled.Text`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(14)};
color: #ffffff;
background-color: transparent;
`

const TabView = styled.View`
flex-direction: row;
height: ${moderateScale(50)};
marginTop: ${moderateScale(15)};
`

const FooterView = styled.View`
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: ${moderateScale(50)};
borderTopWidth: 1px;
borderTopColor: #F6F6F6;
`;

useStrict(true);

@observer
class ReimbursementPlanDetail extends React.Component {

  state = {
    tabIndex: 0,
  }

  onTabChange = index => {
    this.setState({tabIndex: index});
  }


  getHeaderComponent() {
    const { tabIndex } = this.state;

    const tabProps = {
      list: ['动态', '活动详情'],
      activeIndex: tabIndex,
      onChange: index => this.onTabChange(index)
    }

    return (
      <View>
        <LinearGradient
          start={{ x: 1.0, y: 1.0 }}
          end={{ x: 0.0, y: 0.0 }}
          colors={['#98CE5E', '#019D55']}
        >
          <HeaderView>
            <MediumText style={{marginTop: moderateScale(50)}}>20180909-0001</MediumText>
            <RegularText style={{marginTop: moderateScale(4)}}>客户：西风网络</RegularText>
            <TextView style={{marginTop: moderateScale(10)}}>
              <MediumText>负责人：张三</MediumText>
              <Icon style={{width: moderateScale(18), height: moderateScale(18), marginLeft: moderateScale(5), backgroundColor: '#ff0000'}} />
            </TextView>
            <RegularText style={{marginTop: moderateScale(10)}}>计划回款金额：¥100,000,000.00</RegularText>
          </HeaderView>
        </LinearGradient>

        <View style={{height: moderateScale(70), alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff"}}>
          <TextView><MediumText style={{fontSize: moderateScale(18), color: '#18B548'}}>12</MediumText></TextView>
          <TextView><RegularText style={{fontSize: moderateScale(14), color: '#494949'}}>文档</RegularText></TextView>
        </View>

        <TabContainer {...tabProps} />

      </View>
    )
  }

  getFooterComponent() {
    return (
      <FooterView></FooterView>
    )
  }

  onRefresh = () => {
    // this.getData()
  }

  onEndReached = () => {
    // let { total, list, pageNumber, loadingMore } = {}
    // if(list.length < total && loadingMore === false) {
      // this.getData(pageNumber + 1)
    // }
  }

  renderItem = ({item, index}) => {
    return (
      // <ProductItem isLeft={index%2 === 0} horizontal={false} data={item} onPress={()=>this.onProductItemHandler(item)} />
      <MainView />
    )
  }

  render() {
    // const { list = [{}, {}, {}, {}, {}, {}], refreshing = false, loadingMore = false } = {};
    // const flatProps = {
    //   keyExtractor: (item, index) => index,
    //   data: [...list],
    //   ListHeaderComponent: null,
    //   renderItem: this.renderItem,
    //   ItemSeparatorComponent: null,
    //   onRefresh: this.onRefresh,
    //   onEndReached: this.onEndReached,
    //   refreshing,
    //   noDataBool: !refreshing && list.length === 0,
    //   loadingMore
    // }

    return (
      <ContainerView>
        <CommStatusBar />
        <MainView>
          { this.getHeaderComponent() }
          { this.getFooterComponent() }
        </MainView>
      </ContainerView>
    );
  }
}

ReimbursementPlanDetail.navigationOptions = ({ navigation, screenProps }) => ({
  title: '回款计划资料',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

ReimbursementPlanDetail.defaultProps = {};

ReimbursementPlanDetail.propTypes = {
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

export default ReimbursementPlanDetail;
