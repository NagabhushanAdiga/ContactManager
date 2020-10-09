import React from 'react';
import { StyleSheet, Text, View,Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,ScrollView } from 'react-native';

import {Form ,Input,Item,Button,Label} from "native-base";


export default class Addcontact extends React.Component {
constructor(props){
    super(props);
    this.state={
        fname:"",
        lname:"",
        phone:"",
        email:"",
        address:""
    }
}


    static navigationOptions={
        title: "Add Contact"
    }

    saveContact = async () =>{
        if (  
            this.state.fname !== "" &&
            this.state.lname !== "" &&
            this.state.phone !== "" &&
            this.state.email !== "" &&
            this.state.address !== "" 
        ) {

            var contact={
                fname:this.state.fname,
                lname:this.state.lname,
                phone:this.state.phone,
                email:this.state.email,
                address:this.state.address
            }
            await AsyncStorage.setItem(Date.now().toString(),
                JSON.stringify(contact)
            )
            .then(
                this.props.navigation.goBack()
            )
            .catch(error =>{
                Alert.alert(error)
            })
        }else
        Alert.alert("All Fields are Required 😟 !!!")
    }
    render(){
  return (
      <TouchableWithoutFeedback
      onPress={()=>{Keyboard.dismiss}}
      
      >
    <ScrollView style={styles.container}>
        <Form>
    <Item style={styles.inputItem}>
        <Label style={styles.labeltext}>First Name * :</Label>
        <Input
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        onChangeText={  fname =>this.setState({fname})}
            />
    </Item>
            <Item style={styles.inputItem}>
                <Label style={styles.labeltext}>Last Name * :</Label>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={  lname =>this.setState({lname})}
                 />
            </Item>
            <Item style={styles.inputItem}>
                <Label style={styles.labeltext}>Phone * :</Label>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
               keyboardType="phone-pad"
                onChangeText={  phone =>this.setState({phone})}
                 />
            </Item>
            <Item style={styles.inputItem}>
                <Label style={styles.labeltext} >Email Id * :</Label>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={  email =>this.setState({email})}
                 />
        </Item>
        <Item style={styles.inputItem}>
                <Label style={styles.labeltext}>Address * :</Label>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={  address =>this.setState({address})}
                 />
        </Item>
        </Form>
        <Button
        full
        style={styles.button}
        onPress={()=>{
            this.saveContact();
        }}
        ><Text style={styles.buttonText}>Save</Text></Button>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10,
      height: 300,
      borderRadius:10,
    },
    inputItem: {
      marginTop: 30
    },
    button: {
      backgroundColor: "red",
      marginTop: 40,
      borderRadius:10,
      height:60,
      marginLeft:20,
      marginRight:20
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize:20
    },
    empty: {
      height: 500,
      backgroundColor: "#FFF"
    },
    labeltext:{
        fontWeight:"bold"
    }
  });