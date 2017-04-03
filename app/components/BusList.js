import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet } from 'react-native';

class BusList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={styles.busList}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  busList: {
    flex: 1, paddingTop: 22, backgroundColor:'white'
  }
});
module.exports = BusList;