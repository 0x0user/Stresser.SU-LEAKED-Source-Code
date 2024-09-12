import React, { useState, useEffect, useRef } from "react";
import ChatOpen from "../../../assets/media/rcw-open.png";
import ChatClose from "../../../assets/media/rcw-close.png";
import { Messages } from "./Messages";
import { UserLocal } from "../../../helpers/UserLocal";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ChatTokenAction from "../../../requests/Utils/Chat";
import song from "../../../assets/media/chat-message.oga";
import { CHAT_TOKEN_CLEAR_STATE } from "../../../store/Chat/types";

const ChatSupport = () => {
  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [isConnectionOpen, setConnectionOpen] = useState(false);

  const [init, setInit] = useState(false);

  const [messages, setMessages] = useState([]);

  const [socketLoad, setSocketLoad] = useState(false);

  const [socketEvent, setSocketEvent] = useState(null);

  const [showTextarea, setShowTextarea] = useState(true);

  const ws = useRef(null);

  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const waitForSocketConnection = (socket, callback) => {
    setTimeout(function () {
      if (socket.readyState === 1) {
        if (callback !== undefined) {
          callback();
        }
        return;
      } else {
        waitForSocketConnection(socket, callback);
      }
    }, 5);
  };

  const sendToSocket = (action, content = null) => {
    let payload = {
      action: action,
    };
    if (content !== null) {
      payload = { ...payload, content: content };
    }
    waitForSocketConnection(ws.current, function () {
      if (ws.current === null) return;
      ws.current.send(JSON.stringify(payload));
    });
  };

  const widget = {
    class: !isOpen
      ? "rcw-widget-container rcw-close-widget-container"
      : "rcw-widget-container",
    img: {
      class: !isOpen ? "rcw-open-launcher" : "rcw-close-launcher",
      alt: !isOpen ? "Close chat" : "Open chat",
      src: !isOpen ? ChatOpen : ChatClose,
    },
    onClick: () => setOpen(!isOpen ? true : false),
  };

  const user_id = UserLocal.get("user_id");
  let user_token = Cookies.get("CHAT_TOKEN") ?? null;
  let lang = Cookies.get("language") ?? "en";

  useEffect(() => {
    if (chat.loaded || user_token || !user_id) return;
    dispatch(ChatTokenAction());
  }, [user_id, user_token, chat, dispatch]);

  useEffect(() => {
    if (!chat.loaded) return;
    window.location.reload();
    dispatch({ type: CHAT_TOKEN_CLEAR_STATE });
  }, [chat, dispatch]);

  useEffect(() => {
    if (isConnectionOpen || !user_token) return;
    let retrySocket = setInterval(() => {
      connectSocket();
    }, 30000);
    return () => {
      clearInterval(retrySocket);
    };
  }, [chat, isConnectionOpen, user_token]);

  const connectSocket = () => {
    setSocketLoad(true);
    setSocketEvent(null);

    ws.current = new WebSocket(
      `wss://${window.location.hostname}/wss/?token=${user_token}&command=customer_request&user_id=${user_id}&lang=${lang}`
    );

    ws.current.onopen = () => {
      setConnectionOpen(true);
      setSocketLoad(false);
    };

    ws.current.onclose = () => {
      setConnectionOpen(false);
      setSocketLoad(false);
      setMessages([]);
    };

    ws.current.onmessage = (event) => {
      if (ws.current === null) return;

      if (event.data === "PING") {
        sendToSocket("PONG");
        return;
      }

      const data = JSON.parse(event.data);

      if (data["code"] !== undefined) {
        let log = true;

        switch (data["code"]) {
          case "RESOLVED":
          case "DELETE":
          case "CLEAR":
            setMessages([]);
            break;
          case "CONVERT_TICKET":
          case "OFFLINE":
            setMessages([]);
            setShowTextarea(false);
            break;
          case "KILLALL":
            ws.current = null;
            setMessages([]);
            break;
          case "READY":
            setShow(true);
            log = false;
            break;
          case "BAN":
            setShow(false);
            ws.current = null;
            setMessages([]);
            log = false;
            break;
          case "ONLINE":
            setShowTextarea(true);
            break;
          case "INVALID_TOKEN":
            Cookies.remove("CHAT_TOKEN");
            break;
        }

        if (log) {
          setSocketEvent(data);
        }

        return;
      }

      if (!Array.isArray(data) && !document.hasFocus()) {
        if (data.sender === "admin") {
          const sound = new Audio(song);
          sound.play();
        }
      }

      setMessages(
        data?.[Symbol.iterator]
          ? [...data]
          : (_messages) => [..._messages, data]
      );
      setSocketEvent(null);
    };
  };

  useEffect(() => {
    if (!user_token || init) return;
    connectSocket();
    setInit(true);
  }, [user_token, init]);

  const unread_nb = messages.filter(
    (row) => row.sender === "admin" && row.is_read === false
  ).length;

  return (
    show && (
      <div className={widget.class}>
        {isOpen && (
          <Messages
            setOpen={setOpen}
            setEvent={setSocketEvent}
            ws={{
              current: ws.current,
              connect: connectSocket,
              open: isConnectionOpen,
              load: socketLoad,
              event: socketEvent,
              send: sendToSocket,
            }}
            messages={messages}
            setMessages={setMessages}
            showTextarea={showTextarea}
          />
        )}
        <button
          type="button"
          className="rcw-launcher"
          aria-controls="rcw-chat-container"
          onClick={widget.onClick}
        >
          {!isOpen && unread_nb > 0 && (
            <span className="notify-badge">{unread_nb}</span>
          )}
          <img
            src={widget.img.src}
            className={widget.img.class}
            alt={widget.img.alt}
          />
        </button>
      </div>
    )
  );
};

export default ChatSupport;
