import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, ScrollView, Alert ,ImageBackground,Dimensions} from 'react-native';
import axios from 'axios'; // make sure to install axios with npm or yarn
import apiExpertRequest from '../API/apiExpertRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InspectionDetailScreen = ({ route, navigation }) => {
  const { report } = route.params;
  const [selectedDate, setSelectedDate] = useState(report.availableStartingDates?.[0]);
  const [modalVisible, setModalVisible] = useState(false);
  


  const confirmDate = async () => {
    Alert.alert(report._id+selectedDate);
    if (selectedDate) {
      try {
        const response = await apiExpertRequest.createRequest( {
          report: report._id,
          expert:await AsyncStorage.getItem('expertId'),
          date: selectedDate,
          status: 'pending',

        });
        // Check response status or data if needed
        if (response.status === 200) {
          setModalVisible(true);
          // Optionally navigate back or refresh data
          // navigation.goBack();
        } else {
          // Handle any errors according to your API's response structure
          console.error('Failed to update the report: ', response.data);
        }
      } catch (error) {
        console.error('An error occurred during the API call: ', error);
      }
    }
  };
  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>דוח:{report.customer.name}</Text>
      <Text style={styles.text}>עיר: {report.property.cityName}</Text>
      <Text style={styles.text}>רחוב: {report.property.street}</Text>
      <Text style={styles.text}>בניין מס: {report.property.propertyNumber}</Text>
      <Text style={styles.text}>תחום :{report.subject}</Text>
      <Text style={styles.text}>תיאור: {report.description}</Text>
      {report.availableStartingDates?.length ? (
        <>
          <Text style={styles.dateText}>בחר אחד מהתאריכים הבאים:</Text>
          <View style={styles.dateContainer}>
            {report.availableStartingDates.map((date, index) => (
              <TouchableOpacity key={index} style={styles.dateButton} onPress={() => setSelectedDate(date)}>
                <Text style={styles.dateText}>{new Date(date).toLocaleDateString()}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dateText}>{`תאריך שבחרת: ${selectedDate ? new Date(selectedDate).toLocaleDateString() : 'None'}`}</Text>
          <Button title="שמור" onPress={confirmDate} />
        </>
      ) : (
        <Text>No available dates.</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Date Confirmed!</Text>
            {selectedDate && <Text>{`You have selected: ${new Date(selectedDate).toLocaleDateString()}`}</Text>}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </ImageBackground>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  container: {
    flex: 1, // Use flex to manage the layout
    paddingHorizontal: 20, // Horizontal padding
    paddingTop: 40, // Padding at the top for some breathing room
    backgroundColor: 'rgba(255,255,255,0.8)', // Slightly more transparent white
  },
  title: {
    fontSize: 26, // Slightly larger font size
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#0056b3', // Adjusted blue color for better visibility
    textAlign: 'center', // Center align the title
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333', // Slightly darker for better readability
    lineHeight: 24, // Line height for better text readability
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: '#f0f4f8', // Subtle background color
    borderRadius: 8, // Rounded corners
  },
  dateText: {
    fontSize: 16,
    color: '#0277bd',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004ba0',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#007bff', // More vibrant blue
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

    export default InspectionDetailScreen;