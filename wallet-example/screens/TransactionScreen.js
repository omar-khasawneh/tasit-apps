import React from "react";
import { StyleSheet, View } from "react-native";

export default class TransactionScreen extends React.Component {
  static navigationOptions = {
    title: "Transaction"
  };

  render() {
    {
      /*TODO: Flesh out this screen with a mocked up transaction using
    the incoming data*/
    }
    return <View style={styles.container}>{"Test"}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
