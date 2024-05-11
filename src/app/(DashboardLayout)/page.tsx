"use client"
import { useState, useEffect } from "react";
import { useFrappeGetDocList } from "frappe-react-sdk";
export default function Home() {
    const [user, setUser] = useState([]);
    const { data, isLoading, error, mutate:refetch_data } = useFrappeGetDocList("User", {
        fields: ["name"]
      })
    useEffect(() => {
        if (data) {
            console.log(data);
            setUser(data)
        }
    }, [data])
        
    return (
        <>
        {user && (user.map(i => (
            <h1 key = {i.name}>{i.name}</h1>
        )))}
        
        </>
    )
}