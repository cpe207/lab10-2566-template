"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { UserCard } from "@/components/UserCard";
import { cleanUser } from "@/libs/cleanUser";

    }
    if (!isFirstLoad) {
      const strTasks = JSON.stringify(genAmount);
      localStorage.getItem("task", strTasks);
    }
  }, [genAmount]);

  useEffect(() => {
    const strTasks = JSON.parse(localStorage.getItem("task"));
    if (strTasks == null) {
      return;
    }
    setGenAmount(parseInt(strTasks));
    const fetchData = async () => {
      setIsLoading(true);
      const resp = await axios.get(
        `https://randomuser.me/api/?results=${strTasks}`
      );
      const users = resp.data.results.map(cleanUser);
      setUsers(users);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results.map(cleanUser);
    setUsers(users);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(e.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users &&
        !isLoading &&
        users.map((user) => (
          <UserCard
            name={user.name}
            imgUrl={user.imgUrl}
            address={user.address}
            email={user.email}
          />
        ))}
    </div>
  );
}
