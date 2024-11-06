import { Outlet } from 'react-router-dom';
import SeekerHeader from './SeekerHeader';
import SeekerFooter from './SeekerFooter';
import ScrollUp from '../../ScrollUp';

const SeekerLayout = () => {
    return (
        <>
            <SeekerHeader />
            <div className="main">
                <Outlet />
                <ScrollUp />
            </div>
            <SeekerFooter />
        </>
    )
}
export default SeekerLayout