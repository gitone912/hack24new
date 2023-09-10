import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useChangeUserPasswordMutation } from '../../services/userAuthApi';
import { getToken } from '../../services/LocalStorageService'


const ChangePassword = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [changeUserPassword] = useChangeUserPasswordMutation()
  const { access_token } = getToken()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
    }
    const res = await changeUserPassword({ actualData, access_token })
    if (res.error) {
      console.log(res)
      setServerMsg({})
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(res.data.data.message)
      setServerError({})
      setServerMsg(res.data.data)
      document.getElementById("password-change-form").reset();
    }

  };
  // Getting User Data from Redux Store
  const myData = useSelector(state => state.user)
  // console.log("Change Password", myData)

  return <>
    {/* {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    {server_error.password2 ? console.log(server_error.password2[0]) : ""} */}
    <br />
    <br />
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 3 }}>Change Password</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
        <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
        {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
        <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm New Password" type="password" id="confirmPassword" />
        {server_error.confirmPassword ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.confirmPassword[0]}</Typography> : ""}
        <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
        </Box>
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {server_msg.message ? <Alert severity='success'>{server_msg.message}</Alert> : ''}
      </Box>
    </Box>
  </>;
};

export  {ChangePassword};
