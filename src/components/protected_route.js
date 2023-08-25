import IsAuthenticated from '../hooks/is_anonymous';

const NotLoggedIn = e => {

    return <div className="p-2">
        <h1>Not Logged In</h1>
    </div>
}

const ProtectedComponent = component => {
    const is_user = IsAuthenticated();
    return is_user ? <component /> : <NotLoggedIn />
    
}

export default ProtectedComponent