//import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar, Platform, Dimensions, Touchable } from "react-native";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Agenda } from "react-native-calendars";
import { Calendar, LocaleConfig } from "react-native-calendars";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

let imagename = "";
let image = "";
const Tab = createBottomTabNavigator();
const postdata = async () => {
  try {
    fetch("http://192.168.0.30:8000/api/img/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgname: imagename,
        imge: image,
        // imgname: "dd",
        // imge: "https://cdn.pixabay.com/photo/2016/08/27/11/17/bag-1623898_960_720.jpg",
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  } catch (err) {
    console.log(err);
  }
};

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: "#ffce57",
        tabBarStyle: { height: 90 },
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Avatar"
        component={AvatarScreen}
        options={{
          title: "아바타",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="person"
              size={32}
              color={focused ? "#ffce57" : "grey"}
            ></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: "홈",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={32}
              color={focused ? "#ffce57" : "grey"}
            ></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={AgendaScreen}
        options={{
          title: "달력",
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="calendar"
              size={32}
              color={focused ? "#ffce57" : "grey"}
            ></Icon>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainScreen({ navigation }) {
  const [image, setImage] = useState();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  //여기부터test
  //just function to upload to server
  const pickImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result.uri);

    if (!result.canceled) {
      postToServer(result); // must be a object not array, if its array find first element if selecting only one image
      setImage(result.assets[0].uri);
    }
  };

  const postToServer = (img) => {
    const formData = new FormData();

    formData.append("photo", {
      uri: img.assets[0].uri,
      type: "image/*", // or photo.type
      name: "testPhotoName",
    });

    const options = {
      method: "POST",
      body: formData,
      // If you add this, upload won't work
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      fetch("http://192.168.45.154:8000/api/photos/", options)
        .then((response) => response.json())
        .then((result) => console.log(result));
    } catch (err) {
      console.log(err);
    }
  };

  //여기까지

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 70,
            paddingLeft: 20,
            fontWeight: "bold",
            color: "#ffce57",
          }}
        >
          HaBIG
        </Text>
        <TouchableOpacity
          style={{ alignItems: "flex-end", paddingRight: 15 }}
          onPress={() => navigation.navigate("Select")}
        >
          <Icon name="add-circle" size="70" color="#ffce57" />
        </TouchableOpacity>
      </View>
      {/* 근접센서 확인 */}
      <TouchableOpacity
        style={{ alignItems: "flex-end", paddingRight: 15, color: "red" }}
        onPress={() => {
          navigation.navigate("GyrosensorScreen");
        }}
      >
        <Text>전송</Text>
      </TouchableOpacity>
      {/* 여기까지 */}
    </View>
  );
}

const StatusBarHeight =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center'
  },
  headerStyle: {
    height: StatusBarHeight + 20,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffce57",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffce57",
    paddingBottom: 5,
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  // titleText: {
  //   fontSize: 70,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#ffce57',
  // },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  vtop: {
    flex: 1,
    paddingTop: StatusBarHeight,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

function AvatarScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle} />
      <Text>여기 아바타</Text>
    </View>
  );
}

//달력 한국버전
LocaleConfig.locales["ko_KR"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};

LocaleConfig.defaultLocale = "ko_KR";

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <View style={styles.vtop}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={""}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          month={this.state.currentMonth}
          theme={{
            selectedDayBackgroundColor: "#ffce57",
            arrowColor: "rgba(255, 251, 241, 3)",
            dotColor: "#ffce57",
            textdaycoloer: "ffce57",
            todayTextColor: "#ffce57",
            agendaColor: "#ffce57",
            agendaTodayColor: "#ffce57", //주간달력 Agenda 오늘날짜 색
            agendaKnobColor: "#ffce57", //주간->월간 달력으로 볼 수 있게 내리는 기능 색
          }}
        />
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5); //3+1로 하면 빈 메모 안뜸
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "확인용 습관 목록  " + strTime, // 위에 코드랑 + '#' + j  추가
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

export default HomeScreen;
