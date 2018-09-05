import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import styled from 'styled-components';
import { ListItem, Left, Thumbnail, Body, Text, Right, Icon } from 'native-base';

import { LeftBackIcon, CommStatusBar } from '../../../components/Layout';
import wordIcon from '../../../img/word.png';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { ContainerView } from '../../../components/Styles/Layout';

const List = styled.FlatList``;

class RelatedDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: uuidv1(),
          docIcon: wordIcon,
          docName: '反馈结果文档',
          company: '西风网络',
          time: '2018-09-09 19:00',
        },
        {
          key: uuidv1(),
          docIcon: wordIcon,
          docName: '反馈结果文档',
          company: '西风网络',
          time: '2018-09-09 19:00',
        },
      ],
    };
  }

  keyExtractor = item => item.key;

  renderItemSeparatorComponent = () => <HorizontalDivider height={1} />

  renderItem = ({ item }) => {
    const {
      docIcon,
      docName,
      company,
      time,
    } = item;

    return (
      <ListItem thumbnail noBorder style={{ backgroundColor: 'white' }}>
        <Left>
          <Thumbnail square source={docIcon} />
        </Left>
        <Body>
          <Text>{docName}</Text>
          <Text note numberOfLines={1}> {company} </Text>
          <Text note numberOfLines={1}> {time} </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <List
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          key
        />
      </ContainerView>
    );
  }
}

RelatedDocs.navigationOptions = ({ navigation }) => ({
  title: '相关文档',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

export default RelatedDocs;
