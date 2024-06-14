import DashboardTable from "../components/notifications/DashboardTable";
import DashboardBox from "../components/notifications/DashboardBox";

export const Dashboard = () => {
    
    return (
        <div className="bg-cover bg-gray-100" > 
            <div className="hidden md:block">
                <DashboardTable />
            </div>
            <div className="block md:hidden">
                <DashboardBox />
            </div>
        </div>
    )
}
