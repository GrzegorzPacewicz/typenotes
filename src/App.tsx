import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CreateNote from './pages/CreateNote/CreateNote';
import Notes from './pages/Notes/Notes';
import Layout from './components/Layout/Layout';
import EditNote from './components/EditNote/EditNote';
import Auth from "./pages/Auth/Auth";

const App: React.FC = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Notes />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<Notes />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;
