import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Permissions } from "expo";
import Picture from "./Navigation/Picture";
import Photo from "./Navigation/Photo";
import Icon from "react-native-vector-icons/MaterialIcons";

const tabNavigation = createMaterialTopTabNavigator(
  {
    Picture: {
      screen: Picture,
      navigationOptions: {
        tabBarLabel: "Picture",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="camera" color={tintColor} size={24} />
        )
      }
    },
    Photo: {
      screen: Photo,
      navigationOptions: {
        tabBarLabel: "Photo",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="image" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialLayout: {
      height: 100,
      width: Dimensions.get("window").width
    },
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      tabStyle: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height / 12,
        justifyContent: "center",
        alignItems: "center"
      },
      labelStyle: {
        fontSize: 10
      },
      activeTintColor: "red",
      inactiveTintColor: "black",
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: { height: 0 },
      showIcon: true,
      upperCaseLabel: false,
      showLabel: false
    }
  }
);

const AppContainer = createAppContainer(tabNavigation);

export default class App extends React.Component {
  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        return true;
      }
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
