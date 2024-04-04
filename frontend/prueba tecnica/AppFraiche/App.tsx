
// Importar las dependencias necesarias
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackNavigator } from './src/Presentation/navigator/MainStackNavigator';
import { useEffect } from 'react';


// Definir el componente principal de la aplicación
const App = () => {

  

   // Renderizar el componente NavigationContainer, que envuelve todo el árbol de componentes de la aplicación
  return (
    <NavigationContainer>
       {/* Renderizar el stack de navegación */}
       <MainStackNavigator
          
          />
    </NavigationContainer>
  );
};



// Exportar el componente principal de la aplicación
export default App;