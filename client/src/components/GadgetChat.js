import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";

//Handles the AI chat functionality, and displays it as a chat system
const GadgetChat = () => {
  const [convo, setConvo] = useState([]);
  const [promptLoaded, setPromptLoaded] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const convoScroll = useRef(null);

  //Fetches a new bot response from the backend using a user prompt
  const fetchBotresponse = (prompt) => {
    fetch(`/api/botResponse/` + prompt)
      .then((res) => res.json())
      .then((data) => {
        setConvo([
          ...convo,
          { speaker: "user", text: prompt },
          { speaker: "bot", text: data.botRes },
        ]);
        setPromptLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Conversation ref={convoScroll}>
        {promptLoaded &&
          convo.map((message) => {
            convoScroll.current.scrollTo(0, convoScroll.current.scrollHeight);
            return (
              <SpeechBubble speaker={message.speaker}>
                {message.text}
              </SpeechBubble>
            );
          })}
      </Conversation>

      <TextForm
        onSubmit={(ev) => {
          ev.preventDefault();
          setPromptValue("");
          fetchBotresponse(promptValue);
        }}
      >
        <UserInput
          onChange={(ev) => setPromptValue(ev.target.value)}
          value={promptValue}
        />
      </TextForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 50px;
  width: 400px;
  height: 500px;
  border: 2px solid var(--color-headline);
  background: white;
  border-radius: 5px;
`;
const Conversation = styled.div`
  height: 90%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
const SpeechBubble = styled.p`
  color: black;
  width: 50%;
  border-radius: 10px;
  padding: 5px;
  background-color: ${(props) =>
    props.speaker === "user" ? "var(--color-card)" : "var(--color-button)"};
  color: var(--color-paragraph);
  align-self: ${(props) =>
    props.speaker === "user" ? "flex-end" : "flex-start"};
  margin: 5px;
  text-align: left;
`;
const UserInput = styled.input`
  width: 90%;
  border: 4px solid var(--color-card);
`;
const TextForm = styled.form`
  height: 10%;
`;

export default GadgetChat;
