import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

function ModalLanguage() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor:'red'}}>
          
          <Text style={{fontSize:18,textAlign:'center'}}>Choose Language</Text>

          {/* <Button title="Submit" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
  );
}

export default ModalLanguage;