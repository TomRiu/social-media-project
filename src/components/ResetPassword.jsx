import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../Redux/Auth/auth.action';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, newPassword));
    }

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {auth.loading && <p>Loading...</p>}
            {auth.error && <p className="error">{auth.error}</p>}
            {auth.message && <p className="success">{auth.message}</p>}
        </div>
    );
}

export default ResetPassword;
