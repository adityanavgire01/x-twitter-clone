import { getUsers } from "@/actions/user.action";
import GetExplore from "@/components/GetExplore";
import React from "react";

const Explore = async () => {
  const users = await getUsers(6);
  return <GetExplore users={users} />;
};

export default Explore;
