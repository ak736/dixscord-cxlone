import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  // useEffect(() => {
  //   db.collection('channels').onSnapshot((snapshot) => 
  //     setChannels(
  //       snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       channel: doc.data(),
  //     }))
  //     )
  //   );
  // }, []);

  useEffect(() => {
    const channelsCollection = collection(db, 'channels');
    const unsubscribe = onSnapshot(channelsCollection, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

//   const handleAddChannel = () => {
//     const channelName = prompt("Enter a new channel name");

//     if(channelName){
//       db.collection('channels').add({
//         channelName: channelName
//       });
    
//     }
// }
const [channelName, setChannelName] = useState('');
const handleAddChannel = async (e) => {
  e.preventDefault();
  const channelName = prompt("Enter a new channel name");
  if (channelName) {
    try {
      const docRef = await addDoc(collection(db, 'channels'), {
        channelName: channelName
      });
      console.log('Document written with ID:', docRef.id);
      setChannelName('');
    } catch (e) {
      console.error('Error adding document:', e);
    }
  }
};

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>Developer Boys</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channel</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>

        <div className="sidebar__channelsList">
        {channels.map(({id, channel}) => (
          <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
        ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="Large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
            <InfoIcon />
            <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo}/>
        <div className="sidebar__profileInfo">
          <h3>{user.name}</h3>
          <p>#{user.uid.substring(0, 4)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetMicIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
