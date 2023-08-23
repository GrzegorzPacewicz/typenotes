import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import Layout from './components/Layout';
import EditNote from './components/EditNote';
import CreateNote from "./pages/CreateNote";
import SignUp from "./pages/Dashboard/SignUp";
import LogIn from "./pages/Dashboard/LogIn";
import ForgotPassword from "./pages/Dashboard/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Notes/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/create" element={
                            <ProtectedRoute>
                                <CreateNote/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/edit/:id" element={
                            <ProtectedRoute>
                                <EditNote/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }/>

                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<LogIn/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>


                        <Route path="*" element={<Notes/>}/>

                    </Routes>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
