import { Outlet } from 'react-router-dom';
import GuestHeader from './GuestHeader';
import GuestFooter from './GuestFooter';
import ScrollUp from '../../ScrollUp';

const GuestLayout = () => {
    return (
        <>
            <GuestHeader />
            <div className="main">
                <Outlet />
                <ScrollUp />
            </div>
            <GuestFooter />
        </>
    )
}
export default GuestLayout