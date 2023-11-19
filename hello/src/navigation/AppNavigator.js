import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import InspectionsListScreen from '../screens/InspectionsListScreen';
import InspectionDetailScreen from '../screens/InspectionDetailScreen';
import AssignedInspectionsScreen from '../screens/AssignedInspectionsScreen';
import InspectionReportScreen from '../screens/InspectionReportScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Create a stack navigator for use within the drawer
function MainStackNavigator() {
  return (
    <Stack.Navigator options={{}}>
        <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false ,}} // This hides the navigation bar on the Login screen
      />
      <Stack.Screen name="InspectionsList" component={InspectionsListScreen}  options={{ headerShown: false ,}} />
      <Stack.Screen name="InspectionDetails" component={InspectionDetailScreen}  options={{ headerShown: false ,}} />
      <Stack.Screen name="AssignedInspections" component={AssignedInspectionsScreen}  options={{ headerShown: false ,}} />
      <Stack.Screen name="InspectionReport" component={InspectionReportScreen}  options={{ headerShown: false ,}} />
      {/* ... other stack screens */}
    </Stack.Navigator>
  );
}

// Now use the drawer navigator in the AppNavigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
       {/* The MainStackNavigator contains the rest of your stack screens */}
      <Drawer.Navigator>
     
        {/* The drawer navigator contains the drawer screens */}
    

        <Drawer.Screen name="main" component={MainStackNavigator}  options={{ headerShown:true,title:' ',headerTransparent:true } }/>
       <Drawer.Screen name="InspectionsList" component={InspectionsListScreen}  options={{ headerShown:true,title :'דוחות פתוחות',headerTransparent:false ,drawerLabel:'S דוחות חדשים ' ,headerTransparent:true} }/>
        
        <Drawer.Screen name="AssignedInspections" component={AssignedInspectionsScreen} options={{ headerShown:true,title:'דוחות שלי',headerTransparent:false,drawerLabel:' S דוחות שלי'  ,headerTransparent:true} }/>
       
        {/* You can add more drawer screens if needed */}
      </Drawer.Navigator>
    

    </NavigationContainer>
  );
};

export default AppNavigator;