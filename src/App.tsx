import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import Layout from './components/Layout';
import EditNote from './components/EditNote';
import Auth from "./pages/Auth";
import CreateNote from "./pages/CreateNote";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UpdateProfile from "./pages/Auth/UpdateProfile";
import Dashboard from "./pages/Auth/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <Layout>
                    <Routes>

                        <Route path="/" element={<Notes/>}/>
                        <Route path="/create" element={<CreateNote/>}/>
                        <Route path="/edit/:id" element={<EditNote/>}/>
                        <Route path="/auth" element={<Auth/>}/>
                        {/*new components*/}
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<LogIn/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/update" element={<UpdateProfile/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>

                        <Route path="*" element={<Notes/>}/>

                    </Routes>
                </Layout>
            </AuthProvider>
        </HashRouter>
    );
};

export default App;
