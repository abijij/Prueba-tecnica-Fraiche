import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Touchable, TouchableOpacity } from "react-native";
import { AdminProfileInfoScreen } from "../views/profileAdmin/info/AdminProfileInfo";
import { AdminCategoryNavigator } from "./AdminCategoryNavigator";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

// Crea un nuevo TabNavigator para la pantalla de administrador
const Tab = createBottomTabNavigator();

// Define el TabNavigator y sus respectivas pantallas
export const AdminTabsNavigator = () => {

  const { user } = useContext(UserContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Primera pantalla - Lista de Categorías */}
      <Tab.Screen
        name="AdminCategoryNavigator"
        component={AdminCategoryNavigator}
        options={({ route, navigation }) => ({
          title: "Categorías",
          tabBarLabel: "Categorías",
          tabBarIcon: () => (
            <Image
              source={require("../../../assets/list.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AdminCategoryCreateScreen")}
            >
              <Image
                source={require("../../../assets/add.png")}
                style={{ width: 35, height: 35, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />


      <Tab.Screen
        name="ProfileAdminInfoScreen"
        component={AdminProfileInfoScreen}
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/user_menu.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};
