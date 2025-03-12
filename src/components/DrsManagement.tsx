"use client";

import React, { useState, useRef, useEffect } from "react";

interface Doctor {
    firstName: string;
    lastName: string;
    drsId: string;
    email: string;
}

const DrsManagement = ({ 
    users, 
    setUsers,
    loggedInDoctorId 
}: { 
    users: Doctor[]; 
    setUsers: React.Dispatch<React.SetStateAction<Doctor[]>>;
    loggedInDoctorId?: string;  
}) =>  {
    const addUserDropdownRef = useRef<HTMLDetailsElement>(null);
    const [newUser, setNewUser] = useState<Doctor>({ firstName: "", lastName: "", drsId: "", email: "" });

    // ✅ Only update formData.doctors when `users` changes
    useEffect(() => {
        console.log("📌 Updated doctors list:", users);
    }, [users]);

    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = () => {
        if (!newUser.firstName || !newUser.lastName || !newUser.drsId || !newUser.email) {
            alert("All fields (First Name, Last Name, Dr ID, Email) are required.");
            return;
        }
    
        // ✅ Check if doctor with the same drsId already exists
        const doctorExists = users.some((doctor) => doctor.drsId === newUser.drsId);
        
        if (doctorExists) {
            alert("A doctor with this ID already exists.");
            return;
        }
    
        // ✅ Add doctor only if it's not a duplicate
        const updatedDoctors = [...users, newUser];
    
        setUsers(updatedDoctors); // ✅ Update the doctor list in state
        console.log("Doctors list after adding:", updatedDoctors); // Debugging log
    
        setNewUser({ firstName: "", lastName: "", drsId: "", email: "" });
    
        setTimeout(() => {
            addUserDropdownRef.current?.removeAttribute("open");
        }, 100);
    };
    

    const removeUser = (index: number) => {
        const updatedDoctors = users.filter((_, i) => i !== index);
        console.log("Removing doctor at index:", index, "Updated list:", updatedDoctors); // Debugging log
        setUsers(updatedDoctors); 
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
                        <div className="absolute left-0 w-full bg-white border shadow-lg z-10 p-4">
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
                        <p className="text-lg font-semibold dark:text-white mb-2">Associated Doctors:</p>
                        <div className="flex flex-col gap-2 mt-2 items-center">
                        {users.map((user, index) => (
                            <div key={index} className="mt-2 bg-primary text-white px-4 py-2 text-sm flex justify-between w-full max-w-2xl">
                                <span>
                                    <span className="text-black font-semibold">First name:</span> <span className="mr-4">{user.firstName}</span>
                                    <span className="text-black font-semibold">Last name:</span><span className="mr-4"> {user.lastName}</span>
                                    <span className="text-black font-semibold">ID#:</span><span className="mr-4"> {user.drsId}</span>
                                    <span className="text-black font-semibold">Email:</span><span className="mr-4"> {user.email}</span>
                                </span>
                                {/* ✅ Disable remove button if doctor is the logged-in user */}
                                {user.drsId !== loggedInDoctorId && (
                                    <button 
                                        type="button" 
                                        className="ml-4 font-bold"
                                        onClick={() => removeUser(index)}
                                    >
                                        X
                                    </button>
                                )}
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
