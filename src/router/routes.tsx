
import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import SettingsHome from "@/features/settings/components/settings-home";
import SettingsHome1 from "@/features/settings/components/settings-home1";
import NotFoundError from "@/pages/errors/NotFoundError";
import Users from "@/pages/users/Users";
import SetPassword from "@/pages/SetPassword";
import Inbox from "@/features/inbox/components/inbox";
import Articles from "@/pages/articles/Articles";
import Actions from "@/pages/actions/Actions";
import Action from "@/pages/actions/Action";
import Persona from "@/pages/persona/Persona";
import Messenger from "@/pages/channels/Messenger";
// import ChatPage from "@/features/inbox/components/chat-page";
import ChatInbox from "@/features/inbox/components/chat-inbox";
import GettingStarted from "@/pages/dashboard/getting-started";
import Customers from "@/pages/customers/customers";
const AccountVerification = lazy(() => import('@/pages/AccountVerification'));

const PrivateRoute = lazy(() => import('./PrivateRoute'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Roles = lazy(() => import('@/pages/roles/Roles'));
const Role = lazy(() => import('@/pages/roles/Role'));
const OAauth2RedirectHandler = lazy(() => import('@/features/auth/components/oauth2-redirect-handler'));

const AppRouter = () =>{
    return (
        <>

        <Suspense fallback={<>Loading ...</>}>
            <Routes>
                
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verfiy-user" element={<AccountVerification />} />
                <Route path="/invite/:token" element={<SetPassword />} />
                <Route path="*" element={<NotFoundError/>} />
                <Route path="/oauth2/redirect" element={<OAauth2RedirectHandler/>} />

                {/* Protected routes */}
                <Route element={<PrivateRoute/>}>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Dashboard/>}/>
                                                
                        <Route path="/set" element={<SettingsHome/>}/>
                        <Route path="/set1" element={<SettingsHome1/>}/>
                        {/* <Route path="/article" element={<ArticleFrom/>}/> */}
                        <Route path="/articles" element={<Articles/>}/>
                        <Route path="/actions" element={<Actions/>}/>
                        <Route path="/action" element={<Action/>}/>
                        <Route path="/action/:actionId" element={<Action/>}/>
                        <Route path="/inbox/:conversationId" element={<ChatInbox/>}/>
                        <Route path="/inbox" element={<ChatInbox/>}/>
                        <Route path="/inbox1" element={<Inbox/>}/>
                        <Route path="/ai-agent" element={<Persona/>}/>
                        <Route path="/getting-started" element={<GettingStarted/>}/>
                        <Route path="/contact" element={<Customers/>}/>
                 

                        <Route path="/settings">
                        <Route index element={<SettingsHome1/>}/>
                        <Route path="roles" element={<Roles/>}/>
                        <Route path="roles/new" element={<Role/>}/>
                        <Route path="roles/:roleId/edit" element={<Role/>}/>
                        <Route path="users" element={<Users/>}/>               
                        <Route path="channels/messenger" element={<Messenger/>}/>               
                        </Route>

                    </Route>
                </Route>
            </Routes>
        </Suspense>
        </>
    )
}

export default AppRouter