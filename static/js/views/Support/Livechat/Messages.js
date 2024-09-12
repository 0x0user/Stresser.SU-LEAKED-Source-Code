import { useState, useEffect, useRef } from "react";
import ChatCloseBtn from "../../../assets/media/rcw-close-white.png";
import ChatSend from "../../../assets/media/rcw-send.png";
import ChatImage from "../../../assets/media/rcw-image.png";
import ChatAvatar from "../../../assets/media/rcw-avatar2.png";
import ScrollableFeed from "react-scrollable-feed";
import { useTranslation } from "react-i18next";
import Linkify from "react-linkify";
import uploadImage from "../../../helpers/Upload";
import Zoom from "react-medium-image-zoom";
import { UPLOAD_URL_PATH } from "../uploadPath";

export const Messages = ({
  setOpen,
  setEvent,
  ws,
  messages,
  setMessages,
  showTextarea,
}) => {
  const [messageBody, setMessageBody] = useState("");
  const { i18n } = useTranslation();

  const { fileRef, imgLink, setImgLink, handleFileChange, handleFileRef } =
    uploadImage();

  const textAreaRef = useRef(null);
  const containerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutHandler = useRef(null);

  const sendMessage = (file = null) => {
    if (!file && !messageBody) return;
    let payload = {
      body: !file ? messageBody : file,
      sender: "client",
      type: !file ? "text" : "image",
      is_read: false,
      sent_at: new Date(),
    };
    ws.send("SEND", payload);
    let updatedMessages = messages.map((row) => {
      return { ...row, ["is_read"]: true };
    });
    setMessages([...updatedMessages, payload]);
    setMessageBody("");
    setEvent(null);
  };

  useEffect(() => {
    if (!imgLink) return;
    sendMessage(imgLink);
    setImgLink(null);
  }, [imgLink]);

  useEffect(() => {
    if (ws.event === null) return;
    if (ws.event.code !== "DELETE_MESSAGE") return;
    setMessages(messages.filter((row) => row.id !== parseInt(ws.event.id)));
    setEvent(null);
  }, [ws.event, messages]);

  const sendMessageByKey = (event) => {
    if (event.which === 13 && !event.shiftKey && messageBody) {
      sendMessage();
    }
  };

  const useAutosizeTextArea = () => {
    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "0px";
        const scrollHeight = textAreaRef.current.scrollHeight;
        textAreaRef.current.style.height = scrollHeight + "px";
      }
    });
  };

  useAutosizeTextArea();

  const handleChange = (e) => {
    let value = e.target.value;
    value = value == "\n" ? value.replace("\n", "") : value;
    setMessageBody(value);
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(() => {
      if (value === "") {
        ws.send("STOP_TYPING");
      } else {
        ws.send("START_TYPING", value);
      }
    }, 500);
  };

  return (
    <div
      id="rcw-conversation-container"
      className="rcw-conversation-container active"
      aria-live="polite"
    >
      <div className="rcw-header">
        <h4 className="rcw-title">{i18n.t("livechat.title")}</h4>
        <button className="rcw-close-button" onClick={() => setOpen(false)}>
          <img src={ChatCloseBtn} className="rcw-close" alt="close" />
        </button>
      </div>
      <div id="messages" className="rcw-messages-container" ref={containerRef}>
        <ScrollableFeed>
          {ws.open &&
          ws.event !== null &&
          ["RESOLVED", "DELETE"].includes(ws.event.code) ? (
            <div className="rcw-reconnect">
              <p>{i18n.t("livechat.resolved")}</p>
              <p>
                <small>{i18n.t("livechat.new")}</small>
              </p>
            </div>
          ) : ws.event !== null &&
            ["CONVERT_TICKET"].includes(ws.event.code) ? (
            <div className="rcw-reconnect">
              <p>{i18n.t("livechat.ticket.text")}</p>
              <p>
                <small>
                  <a href={`/support?show=${ws.event.id}`}>
                    Ticket #{ws.event.id}
                  </a>
                </small>
              </p>
              <a
                className="btn btn-confirm"
                type="button"
                href={`/support?show=${ws.event.id}`}
              >
                <span className="fa fa-arrow-right" />{" "}
                {i18n.t("livechat.ticket.btn")}
              </a>
            </div>
          ) : ws.event !== null && ["OFFLINE"].includes(ws.event.code) ? (
            <div className="rcw-reconnect">
              <p>{i18n.t("livechat.offline.title")}</p>
              <p>
                <small>{i18n.t("livechat.offline.text")}</small>
              </p>
              <a className="btn btn-confirm" type="button" href={`/support`}>
                <span className="fa fa-plus" /> {i18n.t("livechat.offline.btn")}
              </a>
            </div>
          ) : ws.load ? (
            <div className="rcw-reconnect">
              <p>{i18n.t("livechat.loading")}</p>
            </div>
          ) : ws.open && !ws.load ? (
            messages.map((message, index) => {
              let messageBox =
                message.sender === "client" ? (
                  <div className="rcw-message rcw-message-client" key={index}>
                    <div className="rcw-client">
                      {message.type === "image" ? (
                        <Zoom>
                          <img
                            alt={index}
                            src={`${UPLOAD_URL_PATH}${message.body}`}
                            className="rcw-message-image"
                          />
                        </Zoom>
                      ) : (
                        <div className="rcw-message-text">
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key
                            ) => (
                              <a target="_blank" href={decoratedHref} key={key}>
                                <u>{decoratedText}</u>
                              </a>
                            )}
                          >
                            <p>{message.body}</p>
                          </Linkify>
                        </div>
                      )}
                      <span className="rcw-timestamp">
                        {new Date(message.sent_at).toLocaleTimeString(
                          undefined,
                          {
                            timeStyle: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="rcw-message " key={index}>
                    <img
                      src={ChatAvatar}
                      className="rcw-avatar "
                      alt="profile"
                    />
                    <div className="rcw-response">
                      {message.type === "image" ? (
                        <Zoom>
                          <img
                            alt={index}
                            src={`${UPLOAD_URL_PATH}${message.body}`}
                            className="rcw-message-image"
                          />
                        </Zoom>
                      ) : (
                        <div className="rcw-message-text">
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key
                            ) => (
                              <a target="_blank" href={decoratedHref} key={key}>
                                <u>{decoratedText}</u>
                              </a>
                            )}
                          >
                            <p>{message.body}</p>
                          </Linkify>
                        </div>
                      )}
                      <span className="rcw-timestamp">
                        {new Date(message.sent_at).toLocaleTimeString(
                          undefined,
                          {
                            timeStyle: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                );
              return messageBox;
            })
          ) : (
            <div className="rcw-reconnect">
              <p>{i18n.t("livechat.failed")}</p>
              {ws.event !== null && (
                <p>
                  <small>
                    {i18n.t("livechat.event")} : {ws.event.code}
                  </small>
                </p>
              )}
              <button
                className="btn btn-confirm"
                type="button"
                onClick={() => ws.connect()}
              >
                <span className="fa fa-wifi" />{" "}
                {i18n.t("livechat.btn.reconnect")}
              </button>
            </div>
          )}
        </ScrollableFeed>
        <div className="loader">
          <div className="loader-container">
            <span className="loader-dots" />
            <span className="loader-dots" />
            <span className="loader-dots" />
          </div>
        </div>
      </div>
      {ws.open && showTextarea && (
        <div className="rcw-sender">
          <div className="rcw-new-message">
            <textarea
              cols={40}
              rows={1}
              ref={textAreaRef}
              onChange={handleChange}
              onKeyDown={(e) => {
                sendMessageByKey(e);
                !isTyping && setIsTyping(true);
              }}
              value={messageBody}
              name="message"
              dir="auto"
              autoCapitalize="off"
              className="rcw-input"
              placeholder={i18n.t("livechat.placeholder")}
              onKeyUp={() => {
                setTimeout(() => {
                  setIsTyping((t) => (t ? false : t));
                }, 1000);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="rcw-send"
            onClick={(e) => handleFileRef(e)}
          >
            <img src={ChatImage} className="rcw-send-icon" alt="Send" />
          </button>
          <input
            ref={fileRef}
            type="file"
            onChange={(e) => handleFileChange(e)}
            hidden
          />
          <button
            type="submit"
            className="rcw-send"
            onClick={() => sendMessage()}
          >
            <img src={ChatSend} className="rcw-send-icon" alt="Send" />
          </button>
        </div>
      )}
    </div>
  );
};
