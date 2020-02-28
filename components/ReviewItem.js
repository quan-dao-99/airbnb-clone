import React, { useEffect, useState, } from 'react';
import { H3, Text, View, } from 'native-base';
import { AsyncStorage, StyleSheet } from 'react-native';
import { fetchGET } from "../hooks/APIHooks";
import UserAvatar from "./UserAvatar";

const ReviewItem = props => {
  const [username, setUsername] = useState('');
  const review = props.item;

  const getReviewUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await fetchGET('users', review.user_id, token);
      setUsername(user.username);
    } catch (e) {
      console.log('getReviewUserInfo error', e);
    }
  };

  useEffect(() => {
    getReviewUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <UserAvatar userId={review.user_id} avatarStyle={styles.imageAvatar} iconStyle={styles.imageIcon}/>
        <View style={styles.userInfoAndDate}>
          <H3>{username}</H3>
          <Text>{review.time_added}</Text>
        </View>
      </View>
      <View>
        <Text>
          {review.comment}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.09)',
    width: '100%',
    paddingVertical: 20,
  },
  userInfoSection: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfoAndDate: {
    marginLeft: 15,
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  imageIcon: {
    fontSize: 50,
    color: 'black',
  },
});

export default ReviewItem;