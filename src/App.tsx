import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import Layout from './components/Layout';
import EditNote from './components/EditNote';
import Auth from "./pages/Auth";
import CreateNote from "./pages/CreateNote";

const App: React.FC = () => {
    return (
        <BrowserRouter  >
            <Layout>
                <Routes>
                    <Route path="/" element={<Notes/>}/>
                    <Route path="/create" element={<CreateNote/>}/>
                    <Route path="/edit/:id" element={<EditNote/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="*" element={<Notes/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
