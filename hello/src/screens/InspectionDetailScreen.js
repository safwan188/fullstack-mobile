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
          <Button title="Confirm Date" onPress={confirmDate} />
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
    height: height,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.79)', // A clean white background

  },
  title: {
    marginTop: 40, // Add some space at the top
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Add some space below the title
    color: '#004ba0', // A strong blue for titles
  },
  text: {
    fontSize: 20, // Standard text size
    marginBottom: 20, // Space below each text
    color: '#333333', // Dark grey color for text for better readability
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  dateButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0f7fa', // A light blue background for date buttons
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#0277bd', // Darker blue for the date text
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004ba0', // Blue color for modal text
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Add any additional styles if needed
});
    
    export default InspectionDetailScreen;