import PropTypes from 'prop-types'
import UpdateUserModal from '../Modal/UpdateUserModal'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()
  const {user: loggedInUser} = useAuth()


 const {mutateAsync} = useMutation({
    mutationFn: async  role => {
      const {data} = await axiosSecure.patch(`/users/update/${user?.email}`, role)
      return data
    },
    onSuccess: () => {
      toast.success('User updated successfully')
      setIsOpen(false)
      refetch()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
 
 })



  const modalHandler = selected => {
    console.log('user selected', selected);
    const user = {
        role: selected,
        status: "Verified",
  
    }
    mutateAsync(user)
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button disabled={loggedInUser?.email === user?.email} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span onClick={() => setIsOpen(true)} className='relative'>Update Role</span>
        </button>
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} modalHandler={modalHandler} />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow