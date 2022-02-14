import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import firebase from 'firebase/compat/app';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    );

    const [recipientSnapshot] = useCollection(
        db
            .collection('users')
            .where('email', '==', getRecipientEmail(chat.users, user))
    );

    const ScrollToBotttom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start",
        });
    }
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else{
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
 
        // Update the last seen...
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, 
        {merge: true }
      );

      db.collection('chats').doc(router.query.id).collection('messages').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          user: user.email,
          photoURL: user.photoURL,
      });

      setInput("");
      ScrollToBotttom();
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <div className="">
      <header className="flex sticky top-0 bg-white z-10 justify-between items-center p-4 h-20 border-b-[1px] border-[#f5f5f5]">
            <ArrowBackIcon onClick={router.back} className="text-gray-700 mr-4 cursor-pointer visible sm:invisible" />
            {recipient ? (
                <Avatar src={recipient?.photoURL} />
              ):(  
                <Avatar>{recipientEmail[0]}</Avatar>
            )}


          <div className="flex-1 ml-4">
            <h3 className="font-bold">{recipientEmail}</h3>
            {recipient? (
                <p className="text-xs text-gray-500">last active: {' '}
                    {recipient?.lastSeen?.toDate() ? (
                      <TimeAgo datetime={recipient?.lastseen?.toDate()} /> 
                    ): "unavailable"}
                </p>
                ):(
                <p className="text-xs text-gray-500">Loading Last active...</p>
            )}
          </div>
          <div className="">
              <IconButton>
                <AttachFileIcon />    
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
          </div>
      </header>

      <div className="p-6 bg-[#e5ded8] min-h-[90vh]">
            {showMessages()}
            <div ref={endOfMessagesRef} className="mb-14"></div>
      </div>

      <form className="flex items-center p-2 sticky bottom-0 bg-white z-100">
        <InsertEmoticonIcon />
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 outline-none border-none rounded-md p-2 bg-[#f5f5f5] mx-4" />
        <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send Message</button>
        <MicIcon />
      </form>
    </div>
  )
}

export default ChatScreen;
