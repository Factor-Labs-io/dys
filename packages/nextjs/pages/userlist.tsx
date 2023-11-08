// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import UserList from '../components/UserList';


const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Chris", age: 30 },
    { id: 4, name: "Alex", age: 30 },
    { id: 5, name: "Bridge", age: 30 },
];

const Userlist: NextPage = () => {
    return (
        <>
            <MetaHeader />
            <div className="flex items-center flex-col flex-grow lg:pt-10 pt-0">
                <UserList users={users} />
            </div>
        </>
    );
};

export default Userlist;
