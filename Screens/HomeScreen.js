import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>
        START{' '}
      </Text>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('basic')}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../img/a6103757bb10f461d1e2e78540055998.png')}
          />
          <Text style={{textAlign: 'center', fontSize: 30}}>Động vật</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('advanced')}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../img/8fae754d8344c1376571928f3d7a6690.png')}
          />
          <Text style={{textAlign: 'center', fontSize: 30}}>Hoa quả</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('xemay')}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../img/images.png')}
          />
          <Text style={{textAlign: 'center', fontSize: 30}}>Xe cộ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
