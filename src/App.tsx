import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
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
import ProtectedRoutes from "./components/ProtectedRoutes";

const App: React.FC = () => {

    return (
        <HashRouter>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRoutes>
                                <Notes/>
                            </ProtectedRoutes>
                        }/>
                        <Route path="/create" element={
                            <ProtectedRoutes>
                                <CreateNote/>
                            </ProtectedRoutes>
                        }/>
                        <Route path="/edit/:id" element={
                            <ProtectedRoutes>
                                <EditNote/>
                            </ProtectedRoutes>
                        }/>
                        <Route path="/update" element={
                            <ProtectedRoutes>
                                <UpdateProfile/>
                            </ProtectedRoutes>
                        }/>
                        <Route path="/dashboard" element={
                            <ProtectedRoutes>
                                <Dashboard/>
                            </ProtectedRoutes>
                        }/>
                        <Route path="/auth" element={
                            <ProtectedRoutes>
                                <Auth/>
                            </ProtectedRoutes>}/>

                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<LogIn/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>


                        <Route path="*" element={<Notes/>}/>

                    </Routes>
                </Layout>
            </AuthProvider>
        </HashRouter>
    );
};

export default App;
