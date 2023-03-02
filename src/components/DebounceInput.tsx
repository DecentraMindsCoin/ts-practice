import axios from "axios";
import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { stateProps } from "@/pages";

interface IProps extends stateProps {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  score?: number;
}
type InputEvent = ChangeEvent<HTMLInputElement>;
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const DebounceInput = (_props: IProps) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const apiUrl = `https://api.github.com/search/users?q=${debouncedSearch}`;
    try {
      const getUsers = async () => {
        setLoading(true);
        const userObject = axios.get(apiUrl);
        const user = await userObject;
        setUsers(user.data.items);
        setLoading(false);
        console.log(users);
      };
      {
        debouncedSearch ? getUsers() : setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearch]);

  console.log(users);
  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        onChange={(e: InputEvent) => setSearch(e.target.value)}
      />
      {loading && <p>Loading...</p>}

      <ul>
        {users.map((person) => {
          const {
            login,
            id,
            node_id,
            avatar_url,
            gravatar_id,
            url,
            html_url,
            followers_url,
            following_url,
            gists_url,
            starred_url,
            subscriptions_url,
            organizations_url,
            repos_url,
            events_url,
            received_events_url,
            type,
            site_admin,
            score,
          } = person;

          return (
            <li key={id}>
              <p>{login}</p>
              <p>{repos_url}</p>
              <img src={avatar_url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DebounceInput;
