import React, { useEffect, useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import AuthWrapper from '../Components/AuthWrapper';
import ProfileContent from '../Components/ProfileContent';

const Profile: React.FC = () => <AuthWrapper Component={ProfileContent} />;
console.log("Profile");
export default Profile;
