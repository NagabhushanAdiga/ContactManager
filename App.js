import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from "./screens/Home";
import Editcontact from "./screens/EditContact";
import Addcontact from "./screens/Addcontact";
import Viewcontact from "./screens/Viewcontact";


//import  react navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

 const MainNavigator = createStackNavigator({
   Home:{screen: Home},
   Add:{screen: Addcontact},
   View:{screen: Viewcontact},
   Edit:{screen: Editcontact}
  }, {
    defaultNavigationOptions:{
      headerTintColor:"#fff",
      headerStyle:{
        backgroundColor:'red'
      },
      headerTitleStyle:{
        color:"#fff",
      }
    }
  }
 );

 const App =createAppContainer(MainNavigator)

 export default App;