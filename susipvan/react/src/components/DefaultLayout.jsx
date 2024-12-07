import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            return;
        }

        axiosClient.get('/me')
            .then(({ data }) => {
                setUser(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch user:", error);
                setUser(null);
                setToken(null);
                localStorage.removeItem('ACCESS_TOKEN');
                setLoading(false);
            });
    }, [token, setUser, setToken]);

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
                localStorage.removeItem('ACCESS_TOKEN');
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Logout failed:", error.response.data);
                } else if (error.request) {
                    console.error("Logout failed: No response received", error.request);
                } else {
                    console.error("Logout failed:", error.message);
                }
            });
    }

    if (!token) {
        return <Navigate to='/login' />
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user ? user.name : 'Loading...'}
                        <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}