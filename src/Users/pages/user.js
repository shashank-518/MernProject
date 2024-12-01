import React from "react";
import UserList from "../components/UserList";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "SHASHANK",
      image:
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
      count: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default User;
