import { HashRouter, Route, Routes } from 'react-router-dom';
import CreateNote from './pages/CreateNote/CreateNote';
import Notes from './pages/Notes/Notes';
import Layout from './components/Layout/Layout';
import EditNote from './components/EditNote/EditNote';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Notes />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                    <Route path="*" element={<Notes />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;
