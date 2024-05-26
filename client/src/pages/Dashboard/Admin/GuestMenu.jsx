import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from '../../../components/Dashboard/MenuItem'
import useRole from '../../../hooks/useRole'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import HostModal from '../../../components/Modal/HostModal'


const GuestMenu = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [role] = useRole()
  const [isModelOpen, setIsModelOpen] = useState(false)

  const closeModal = () => {
    setIsModelOpen(false)
  }

  const HandleModal = async() => {
    console.log('click modal');
    try{
      setIsModelOpen(true)
      console.log('click modal');
      const unserInfo = {
        email: user?.email,
        role: "guest",
        status: 'Requested'
      }
      const {data} = await axiosSecure.put('/user', unserInfo)
      console.log(data);
      if(data.modifiedCount > 0){
        toast.success('Success! Please wait for admin confirmation')
      } else {
        toast.success('Please! Please wait for admin approval')

      }

    }catch (err){
      console.log(err);
      toast.error('Please! Please wait for admin approval')

    } finally {
      setIsModelOpen(false)
    }
  }


  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-booking'
      />

      {role === 'guest' && <div className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span onClick={() => setIsModelOpen(true)} className='mx-4 font-medium'>Become A Host</span>
      </div>}
      <HostModal isOpen={isModelOpen} closeModal={closeModal} HandleModal={HandleModal}/>
    </>
  )
}

export default GuestMenu