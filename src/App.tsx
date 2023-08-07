import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import Notes from './pages/Notes';
import Layout from './components/Layout';
import EditNote from './components/EditNote';
import Auth from "./pages/Auth";

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
