import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {UserProvider, useUserContext} from "../lib/UserContext";
import Login from "./login";
import Dashboard from "./dashboard";
import {useContext, useEffect} from "react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // @ts-ignore
    const { user } = useUserContext()

  return (
      <>
        {user ? <Dashboard /> : <Login />}
      </>
  )
}

export default Home
