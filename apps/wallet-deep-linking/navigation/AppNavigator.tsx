import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: {
      screen: MainTabNavigator,
      path: "",
    },
    intialRouteName: "Home",
  })
);

export default AppNavigator;
