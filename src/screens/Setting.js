import { Settings, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useMyContextController,logout } from "../context";
import { useEffect } from "react";

export default Setting = ({navigation})=>{
    const [controller,dispatch] = useMyContextController();
    const{userLogin} =controller;
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])
    const onSubmit = ()=>{
        logout(dispatch)
    }
    return(
        <View style={{flex:1,justifyContent:"center"}}>
            <Button mode="contained" onPress={onSubmit}> Đăng xuất</Button>
        </View>
    )
}