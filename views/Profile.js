import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon,
} from 'native-base';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {fetchGET} from '../hooks/APIHooks';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';
import {mediaURL} from '../constants/urlConst';

const deviceHeight = Dimensions.get('window').height;


const Profile = (props) => {
  const [user, setUser] = useState({
    userdata: {},
    avatar: 'https://',
  });
  const userToState = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      console.log("Hello",userFromStorage);
      const uData = JSON.parse(userFromStorage);
      const avatarPic = await fetchGET('tags', 'avatar_' + uData.user_id);
      console.log('avpic', avatarPic);
      let avPic = '';
      if (avatarPic.length === 0) { // if avatar is not set
        avPic = 'https://placekitten.com/1024/1024';
      } else {
        avPic = mediaURL + avatarPic[0].filename;
      }
      setUser((user) => (
        {
          userdata: uData,
          avatar: avPic,
        }));
    } catch (e) {
      console.log('Profile error: ', e.message);
    }
  };

  useEffect(() => {
    userToState();
  }, []);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  console.log('ava', mediaURL + user.avatar);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Icon name='person'/>
            <Text>Username: {user.userdata.username}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <AsyncImage
                style={{
                  width: '100%',
                  height: deviceHeight / 3,
                }}
                spinnerColor='#777'
                source={{uri: user.avatar}}
              />
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Fullname: {user.userdata.full_name}</Text>  
              <Text numberOfLines={1}>email: {user.userdata.email}</Text>
            </Body>
          </CardItem>
        {/* host*/}
        <CardItem footer bordered>
          <Body>
            <Button full onPress={() => {
              props.navigation.push('Upload');
            }}>
              <Text>Upload place for renting</Text>
              <Icon name='add-circle'/>
            </Button>
            <Button full warning onPress={() => {
              props.navigation.push('MyFiles');
            }}>
              <Text>My places</Text>
              <Icon name='business'/>
            </Button>
          </Body>
        </CardItem>
        {/* ------- */}
          <CardItem footer bordered>
            <Body>
            <Button full info 
              onPress={
                () => {
                  props.navigation.push('ModifyUserInfo', {user: user});
                }
              }
            >
          
          <Text>Update user info</Text>  
          <Icon name='create'/>
          </Button>
              <Button full danger onPress={signOutAsync}>
              
                <Text>Logout</Text>
                <Icon name='log-out'/>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
