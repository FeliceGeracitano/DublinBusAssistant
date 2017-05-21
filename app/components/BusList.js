import React, { Component } from 'react'
import { ListView, Text, View, StyleSheet } from 'react-native'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class BusList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    const id = `${sectionID}-${rowID}`
    return (
      <View
        key={id}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
        }}
      />
    )
  }

  _renderRow(rowData) {
    const length = rowData.destination.length
    const newDirection = rowData.destination
      .slice(0, 16)
      .concat(length > 16 ? '...' : '')
    return (
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>
            {rowData.route}
          </Text>
          <Text style={styles.direction}>
            {newDirection}
          </Text>
        </View>

        <Text style={styles.dueTime}>
          {rowData.duetime}
        </Text>
      </View>
    )
  }

  _updateListView(buses) {
    if (!buses) {
      return
    }
    this.setState({
      dataSource: ds.cloneWithRows(buses)
    })
  }

  componentWillReceiveProps(nextProps) {
    this._updateListView(nextProps.buses)
  }

  render() {
    return (
      <View style={styles.busListContainer}>
        <ListView
          style={{ backgroundColor: 'black' }}
          scrollEnabled={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  busListContainer: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  text: {
    fontFamily: 'Fira Code',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFCD00'
  },
  dueTime: {
    fontFamily: 'Fira Code',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFCD00'
  },
  direction: {
    fontFamily: 'Fira Code',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFCD00'
  }
})
module.exports = BusList
