import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({id, users}) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email', '==', getRecipientEmail(users, user))
    );

    const enterChat = () => {
      router.push(`/chat/${id}`);
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);
  return (
    <div onClick={enterChat} className="flex items-center cursor-pointer p-4 break-words hover:bg-[#e9eaeb]">
        {recipient ? (
            <Avatar src={recipient?.photoURL} className="m-1 mr-4" />
        ):(
            <Avatar className="m-1 mr-4" />
        )}
      <p>{recipientEmail}</p>
    </div>
  )
}

export default Chat;