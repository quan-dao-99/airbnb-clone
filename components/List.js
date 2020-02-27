/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from "react";
import { List as BaseList, Spinner, View, Text } from "native-base";
import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia, getUserMedia } from "../hooks/APIHooks";
import PropTypes from "prop-types";
import { AsyncStorage, StyleSheet,  } from "react-native";
import ImageCover from "./ImageCover";
import { ScrollView } from "react-native-gesture-handler";
import Tags from "../components/Tags";
import Title from "./Title";

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [loading, setLoading] = useState(true);
  const getMedia = async mode => {
    try {
      console.log("mode", mode);
      const allData = await getAllMedia();
      const token = await AsyncStorage.getItem("userToken");
      const myData = await getUserMedia(token);
      setMedia({
        allFiles: allData.reverse(),
        myFiles: myData
      });
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getMedia(props.mode);
  }, []);

  console.log("hello", media.allFiles[0]);

  return (
    <View>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {props.mode === "all" && (
            <ScrollView>
              <Tags />
              <ImageCover />
              <Title />
              <View style={styles.container}>
                {media.allFiles.map((item, index) => (
                  <ListItem
                    key={index}
                    navigation={props.navigation}
                    singleMedia={item}
                    mode={props.mode}
                    getMedia={getMedia}
                  />
                ))}
              </View>
            </ScrollView>
          )}
          {props.mode === "myfiles" && (
            <BaseList
              dataArray={media.myFiles}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  navigation={props.navigation}
                  singleMedia={item}
                  mode={props.mode}
                  getMedia={getMedia}
                />
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
  }
});

List.propTypes = {
  navigation: PropTypes.object,
  mode: PropTypes.string
};

export default List;
