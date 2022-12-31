import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './EmailVerify.scss';
import { useAppDispatch, useAppSelector } from "../../utilities/redux/hooks";
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { api } from "../../utilities/api/apiConfig";
import { getOneUser } from "../../utilities/api/users";

export const EmailVerify = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const { id: userId, token: emailToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await api.get(`/${userId}/verify/${emailToken}`)

        if (data.isExpired) {
          return navigate(`/users/${userId}/expired-link`)
        }
        localStorage.setItem('bootcamprAuthToken', data.bootCamprNewToken as string);
        const verifiedUser = await getOneUser(userId)
        dispatch(setAuthUser(verifiedUser))

        navigate(`/users/${userId}/account-setup`)
      } catch (error) {
        console.log(error)
        console.log('ERROR MSG', error)
        navigate('/sign-up')
      }
    }
    verifyEmail()
  }, [userId, emailToken])

  return (
    <div>
    </div>
  )
};