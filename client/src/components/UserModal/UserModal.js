import React from 'react'

function UserModal() {
    
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    };

  return (
    <Box>
         <Modal open={openModal} color onClose={handleModal}>
                <form onSubmit={handleSubmit} >
                    <Typography variant='h6'>Edit Profile Information</Typography>
                    <TextField variant='outlined' name='first name' handleChange={handleChange} value={currentUser.result.firstName} ></TextField>
                    <TextField name='last name' handleChange={handleChange} value={currentUser.result.lastName} ></TextField>
                    <TextField name='email' handleChange={handleChange} value={currentUser.result.email} ></TextField>
                    <div className='fileInput'>
                        <FileBase type='file' multiple={false} onDone={({base64}) => setUserData({ ...userData, profilePicture: base64})}/>
                    </div>
                    <Button type='submit' variant='contained'>Submit</Button>
                </form>
            </Modal>
    </Box>
  )
}

export default UserModal