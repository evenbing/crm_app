/**
 * create at 2018/08/13
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, RightView, ToastUtil, Thumbnail } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';
import { ProductListEnum } from 'constants/form';

// utils
import { moderateScale } from 'utils/scale';

// components
import { ContainerScrollView } from 'components/Styles/Layout';
import NavItem from 'components/NavItem';
import NavInputItem from 'components/NavInputItem';

// logicStores
import ProductListModel from 'logicStores/productList';

const MainView = styled.View`
  flex: 1;
  background-color: #F6F6F6;
`;

const HeaderView = styled.View`
  height: ${moderateScale(215)};
  background: #FFFFFF;
  align-items: center;
  padding-top: ${moderateScale(15)};
`;

const ItemView = styled.View`
  margin-bottom: ${moderateScale(15)};
`;

const TextView = styled.View``;

const ItemNameText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: ${moderateScale(16)};
  color: #373737;
  background-color: transparent;
`;

const ItemPriceText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(14)};
  color: #858585;
`;

const ListView = styled.View`
  background: #FFFFFF;
  margin-top: ${moderateScale(10)};
`;

useStrict(true);

@observer
class ModifyProductPrice extends React.Component {
  state = {
    price: null,
    number: null,
    discount: null,
    totalMoney: null,
    comment: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.initState();
  }
  onPressRight = () => {
    const {
      state: {
        price,
        number,
        discount,
        totalMoney,
        comment,
      },
      props: {
        navigation: { goBack },
      },
    } = this;
    try {
      if (!price) throw new Error(ProductListEnum.price);
      if (!number) throw new Error(ProductListEnum.number);
      if (!discount) throw new Error(ProductListEnum.discount);
      if (!totalMoney) throw new Error(ProductListEnum.totalMoney);
      if (!comment) throw new Error(ProductListEnum.comment);
      debugger;
      ProductListModel.updateProductReq({
        price,
        number,
        discount,
        totalMoney,
        comment,
      }, () => {
        goBack();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  };
  initState = () => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const { item = {} } = state.params || {};
    if (!Object.keys(item).length) return;
    this.setState({ ...item });
  };
  render() {
    const {
      state: {
        price,
        number,
        discount,
        totalMoney,
        comment,
      },
      props: {
        navigation: { state: { params: { item = {} } = {} } },
      },
    } = this;

    const navItemProps = {
      height: 44,
      leftText: '价格表价格',
      leftTextStyle: {
        fontFamily: theme.fontRegular,
        color: '#373737',
      },
      rightText: `¥${item.price}`,
      rightTextStyle: {
        fontFamily: theme.fontRegular,
        color: '#AEAEAE',
      },
      showNavIcon: false,
      isLast: false,
    };

    const tableList = [
      {
        leftText: '销售单价',
        ...theme.getLeftStyle({
          placeholder: ProductListEnum.price,
          value: typeof price !== 'string' ? String(price) : price,
          onChangeText: price => this.setState({ price }),
        }),
      },
      {
        leftText: '数量',
        ...theme.getLeftStyle({
          placeholder: ProductListEnum.number,
          value: number,
          onChangeText: number => this.setState({ number }),
        }),
      },
      {
        leftText: '折扣(%)',
        ...theme.getLeftStyle({
          placeholder: ProductListEnum.discount,
          value: discount,
          onChangeText: discount => this.setState({ discount }),
        }),
      },
      {
        leftText: '总价',
        ...theme.getLeftStyle({
          placeholder: ProductListEnum.totalMoney,
          value: totalMoney,
          onChangeText: totalMoney => this.setState({ totalMoney }),
        }),
      },
      {
        leftText: '备注',
        ...theme.getLeftStyle({
          placeholder: ProductListEnum.comment,
          value: comment,
          maxLength: 10,
          onChangeText: comment => this.setState({ comment }),
        }),
      },
    ];
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <MainView>
          <HeaderView>
            <ItemView>
              <Thumbnail
                size={120}
              />
            </ItemView>
            <TextView
              style={{
                marginBottom: moderateScale(5),
              }}
            >
              <ItemNameText>{item.name}</ItemNameText>
            </TextView>
            <TextView><ItemPriceText>标准价格：¥{item.price}</ItemPriceText></TextView>
          </HeaderView>

          <ListView>
            <NavItem {...navItemProps} />
            {
              tableList.map(item => (
                <NavInputItem key={item.leftText} {...item} />
              ))
            }
          </ListView>
        </MainView>
      </ContainerScrollView>
    );
  }
}

ModifyProductPrice.navigationOptions = ({ navigation }) => ({
  title: '产品目录',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

ModifyProductPrice.defaultProps = {};

ModifyProductPrice.propTypes = {
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

export default ModifyProductPrice;
