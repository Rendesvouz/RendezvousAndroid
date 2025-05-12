import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import ImageView from "react-native-image-viewing";

import SafeAreaViewComponent from "../../components/common/SafeAreaViewComponent";
import MessagingHeaderTitle from "../../components/common/MessagingHeaderTitle";
import axiosInstance from "../../utils/api-client";
import {
  convertTimestampToAmPm,
  displayMessagesByDay,
} from "../../Library/Common";
import { COLORS } from "../../themes/themes";
import CommentInput from "../../components/form/CommentInput";

const StringsChattingScreen = ({ navigation, route }) => {
  const item = route?.params;
  // console.log('profileitem', item);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user?.profile;
  //   console.log('userProfle', userProfle);

  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);

  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState("");

  const roomId = item?.chatRoom?.id ? item?.chatRoom?.id : item?.id;
  //   console.log('roomId', roomId);

  const displayMessagesBySpecificDay = displayMessagesByDay(messages);
  //   console.log('displayMessagesBySpecificDay', displayMessagesBySpecificDay);

  const getAllChatRoomMessages = async () => {
    setLoading(true);
    try {
      const chatRoomMessagesResponse = await axiosInstance({
        url: `chat/messages/${roomId}`,
        method: "GET",
      });

      console.log("chatRoomMessagesResponse", chatRoomMessagesResponse?.data);
      setMessages(chatRoomMessagesResponse?.data?.data?.messages);
      setLoading(false);
    } catch (error) {
      console.log("getAllChatRoomMessages error", error?.response);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllChatRoomMessages();

      const interval = setInterval(() => {
        getAllChatRoomMessages();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  const sendMessageToAPI = async (message) => {
    Keyboard.dismiss();
    const messageBody = {
      chatRoomId: roomId,
      content: message,
    };

    const appendMessageBody = {
      senderId: userProfle?.user_id,
      content: message,
      readbyrecipient: true,
      timestamp: new Date(),
      chatRoomId: item?.chatRoom?.id,
    };

    // append the messages array to display the new message
    // thereby making it a way real time for user experience
    // setMessages(prevMessages => [...prevMessages, appendMessageBody]);
    setMsgText("");

    setMessages((prevMessages) => {
      console.log("previous", prevMessages);
      if (!prevMessages || prevMessages.length === 0) {
        return [];
      }

      // Find the chat object matching the room ID
      return prevMessages?.map((chat) => {
        if (chat?.chatRoomId === roomId) {
          const updatedContent = [
            ...chat?.content,
            {
              content: message,
              senderId: userProfle?.user_id,
              timestamp: new Date().toISOString(),
            },
          ];

          return {
            ...chat,
            content: updatedContent,
          };
        }
        return chat;
      });
    });

    try {
      await axiosInstance({
        url: "chat/send-message",
        method: "POST",
        data: messageBody,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("sendMessageToAPI data", res?.data);
          setMsgText("");

          // setMessages(prevMessages => [...prevMessages, res?.data]);
          //   res?.data?.success === 201 && getAllChatRoomMessages();

          if (res?.data?.success && res?.data?.data?.messages) {
            getAllChatRoomMessages();
          }
        })
        .catch((err) => {
          console.log("sendMessageToAPI Errrr", err?.response);
        });
    } catch (error) {
      console.log("sendMessageToAPI error", error?.response);
    }
  };

  return (
    <SafeAreaViewComponent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <MessagingHeaderTitle
              leftIcon={"arrow-back-outline"}
              onLeftIconPress={() => {
                navigation.goBack();
              }}
              headerTitle={item?.matchedUserProfile?.username}
              profileImage={item?.matchedUserProfile?.profile_pictures[0]}
              onProfilePressed={() =>
                navigation.navigate("StringsProfile", item)
              }
            />

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 10 }}
              keyboardShouldPersistTaps="handled"
            >
              {displayMessagesBySpecificDay?.length
                ? displayMessagesBySpecificDay?.map((cur, i) => (
                    <View key={i} style={{ padding: 10 }}>
                      <Text
                        style={{
                          color: "#ccc",
                          textAlign: "center",
                          fontSize: 14,
                          padding: 10,
                        }}
                      >
                        {cur?.day}
                      </Text>

                      {cur?.messages?.map((mess, key) =>
                        mess?.content?.map((c, idx) => (
                          <View key={`${key}-${idx}`}>
                            <View
                              style={[
                                styles.chatArea,
                                {
                                  flexDirection:
                                    c?.senderId === userProfle?.user_id
                                      ? "row-reverse"
                                      : "row",
                                  alignSelf:
                                    c?.senderId === userProfle?.user_id
                                      ? "flex-end"
                                      : "flex-start",
                                  alignItems: "flex-start",
                                  backgroundColor:
                                    c?.senderId === userProfle?.user_id
                                      ? COLORS.rendezvousRed
                                      : COLORS.declinedBgColor,
                                  padding: 10,
                                },
                              ]}
                            >
                              <Text
                                style={
                                  c?.senderId === userProfle?.user_id
                                    ? styles.fromUserText
                                    : styles.recipientText
                                }
                              >
                                {c?.content || "No message"}
                              </Text>
                            </View>

                            {/* ⏰ Timestamp below bubble */}
                            <Text
                              style={[
                                styles.messageTime,
                                {
                                  flexDirection:
                                    c?.senderId === userProfle?.user_id
                                      ? "row-reverse"
                                      : "row",
                                  alignSelf:
                                    c?.senderId === userProfle?.user_id
                                      ? "flex-end"
                                      : "flex-start",
                                  alignItems: "flex-start",
                                },
                              ]}
                            >
                              {convertTimestampToAmPm(c?.timestamp)}
                            </Text>
                          </View>
                        ))
                      )}
                    </View>
                  ))
                : null}
            </ScrollView>

            {/* Textinput Section */}
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                backgroundColor: "#ccc",
                alignItems: "center",
                marginBottom: 0,
              }}
            >
              <TouchableOpacity style={styles.sendBtn}>
                <Ionicons name="add" size={20} color={COLORS.rendezvousRed} />
              </TouchableOpacity>
              <CommentInput
                value={msgText}
                width={1.25}
                rightIcon={msgText == "" ? "" : "paper-plane-outline"}
                placeholderTextColor="#000"
                placeholder="Write something ..."
                onChangeText={(txt) => {
                  setMsgText(txt);
                }}
                handlePasswordVisibility={() => {
                  sendMessageToAPI(msgText);
                }}
                height={14}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaViewComponent>
  );
};

export default StringsChattingScreen;

const styles = StyleSheet.create({
  sendBtn: {
    backgroundColor: COLORS.declinedBgColor,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
  chatArea: {
    backgroundColor: "red",
    // width: windowWidth / 2,
    padding: 10,
    // marginBottom: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  fromUserText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  recipientText: {
    color: COLORS.rendezvousRed,
    fontSize: 14,
    fontWeight: "500",
  },
  messageTime: {
    color: "#ccc",
    fontSize: 10,
    alignContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 5,
  },
});
