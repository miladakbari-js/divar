import { useQuery } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import { getProfile } from "src/services/user"
import PageNotFound from "src/pages/404"
import AdminPage from "src/pages/AdminPage"
import AuthPage from "src/pages/AuthPage"
import DashboardPage from "src/pages/DashboardPage"
import HomePage from "src/pages/HomePage"


function Router() {

  const {data , isLoading , error} = useQuery(["profile"] , getProfile);
  // console.log({data , isLoading , error});

  // if(isLoading) return <h3>Loading ...</h3>

  return (
   <Routes>
    <Route index element={<HomePage/>}/>
    <Route path="/auth" element={<AuthPage/>}/>
    <Route path="/dashboard" element={<DashboardPage/>}/>
    <Route path="/admin" element={<AdminPage/>}/>
    <Route path="/*" element={<PageNotFound/>}/>
   </Routes>
  )
}

export default Router