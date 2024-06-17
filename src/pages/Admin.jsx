import AdminTable from "../components/web/AdminTable";
// import AdminBox from "../components/notifications/DashboardBox";

export const Admin = () => {
    
    return (
        <div className="bg-cover bg-gray-100" > 
            <div className="hidden md:block">
                <AdminTable />
            </div>
            {/* <div className="block md:hidden">
                <AdminBox />
            </div> */}
        </div>
    )
}
