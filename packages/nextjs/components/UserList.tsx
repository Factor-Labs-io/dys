import React from 'react';
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

interface User {
    id: number;
    name: string;
    age: number;
}

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <div className="flex items-center flex-col flex-grow lg:pt-10 lg:w-2/3 pt-0 w-screen">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Age</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="bg-white">
                            <td className="border text-center lg:w-1/12">{user.id}</td>
                            <td className="border p-2 text-center lg:w-1/6">{user.name}</td>
                            <td className="border p-2 text-center lg:w-1/6">{user.age}</td>
                            <td className="p-2 text-center lg:w-1/6 border"><button className='btn btn-primary'>Generate</button></td>
                        </tr>
                    ))}
                </tbody>
            </table></div>

    );
};

export default UserTable;
