<<<<<<< HEAD
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../app/globals.css";
import Link from "next/link";
import { FileInput } from "../components/Input";
import { LayoutDashboard, Users, Search } from "lucide-react";
=======
// src/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fetchSkills, fetchUsersBySkill, submitRequest } from '../api';
import { Card, CardHeader, CardContent, CardTitle } from '../components/RequestCard';
import Link from 'next/link';
import { LayoutDashboard, Users } from 'lucide-react';
import { User } from '../models/user';
import { useUser } from '../app/page';
>>>>>>> 4bc52a43549975a5fa37d9ab307b41cbd9c83d4b

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { username } = useUser();
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
<<<<<<< HEAD
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
=======
    const getSkills = async () => {
      try {
        const skillsData = await fetchSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching skills:', error);
>>>>>>> 4bc52a43549975a5fa37d9ab307b41cbd9c83d4b
      }
    };

    getSkills();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      if (selectedSkill) {
        setLoading(true);
        try {
          const usersData = await fetchUsersBySkill(selectedSkill);
          setFilteredUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUsers();
  }, [selectedSkill]);

  const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(event.target.value);
  };

  const handleRequestClick = (user: User) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
    setDescription('');
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmitRequest = async () => {
    if (selectedUser && username && description) {
      const requestData = {
        requesterUsername: username,
        targetUsername: selectedUser.username,
        title: `Request from ${username} to ${selectedUser.username}`,
        description,
      };

      try {
        await submitRequest(requestData);
        alert('Request submitted successfully');
        handleClosePopup();
      } catch (error) {
        alert('Failed to submit request');
      }
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg rounded-r-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">MyDashboard</h1>
        </div>
        <nav className="mt-6">
<<<<<<< HEAD
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Profile
=======
          <Link href="/dashboard">
            <a className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
              <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
              Dashboard
            </a>
          </Link>
          <Link href="/profile">
            <a className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
              <Users className="inline-block w-5 h-5 mr-2" />
              Profile
            </a>
>>>>>>> 4bc52a43549975a5fa37d9ab307b41cbd9c83d4b
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <header className="bg-white shadow-sm rounded-lg mb-4 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
<<<<<<< HEAD
            <div className="relative">
              <FileInput
                type="text"
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6">
          {/* Content grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <h2 className="text-xl font-semibold">Skill Category</h2>
              <p className="text-gray-600">
                Description of the skill category.
              </p>
            </div>
            {/* Repeat similar cards as needed */}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-end pr-6 pb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md transition-all duration-200 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
=======
            <select
              value={selectedSkill}
              onChange={handleSkillChange}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a skill</option>
              {skills.map(skill => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="text-center col-span-3">Loading users...</p>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{user.username}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Username: {user.username}</p>
                    <p className="text-sm">Skills: {user.skills.join(', ')}</p>
                    <button
                      onClick={() => handleRequestClick(user)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Request
                    </button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center col-span-3">No users found for the selected skill.</p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
>>>>>>> 4bc52a43549975a5fa37d9ab307b41cbd9c83d4b
      </main>

      {showPopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Request {selectedUser.username}</h2>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full border rounded-md p-2 mb-4"
              placeholder="Enter description"
            />
            <div className="flex justify-end">
              <button
                onClick={handleClosePopup}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;