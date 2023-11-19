import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import apiReports from '../API/apiReports';
import { Alert,ImageBackground,Dimensions } from 'react-native';
   const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true, // Include this line to get base64 image
    };
const InspectionReportScreen = ({ route, navigation }) => {
  const { report } = route.params;
  const [images, setImages] = useState([]);
  const [textFields, setTextFields] = useState([]);

  const selectPhotoTapped = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // Assuming `response.assets` is an array of selected images
        response.assets.forEach(asset => {
          const source = { uri: asset.uri };
          setImages(prevImages => [...prevImages, source]);
        });
      }
    });
  };

  const addNewTextField = () => {
    setTextFields([...textFields, { text: '' }]);
  };

  const updateTextField = (index, newText) => {
    const newTextFields = [...textFields];
    newTextFields[index].text = newText;
    setTextFields(newTextFields);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      // Append images to formData
      images.forEach((image, index) => {
        formData.append('findingsPhotos', {
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
          uri: image.uri.startsWith('file://') ? image.uri : `file://${image.uri}`,
        });
      });
  
      // Append findings text to formData as individual strings
      textFields.forEach((field, index) => {
        // Append each text field as a separate entry
        formData.append(`findings[${index}]`, field.text);
      });
  
      const reportId = report._id; // Replace with actual report ID variable
      const updateUrl = `http://10.0.2.2:5000/api/reports/findings/${reportId}`;
  
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
  
      const responseJson = await response.json();
      console.log(responseJson);
      Alert.alert('Report Submitted', 'Your report has been updated successfully.');
    } catch (error) {
      console.error('There was an error submitting the report: ', error);
      Alert.alert('Error', 'There was a problem updating your report.');
    }
  };
  
  
  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>דוח ביקור </Text>
      <Button onPress={selectPhotoTapped} title="בחר תמונות" />
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} style={styles.image} source={image} />
        ))}
      </View>
      {textFields.map((field, index) => (
        <View key={index} style={styles.textFieldContainer}>
          <TextInput
            style={styles.textField}
            onChangeText={(text) => updateTextField(index, text)}
            value={field.text}
            placeholder={`Text field #${index + 1}`}
          />
        
        
        </View>
      ))}
      <Button onPress={addNewTextField} title="הוסף ממצאים" />
      <Button onPress={handleSubmit} title="שמור" />
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
    verticalAlign: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.5)', // Use a subtle background color
  },
  title: {
    fontSize: 26, // Larger font size for titles
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark grey for text for better readability
    textAlign: 'center', // Center the titles
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20, // Add space below the image container
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5, // Round the corners of images
  },
  textFieldContainer: {
    marginBottom: 10, // Add space below each text field container
  },
  textField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD', // Lighter border color
    backgroundColor: '#FFF', // White background for text fields
    borderRadius: 5, // Round the corners of text fields
    padding: 15, // More padding for larger touch area
    fontSize: 16, // Larger font size for text inputs
    color: '#333', // Dark grey color for input text
    marginBottom: 10, // Space below the text field
  },
  button: {
    backgroundColor: '#005f73', // A professional blue shade for buttons
    color: '#FFF', // White text color for buttons
    padding: 15, // Padding inside the buttons
    borderRadius: 5, // Round the corners of buttons
    marginVertical: 10, // Vertical space around the buttons
  },
  buttonText: {
    fontSize: 18, // Larger font size for button text
    fontWeight: 'bold', // Bold font weight for button text
    textAlign: 'center', // Center the text inside buttons
  },
});

export default InspectionReportScreen;
