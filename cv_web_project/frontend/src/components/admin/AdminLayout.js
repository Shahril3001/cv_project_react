import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import ScrollUp from '../../ScrollUp';

const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <div className="main">
                <Outlet />
                <ScrollUp />
            </div>
            <AdminFooter />
        </>
    )
}
export default AdminLayout