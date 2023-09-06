import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  Modal,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Item from "./HabitCell.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

habitData = [
  {
    name: "물 마시기",
    img: require("../assets/water.png"),
    explain: "우리 몸이 물을 원하고 있어요!!\n 물 보충 해주실래요?",
    certified: "머그컵, 텀블러 사진",
  },
  {
    name: "공부하기",
    img: require("../assets/eng.png"),
    explain: "오공완.\n 오늘도 공부 완료.",
    certified: "영단어장 사진",
  },
  {
    name: "헬스장 가기",
    img: require("../assets/run.png"),
    explain:
      "날이 좋아서, 날이 좋지 않아서, 날이 적당해서\n 모든 날이 헬스장가기 좋아요!",
    certified: "저장된 장소에서 인증",
  },
  {
    name: "하루계획 세우기",
    img: require("../assets/task.png"),
    explain: "오늘 하루 명예 J가 되어볼까요?",
    certified: "My 습관목록에서 하루습관을 체크",
  },
  {
    name: "영양제 먹기",
    img: require("../assets/drugs.png"),
    explain:
      "<이 포스팅은 HaBIG 파트너스 활동의 일환으로,\n 이에 따른 사용자의 습관형성을 제공합니다.>",
    certified: "영양제 사진",
  },
  {
    name: "청소하기",
    img: require("../assets/vacuum.png"),
    explain:
      "의자에 옷 걸쳐둔 거 다 알아요.\n 걸을 때 하나씩 뭐가 걸리는거 다 알아요.",
    certified: "청소기 사진",
  },
  {
    name: "반려견 산책",
    img: require("../assets/dog.png"),
    explain: "산책? 산책가까? 산책가자!!",
    certified: "목줄 사진",
  },
  {
    name: "책읽기",
    img: require("../assets/book.png"),
    explain:
      "사각사각 책을 넘기는 소리, 저는 정말 좋아하는데요.\n 그래서 저는 ...더보기",
    certified: "책 표지 사진 (e북 고려 중)",
  },
  {
    name: "헬스장가기",
    img: require("../assets/gym.png"),
    explain: "오운완 말고 오인완 해봐요.\n 오늘도 (자동)인증 완료!",
    certified: "위치 저장하고 후에 방문 시 위치인증 완료",
  },
  {
    name: "명상하기",
    img: require("../assets/meditation.png"),
    explain:
      "지쳤던 나의 마음을 달래며,\n 생각하고, 생각하고, 깊이 생각해봐요.",
    certified: "요가매트 사진",
  },
];

function change_habit(urls, habitname) {
  const newachieve = {
    name: habitname,
  };

  axios
    .post("http://localhost:8000" + urls, JSON.stringify(newachieve), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  // fetch("https://localhost:8000" + urls, {
  //   method: "POST",
  //   body: JSON.stringify(newachieve),
  // })
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

export default function SelectScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [bChecked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedcertified, setSelectedcertified] = useState();
  const [selectedexplain, setSelectedexplain] = useState();
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => (
          setModalVisible(!modalVisible),
          setSelectedId(item.name),
          setSelectedexplain(item.explain),
          setSelectedcertified(item.certified)
        )}
        //체크 초기설정값
        Checked={bChecked}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        change_habit={change_habit}
      />
    );
  };

  // const listItems = ({ checkedItems }) => {
  //   if (checkedItems.size != 0) {
  //     checkedItems.map((checkedItems) => <Text>뿡{checkedItems}</Text>);
  //   }
  // };

  return (
    // <View style={styles.headerStyle}>
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
          },
        ]}
      >
        <View style={styles.headerStyle}/>
        <View style={styles.top}>
          <Text
            style={{
              margin: 10,
              fontSize: 35,
              fontWeight: "bold",
              marginLeft: "5%",
              textAlign: "center",
            }}
          >
            HaBIG
          </Text>
        </View>

        <View style={styles.middle}>
          <Text
            style={{
              margin: 20,
              textAlign: "left",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            습관 선택하기
          </Text>
          <View style={styles.header}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  width: wp("95%"),
                }}
                data={habitData}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
              />
            </View>
          </View>
        </View>

        {/* 모달창 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {selectedId}
              </Text>
              <Text style={styles.modalText}>{selectedexplain}</Text>
              <Text style={styles.modalText}>인증: {selectedcertified}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Text>{checkedItems}</Text>
        <View style={(backgroundColor = "red")}>
          <Text>Qnd</Text>
          <Text>{listItems}</Text>
        </View> */}

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.finishbutton} onPress={() => {
              navigation.navigate('Home2')
              // navigation.pop()
            }}>
            <Text
              style={{ fontWeight: "bold", textAlign: "center", color: "black" }}
            >
              완료
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
  );
}

const StatusBarHeight =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    height: StatusBarHeight,
  },
  top: {
    flex: 0.7,
  },
  middle: {
    flex: 7,
    backgroundColor: "white",
    marginBottom: 50,
  },
  bottom: {
    // flex: 0.7,
    height: StatusBarHeight + 30,
    justifyContent: "center",
    borderStyle: "solid",
    marginBottom: 30,
    alignItems: "center",
    borderColor: "rgba(255, 251, 241, 3)",
    borderTopWidth: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#ffce57",
  },
  buttonOpen: {
    backgroundColor: "#ffce57",
  },
  buttonClose: {
    backgroundColor: "#ffce57",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  endbutton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  finishbutton: {
    padding: 10,
    width: wp("95%"),
    alignItems: "center",
    backgroundColor: "#ffce57",
    borderRadius: 100,
  },
});