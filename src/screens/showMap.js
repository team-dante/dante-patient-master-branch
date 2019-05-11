'use strict';
import React, { Component } from 'react';
import {StyleSheet, Image, ScrollView, Text } from 'react-native';
import firebase from 'firebase';

export default class ShowMap extends Component {
    constructor(props) {
        super(props);
        // email = phoneNumber + @email.com
        this.state = { patientName: '', queueNum: ''};
    }
    componentDidMount() {
        // locate current user's phone num
        let user = firebase.auth().currentUser;
        let phoneNum = user.email.split("@")[0];
        // this keyword would not work under callback fxn
        var self = this;

        // firebase.ref('/WaitingQueue').update({
            
        // })

        // search for the staff obj that has the same phoneNum as currentUser has
        firebase.database().ref(`/Patients`).orderByChild("patientPhoneNumber").equalTo(phoneNum)
            .once('value', function(snapshot) {
                let firstNameVal = '';
                snapshot.forEach(function (data) {
                    firstNameVal = data.val().firstName;
                });
                console.log("line 27=" + firstNameVal)
                self.setState( { patientName : firstNameVal } );
                // running console.log(patientName) here would cause crash
            });
    }
    render() {
        const { patientName, queueNum } = this.state;
        return (
            <ScrollView minimumZoomScale={1} maximumZoomScale={3} contentContainerStyle={styles.container}>
                <Text style={styles.topText}>You are in line for queue #{queueNum}</Text>
                <Image source={require("../assets/radOncMap.png")} 
                style={styles.image}
                resizeMode="contain">

                </Image>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image: {
        flex:1, 
        height: undefined, 
        width: undefined
    },
    topText: {
        textAlign: 'center',
        position: 'absolute',
        paddingLeft: 80,
        fontSize: 18,
        margin: 5,
    },
});