import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
  Animated,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from './Theme';
const {width, height} = Dimensions.get('window');

const Xemay = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#65C563');
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [score, setScore] = useState(0);

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, data.length],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    fetch('https://6273d52b3d2b51007422ca75.mockapi.io/quiz2')
      .then(data => data.json())
      .then(val => {
        setData(val);
        setLoading(true);
      })
      .catch(err => console.log(err));

    return () => {};
  }, []);

  const renderItem = ({item}) => (
    <View
      style={[
        styles.itemContainer,
        {backgroundColor: item === selectItem ? backgroundColor : '#fff'},
      ]}>
      <TouchableOpacity
        onPress={() => {
          onclickItem(item);
        }}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );

  const onclickItem = item => {
    setSelectItem(item);
    setBackgroundColor('#65C563');
    console.log(item);
  };

  const onclickItem_ = () => {
    const sus = data[currentQuestion]?.correct_option;
    const sus_ = selectItem.label;

    console.log(selectItem.label);

    if (sus === sus_) {
      setBackgroundColor('#65C563');

      if (currentQuestion == data.length - 1) {
        setShowScoreModal(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }

      setScore(score + 1);
      Animated.timing(progress, {
        toValue: currentQuestion + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      setBackgroundColor('red');
      setScore(score - 1);
      Alert.alert('Đáp án đúng là : ' + sus);
    }
  };

  const NextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setScore(0);
  };

  const resertQuestion = () => {
    setShowScoreModal(false);
    setCurrentQuestion(0);
    setScore(0);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const Nextgame = () => {
    if (currentQuestion == 3) {
      setCurrentQuestion(showScoreModal);
    }
  };

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: 350,
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
          marginVertical: 20,
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#65C563',
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      {loading ? (
        <>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>EDU.IO</Text>
          {renderProgressBar()}

          {/* Hiển thị câu hỏi */}
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginVertical: 10,
              color: 'black',
            }}>
            {data[currentQuestion]?.question}
          </Text>
          {/* Hiển thị các item  */}
          <FlatList
            key={item => item.id}
            data={data[currentQuestion]?.options}
            renderItem={renderItem}
            numColumns={2}
          />

          {/* Hiển thị điểm số  */}
          <Modal
            visible={showScoreModal}
            transparent={true}
            animationType={'slide'}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                marginVertical: 20,
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  width: '90%',
                  borderRadius: 20,
                  padding: 20,
                  alignItems: 'center',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {score > data.length / 2 ? 'Đạt' : 'Chưa đạt'}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: score > data.length / 2 ? 'green' : 'red',
                      marginLeft: 10,
                      marginTop: 4,
                    }}>
                    {score}
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: score > data.length / 2 ? 'green' : 'red',
                      marginLeft: 10,
                      marginTop: 4,
                    }}>
                    / {data.length}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => resertQuestion()}
                  style={{
                    width: '80%',
                    height: 60,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red',
                    marginLeft: 10,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                    Chơi lại
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('homeScreen')}
                style={{
                  width: 145,
                  height: 38,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'green',
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  Trò chơi khác
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={NextQuestion}
              style={{
                backgroundColor: 'grey',
                width: 145,
                height: 38,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Bỏ qua
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onclickItem_}
              style={{
                backgroundColor: backgroundColor,
                width: 145,
                height: 38,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 50,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Kiểm tra
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            loader: {
              height: 70,
              backgroundColor: 'white',
              marginHorizontal: 50,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            },
          }}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../img/ngu.png')}
          />
          <ActivityIndicator size={40} color={'black'} />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: 'black',
              textAlign: 'center',
            }}>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
};

export default Xemay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#red',
    justifyContent: 'center',
    marginVertical: 60,
  },
  itemContainer: {
    width: width / 2 - 40,
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
    marginTop: 20,
  },
  text: {
    color: '#000',
    fontWeight: '700',
    margin: 8,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 10,
    borderRadius: 10,
  },
  btn: item => ({
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
