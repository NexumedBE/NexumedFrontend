"use client";

import React, { useState, useRef, useEffect } from "react";

const DrsManagement = ({ users, setUsers, formData, setFormData }: { 
    users: any[]; 
    setUsers: any;
    formData: any;
    setFormData: any;
}) => {
    const addUserDropdownRef = useRef<HTMLDetailsElement>(null);
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", drsId: "", email: "" });

    // Sync users with formData when it changes
    useEffect(() => {
        setFormData((prevFormData: any) => ({ ...prevFormData, doctors: users }));
    }, [users, setFormData]);

    // Log formData after it has been updated
    useEffect(() => {
        console.log("tttttttttttttt", formData);
    }, [formData]);

    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = () => {
        if (!newUser.firstName || !newUser.lastName || !newUser.drsId || !newUser.email) {
            alert("All fields (First Name, Last Name, Dr ID, Email) are required.");
            return;
        }

        setUsers((prevUsers: any) => [...prevUsers, newUser]);
        setNewUser({ firstName: "", lastName: "", drsId: "", email: "" });

        setTimeout(() => {
            addUserDropdownRef.current?.removeAttribute("open");
        }, 100);
    };

    const removeUser = (index: number) => {
        setUsers((prevUsers: any) => prevUsers.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-4 flex items-center justify-center">
                    <p className="text-lg font-semibold dark:text-white">Add Doctor</p>
                </div>
                <div className="col-span-8">
                    <details className="relative border shadow-sm" ref={addUserDropdownRef}>
                        <summary className="flex items-center justify-between cursor-pointer bg-gray-200 p-3 text-gray-700">
                            <span>Add a Doctor</span>
                        </summary>
                        <div className="absolute left-0 w-[300px] sm:w-full bg-white border shadow-lg z-10 p-4 ml-[-100px] sm:ml-0">
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder="First Name" 
                                value={newUser.firstName} 
                                onChange={handleNewUserChange} 
                                className="w-full border p-2 mb-2 bg-gray-200 text-black placeholder-black"
                            />
                            <input 
                                type="text" 
                                name="lastName" 
                                placeholder="Last Name" 
                                value={newUser.lastName} 
                                onChange={handleNewUserChange} 
                                className="w-full border p-2 mb-2 bg-gray-200 text-black placeholder-black"
                            />
                            <input 
                                type="text" 
                                name="drsId" 
                                placeholder="Dr ID" 
                                value={newUser.drsId} 
                                onChange={handleNewUserChange} 
                                className="w-full border p-2 mb-2 bg-gray-200 text-black placeholder-black"
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={newUser.email} 
                                onChange={handleNewUserChange} 
                                className="w-full border p-2 mb-2 bg-gray-200 text-black placeholder-black"
                            />
                            <button type="button" onClick={handleAddUser} className="w-full bg-primary text-white p-2">
                                Add Doctor
                            </button>
                        </div>
                    </details>
                </div>
            </div>

            {users.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <div className="text-center w-full max-w-2xl">
                        <p className="text-lg font-semibold dark:text-white mb-2">Added Doctors:</p>
                        <div className="flex flex-col gap-2 mt-2 items-center">
                            {users.map((user, index) => (
                                <div key={index} className="mt-2 bg-primary text-white px-4 py-2 text-sm flex justify-between w-full max-w-2xl">
                                    <span>
                                        <span className="text-black font-semibold">First name:</span> <span className="mr-4">{user.firstName}</span>
                                        <span className="text-black font-semibold">Last name:</span><span className="mr-4"> {user.lastName}</span>
                                        <span className="text-black font-semibold">ID#:</span><span className="mr-4"> {user.drsId}</span>
                                        <span className="text-black font-semibold">Email:</span><span className="mr-4"> {user.email}</span>
                                    </span>
                                    <button 
                                        type="button" 
                                        className="ml-4 font-bold"
                                        onClick={() => removeUser(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DrsManagement;