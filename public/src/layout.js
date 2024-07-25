import React from 'react';
import ChatbotButton from './components/ChatbotButton';

const Layout = ({ children }) => {
    return (
        <div>
            {children}
            <ChatbotButton />
        </div>
    );
};

export default Layout;