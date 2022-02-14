import React from 'react';
import {Avatar, Button, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import Chat from './Chat';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt(
            "Please enter an email address for the user you wish to chat with"
        );
        if(!input) return null;

        if(
            EmailValidator.validate(input) && 
            !chatAlreadyExists(input) && 
            input != user.email) {
            
                // We need to add the chat into the DB 'chats' collection
                db.collection('chats').add({
                users: [user.email, input]
            });
        }
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) => 
            chat.data().users.find(user => user == recipientEmail?.length > 0)
        );

    return (
        <div className="flex-[0.45] border-r-[1px] border-[#f5f5f5] min-w-72 max-w-80">
            <header className="flex sticky top-0 bg-white z-10 justify-between items-center p-4 h-20 border-b-[1px] border-[#f5f5f5]">
                <Avatar src={user.photoURL} onClick={() => auth.signOut()} className="m-3 cursor-pointer hover:opacity-[0.8]"/>
                <div className="">
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
              </header>

              <div className="flex items-center p-5 rounded-md">
                <SearchIcon />
                <input className="outline-none border-none flex-1 ml-1" placeholder="Search in chats" />
              </div>

              <Button onClick={createChat} className="w-full border-t-2 border-b-2 border-[#f5f5f5]">
                Start a new chat
              </Button>

          {/* Chats */}
          {chatsSnapshot?.docs.map(chat => (
              <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </div>
  )
}

export default Sidebar;
