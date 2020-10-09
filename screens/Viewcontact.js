import React from 'react';
import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,Linking,Platform,Alert,AsyncStorage} from 'react-native';
import {Card,CardItem} from "native-base";
import {Entypo} from "@expo/vector-icons";

export default class Viewcontact extends React.Component {
 constructor(props){
   super(props);
   this.state={
     fname:"",
     lname:"",
     phone:"",
     email:"",
     address:"",
     key:""
   }
 }
componentDidMount(){
  const { navigation}= this.props;
  navigation.addListener("willFocus",()=>{
    var key = this.props.navigation.getParam("key","");
    this.getContact(key)
  })
}

  static navigationOptions={
    title: "View Contact"
}

getContact= async (key)=>{
  await AsyncStorage.getItem(key)
  .then(contactjsonString =>{
    var contact =JSON.parse(contactjsonString);
    contact["key"]=key;
    this.setState(contact)
  })
  .catch(error=>{
    console.log(error)
  })


}

callAction =(phone)=>{
  let phonenumber=phone;
  if (Platform.OS !== "android") {
    phonenumber= `telpromt:${phone}`;  
  }else{
    phonenumber=`tel:${phone}`;
  }
  Linking.canOpenURL(phonenumber)
  .then(supported =>{
    if (!supported) {
      Alert.alert("Phone Number is not available")
      
    }else{
      return Linking.openURL(phonenumber)
    }
  })
  .catch(error=>{
    console.log(error)
  })
};

smsAction=(phone)=>{
  let phonenumber=phone;
  phonenumber =`sms:${phone}`
  Linking.canOpenURL(phonenumber)
  .then(supported =>{
    if (!supported) {
      Alert.alert("Phone Number is not available")
      
    }else{
      return Linking.openURL(phonenumber)
    }
  })
  .catch(error=>{
    console.log(error)
  })

}
editContact = (key) =>{
    this.props.navigation.navigate("Edit",{
      key:key
    });
}
deleteContact=(key)=>{
  Alert.alert(
    "Delete Contact ?",
    `${this.state.fname} ${this.state.lname}`,
    [
      {
        text:"Cancel",onPress:()=> console.log("cancel tapped")
      },
      {
        text:"OK",
        onPress:async ()=>{
          await AsyncStorage.removeItem(key)
          .then( ()=>{
            this.props.navigation.goBack();
          } )
          .catch(error =>console.log(error))

        }
      }
    ]

  );
}
    render(){
  return (
    <ScrollView style={styles.container}>
     <View style={styles.contactIconContainer}>
       <Text style={styles.contactIcon}>{this.state.fname[0].toUpperCase()}</Text>
       <View style={styles.nameContainer}>
       <Text style={styles.name}>{this.state.fname}{this.state.lname}</Text>
     </View>
     </View>
     <View style={styles.infoContainer}>
       <Card>
         <CardItem borderd>
           <Text style={styles.infoText}>Phone :</Text>
         </CardItem>
         <CardItem borderd>
           <Text style={styles.infoText}>{this.state.phone}</Text>
         </CardItem>
       </Card>
       <Card>
         <CardItem borderd>
           <Text style={styles.infoText}>Email :</Text>
         </CardItem>
         <CardItem borderd>
           <Text style={styles.infoText}>{this.state.email}</Text>
         </CardItem>
       </Card>
       <Card>
         <CardItem borderd>
           <Text style={styles.infoText}>Address :</Text>
         </CardItem>
         <CardItem borderd>
           <Text style={styles.infoText}>{this.state.address}</Text>
         </CardItem>
       </Card>
     </View>

     <Card style={styles.actionContainer}>
       <CardItem borderd style={styles.actionButton}>
         <TouchableOpacity
         onPress={()=>{
          this.smsAction(this.state.phone)
        }}>
           <Entypo 
           name="message"
           size={50}
           color="red"
           
           />
         </TouchableOpacity>

       </CardItem>
       <CardItem borderd style={styles.actionButton}>
         <TouchableOpacity
         onPress={()=>{
          this.callAction(this.state.phone)
        }}>
           <Entypo 
           name="phone"
           size={50}
           color="red"
           
           />
         </TouchableOpacity>

       </CardItem>

     </Card>
     <Card style={styles.actionContainer}>
       <CardItem borderd style={styles.actionButton}>
         <TouchableOpacity
         onPress={()=>{
          this.editContact(this.state.key)
        }}>
           <Entypo 
           name="edit"
           size={50}
           color="red"
           
           />
         </TouchableOpacity>

       </CardItem>
       <CardItem borderd style={styles.actionButton}>
         <TouchableOpacity
         onPress={()=>{
         this.deleteContact(this.state.key)
        }}>
           <Entypo 
           name="trash"
           size={50}
           color="red"
           
           />
         </TouchableOpacity>

       </CardItem>

     </Card>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    // backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "red",
    fontWeight: "900"
  },
  infoContainer:{
    flexDirection:"column"
  }
});
