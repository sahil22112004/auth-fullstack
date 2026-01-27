import ProtectedRouteAdmin from "../components/protectedRouteAdmin";
import AdminDashboard from "./dashboard";

export default function admindashboard(){
    return (
        <>
        <ProtectedRouteAdmin>
        <AdminDashboard/>
        </ProtectedRouteAdmin>
        </>
    )
}