import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthForm from './pages/AuthForm';
// Placeholder pages for now
const Home = () => <div className="p-8 text-center text-gray-700 text-2xl">Welcome to Center - Item Feed</div>;
const ItemDetail = () => <div className="p-8 text-center text-gray-700 text-2xl">Item Detail Page</div>;
const ListingForm = () => <div className="p-8 text-center text-gray-700 text-2xl">Create/Edit Listing Page</div>;
const UserProfile = () => <div className="p-8 text-center text-gray-700 text-2xl">User Profile Page</div>;
const Settings = () => <div className="p-8 text-center text-gray-700 text-2xl">Account Settings Page</div>;


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header session={session} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/list" element={<ListingForm />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<AuthForm isRegister={false} />} />
            <Route path="/register" element={<AuthForm isRegister={true} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;