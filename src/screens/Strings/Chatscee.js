import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
} from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

import { getAllUserChatMessages } from "../../services/personalChat";
import axiosInstance from "../../utils/api-client";
import { COLORS } from "../../theme/themes";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import {
  convertTimestampToAmPm,
  displayMessagesByDay,
  getFileExtention,
  photoBaseUrlConcat,
  startsWithHttpOrHttps,
} from "../../Library/Common";
import { useDispatch, useSelector } from "react-redux";
import CommentInput from "../../components/form/CommentInput";
import socket from "../../utils/socket";
import { setWasabiFileUploading } from "../../store/features/user/userSlice";

const ChatScreen = ({ route }) => {
  const item = route.params;
  console.log("item", item);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector((state) => state);
  const user = state?.user?.user;
  console.log("user", user);

  const isUploading = state?.user?.isUploading;
  console.log("isUploading", isUploading);

  // this stores all the messages from the endpoint
  // we will use the 'messages' state to display omn the chat UI usinhg GiftedChats
  const [messages, setMessages] = useState([]);
  const [messagesData, setMessagesData] = useState();
  const [msgText, setMsgText] = useState("");
  const [incomingMessage, setIncomingMessage] = useState();
  const [fetchingMessage, setFetchingMessage] = useState(false);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [visible, setIsVisible] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState(null);

  // socket states
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  console.log("isSocketConnected", isSocketConnected);

  // List of valid image extensions
  const validExtensions = ["png", "jpeg", "jpg"];

  console.log("messages", messages);
  console.log("messagesData", messagesData);
  console.log("incomingMessage", incomingMessage);

  let reverseMessages = [];
  if (messages) {
    reverseMessages = [...messages].reverse();
  }

  const displayMessagesBySpecificDay = displayMessagesByDay(messages);

  const options = {
    mediaType: "mixed",
    // saveToPhotos: true,
  };

  const pickImage = async () => {
    await launchImageLibrary(options, (res) => {
      console.log("ImagePicked", res);

      if (res?.didCancel === true) {
        return;
      }

      if (res?.assets) {
        console.log("ressssss", res.assets);
        sendFileToAPI(res.assets[0].uri);

        // setImage(res?.assets[0]?.uri);
      }
    });
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#0677E8",
          },
          left: {
            backgroundColor: "#11141B",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "white",
          },
        }}
      />
    );
  };

  const sendMessageToAPI = async (message) => {
    Keyboard.dismiss();
    const messageBody = {
      recipient_id: item?.recipient?.id,
      message: message,
      file: null,
    };

    const appendMessageBody = {
      sender_id: user?.id,
      message: message,
      file: null,
      created_at: new Date(),
      read_at: null,
    };

    // append the messages array to display the new message
    // thereby making it a way real time for user experience
    setMessages((prevMessages) => [...prevMessages, appendMessageBody]);
    setMsgText("");

    try {
      await axiosInstance({
        url: "chats/messages",
        method: "POST",
        data: messageBody,
      })
        .then((res) => {
          console.log("sendMessageToAPI data", res);
          setMsgText("");

          // emit the messages to the socket
          socket.emit(res?.data);

          // setMessages(prevMessages => [...prevMessages, res?.data]);
          res?.data?.status === 201 && getAllChatMessages();
        })
        .catch((err) => {
          console.log("sendMessageToAPI Errrr", err);
        });
    } catch (error) {
      console.log("sendMessageToAPI error", error);
    }
  };

  const sendFileToAPI = async (url) => {
    Keyboard.dismiss();
    const formData = new FormData();
    const checkFileExtension = getFileExtention(url);

    validExtensions.includes(checkFileExtension[0])
      ? formData.append("file", {
          uri: url,
          name: "chat-Image.jpg",
          type: "image/jpg",
        })
      : formData.append("file", {
          uri: url,
          name: "chat-video.mp4",
          type: "video/mp4",
        });
    formData.append("message", null);
    formData.append("recipient_id", item?.recipient?.id);

    const messageBody = {
      recipient_id: item?.recipient?.id,
      message: null,
      file: url,
    };

    console.log("formData", formData);
    try {
      await axiosInstance({
        url: "chats/messages",
        method: "POST",
        data: formData,
      })
        .then((res) => {
          console.log("sendFileToAPI data", res);
          setImage(null);

          setMessages((prevMessages) => [...prevMessages, res?.data]);
          res?.data?.status === 201 && getAllChatMessages();

          // socket sending data
          const sentMsgObj = {
            from: user?.id,
            to: item?.id,
            msg: res?.data, // Send the entire response data as the message content
          };
          socket.emit("send-msg", sentMsgObj);
        })
        .catch((err) => {
          console.log("sendFileToAPI Errrr", err);
          setImage(null);
        });
    } catch (error) {
      console.log("sendFileToAPI error", error);
      setImage(null);
    }
  };

  // This function gets all the messages for that specific chat
  const getAllChatMessages = async () => {
    setFetchingMessage(true);
    try {
      await axiosInstance({
        url: `chats/messages?recipient_id=${item.recipient.id}`,
        method: "GET",
      })
        .then((res) => {
          console.log("getAllUserChatMessages data", res);
          setFetchingMessage(false);
          setMessagesData(res.data);
          setMessages(res.data.data);

          // here, i'm setting the messages array with the data from the api in this format,
          // as GiftedChat requires it so inorder to render the messages properly on the UI
          // setMessages(
          //   res?.data?.data.map((mess, i) => ({
          //     _id: i,
          //     createdAt: mess?.created_at,
          //     text: mess?.message,
          //     user: user,
          //     image: mess?.file,
          //     video: mess?.file,
          //   }))
          // );
        })
        .catch((err) => {
          console.log("getAllUserChatMessages Errrr", err);
          setFetchingMessage(false);
        });
    } catch (error) {
      console.log("getAllUserChatMessages error", error);
      setFetchingMessage(false);
    }
  };

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getAllChatMessages();
    });
    return focusHandler;
  }, []);

  // this useEffect runs and listens to the socket if there is a new message to displayed to the user
  useEffect(() => {
    socket.on("connect", () => {
      setIsSocketConnected(true);
    });

    socket.on("disconnect", () => {
      setIsSocketConnected(false);
    });

    if (socket?.connected) {
      socket?.on("msg-recieve", (msg) => {
        console.log("receivedobj: ", msg);

        // i'm setting the data that comes from the socket when there is a new message received
        setIncomingMessage(msg?.content);
        console.log("incoming", incomingMessage);
      });
    }
  }, [socket]);

  // useEffect(() => {
  //   const refreshInterval = setInterval(() => {
  //     if (!isSocketConnected) {
  //       // If the socket is not connected, refresh the useEffect
  //       getAllChatMessages();
  //     }
  //   }, 10000); // Adjust the interval as needed (e.g., every 3 seconds)

  //   return () => {
  //     clearInterval(refreshInterval);
  //   };
  // }, [isSocketConnected]);

  // using this useEffect to append the original messages array
  // listens to when there is an incomingMessage object
  useEffect(() => {
    incomingMessage &&
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
  }, [incomingMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.groupInfo}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("Messages", { screen: "Message" })
            }
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={
                item?.picture
                  ? {
                      uri: startsWithHttpOrHttps(item?.picture)
                        ? item?.picture
                        : photoBaseUrlConcat(item?.picture),
                    }
                  : {
                      uri: startsWithHttpOrHttps(item?.recipient?.picture)
                        ? item?.recipient?.picture
                        : photoBaseUrlConcat(item?.recipient?.picture),
                    }
              }
              style={{
                width: 44,
                height: 44,
                marginRight: 10,
                borderRadius: 20,
              }}
            />
            <View>
              <Text style={{ color: "white", fontWeight: "700", fontSize: 20 }}>
                @{item?.username ? item?.username : item?.recipient?.username}
              </Text>
              <Text
                style={{
                  color: "#BBBBBB",
                  fontWeight: "500",
                  fontSize: 14,
                  marginTop: 6,
                }}
              >
                Online
              </Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 10 }}>
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
                    {cur.day}
                  </Text>
                  {cur?.messages?.map((mess, i) => (
                    <View key={i}>
                      <View
                        style={[
                          styles.chatArea,
                          {
                            flexDirection:
                              mess?.sender_id === user?.id
                                ? "row-reverse"
                                : "row",
                            alignSelf:
                              mess?.sender_id == user?.id
                                ? "flex-end"
                                : "flex-start",
                            alignItems: "flex-start",
                            backgroundColor:
                              mess?.sender_id === user?.id
                                ? "#0677E8"
                                : "#11141B",
                            padding: mess?.file ? 0 : 10,
                          },
                        ]}
                      >
                        <View>
                          {!mess.file ? (
                            <Text
                              style={
                                mess.sender_id == user.id
                                  ? styles.fromUserText
                                  : styles.recipientText
                              }
                            >
                              {mess.message}
                            </Text>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                setIsVisible(true);
                              }}
                            >
                              <Image
                                style={{
                                  height: 150,
                                  width: 250,
                                  borderRadius: 7,
                                }}
                                source={{ uri: mess.file }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>

                        <ImageView
                          images={[{ uri: mess?.file }]}
                          imageIndex={0}
                          visible={visible}
                          onRequestClose={() => setIsVisible(false)}
                        />
                      </View>
                      <Text
                        style={[
                          styles.messageTime,
                          {
                            flexDirection:
                              mess?.sender_id === user?.id
                                ? "row-reverse"
                                : "row",
                            alignSelf:
                              mess?.sender_id == user?.id
                                ? "flex-end"
                                : "flex-start",
                            alignItems: "flex-start",
                          },
                        ]}
                      >
                        {convertTimestampToAmPm(mess?.created_at)}
                      </Text>
                    </View>
                  ))}
                </View>
              ))
            : null}
        </ScrollView>

        {fetchingMessage && <ActivityIndicator size="large" color="white" />}

        {/* Textinput Section */}
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <TouchableOpacity style={styles.sendBtn} onPress={pickImage}>
            <Ionicons name="add" size={20} color={COLORS.formBtn} />
          </TouchableOpacity>
          <CommentInput
            value={msgText}
            width={1.35}
            rightIcon={msgText == "" ? "" : "paper-plane-outline"}
            placeholderTextColor="#ccc"
            placeholder="    Write now ..."
            onChangeText={(txt) => {
              setMsgText(txt);
            }}
            handlePasswordVisibility={() => {
              sendMessageToAPI(msgText);
            }}
            height={14}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  input: {
    backgroundColor: COLORS.appBackgroundColor,
    color: "white",
    height: 60,
  },
  backBtn: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 35,
    height: 35,
    padding: 4,
    marginRight: 20,
  },
  groupInfo: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingTop: 10,
    marginLeft: 20,
    marginBottom: 20,
    alignItems: "center",
    alignContent: "center",
  },
  sendBtn: {
    backgroundColor: "#292C35",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 5,
    height: 40,
    width: 40,
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  senderSection: { backgroundColor: "red" },
  inboxSection: {
    backgroundColor: "red",
  },
  inboxText: {
    color: "green",
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
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  recipientText: {
    color: "white",
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
  inputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 24,
    backgroundColor: COLORS.black,
  },
});

<ScrollView contentContainerStyle={{ padding: 10 }}>
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
          {cur?.messages?.map((mess, key) => (
            <View key={key}>
              <View
                style={[
                  styles.chatArea,
                  {
                    flexDirection:
                      mess?.senderId === userProfle?.user_id
                        ? "row-reverse"
                        : "row",
                    alignSelf:
                      mess?.senderId == userProfle?.user_id
                        ? "flex-end"
                        : "flex-start",
                    alignItems: "flex-start",
                    backgroundColor:
                      mess?.senderId === userProfle?.user_id
                        ? COLORS.declinedBgColor
                        : "#11141B",
                    padding: mess?.file ? 0 : 10,
                  },
                ]}
              >
                {/* displaying the message content itself here */}
                {/* <View>
                        {!mess.file ? (
                          <Text
                            style={
                              mess?.senderId == userProfle?.user_id
                                ? styles.fromUserText
                                : styles.recipientText
                            }>
                            {mess?.message}
                          </Text>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setIsVisible(true);
                            }}>
                            <Image
                              style={{
                                height: 150,
                                width: 250,
                                borderRadius: 7,
                              }}
                              source={{uri: mess?.file}}
                            />
                          </TouchableOpacity>
                        )}
                      </View> */}

                {mess?.content?.map((c, idx) => (
                  <View key={idx} style={{ flexDirection: "column" }}>
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
                              ? COLORS.declinedBgColor
                              : "#11141B",
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

                    {/* ⏰ Timestamp right below the message bubble */}
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
                ))}

                <ImageView
                  images={[{ uri: mess?.file }]}
                  imageIndex={0}
                  visible={visible}
                  onRequestClose={() => setIsVisible(false)}
                />
              </View>
            </View>
          ))}
        </View>
      ))
    : null}
</ScrollView>;
