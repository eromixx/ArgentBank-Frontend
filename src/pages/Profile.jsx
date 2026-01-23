import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUsername } from '../store/authSlice'
import Account from '../components/Account'
import Input from '../components/Input'

function Profile() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  if (!user) {
    return <div>Loading...</div>
  }

  const handleEditClick = () => {
    setNewUsername(user.userName)
    setIsEditing(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateUsername(newUsername)).unwrap()
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update username:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setNewUsername('')
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Edit user info</h1>
            <form onSubmit={handleSave}>
              <Input
                label="User name:"
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
              <Input
                label="First name:"
                id="firstName"
                value={user.firstName}
                disabled
              />
              <Input
                label="Last name:"
                id="lastName"
                value={user.lastName}
                disabled
              />
              <div>
                <button type="submit" className="edit-button">Save</button>
                <button type="button" className="edit-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      
      <Account 
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      
      <Account 
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      
      <Account 
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  )
}

export default Profile