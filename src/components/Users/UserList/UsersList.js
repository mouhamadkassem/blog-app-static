import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlice";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        <UsersListHeader />
        <div class="container px-4 mx-auto">
          <UsersListItem />
        </div>
      </section>
    </>
  );
};

export default UsersList;
