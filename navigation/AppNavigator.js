import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./tabsBottomNavigation";
import StartupScreen from "../screens/StartupScreen";
import { AuthNavigator } from "./stackNavigators"
const AppNavigator=(props)=>{
    const isAuth= useSelector(state => !!state.auth.token);
    const didTryAutoLogin=useSelector(state => !!state.auth.didTryAutoLogin);
    return <NavigationContainer>
        {isAuth && <Tabs />}
        {!isAuth && didTryAutoLogin && <AuthNavigator />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
}
export default AppNavigator;