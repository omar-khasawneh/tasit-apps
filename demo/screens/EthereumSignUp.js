import React from "react";
import { StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { Header } from "react-navigation";
import Colors from "../constants/Colors";
import EthereumSignUpForm from "../components/presentational/EthereumSignUpForm";
export default class EthereumSignUp extends React.Component {
  render() {
    const OFFSET = 20;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + OFFSET}
        style={styles.container}
        behavior="padding"
      >
        <Text style={styles.text}>
          {`Cool. Let's start by picking your Tasit username.`}
        </Text>
        <EthereumSignUpForm />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.textColor,
  },
});
