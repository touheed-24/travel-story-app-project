import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    userInfo && (
        <div className='flex items-center gap-3 font-bold'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitials(userInfo ? userInfo.fullName : "")}
        </div>

            <div className='mr-4 md:mr-8'>
                <p className='text-sm'>{userInfo.fullName || ""}</p>
                <button className='text-sm text-slate-700 underline font-medium' onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
  );
}

export default ProfileInfo