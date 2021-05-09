import styled from '@emotion/styled'
import {
  Box,
  createStyles,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../../constant/paths'
import { useCurrUser, useSignOut } from '../../services/auth/auth-query'
import { numberWithCommas } from '../../utils/helper'
import Space from '../commons/Space'
const Layout = styled.div`
  background-color: rgba(212, 123, 120, 1);
  display: flex;
  align-items: baseline;
  flex: 1;
  flex-flow: row;
  width: calc(100% - 30px);
  padding: 15px;
`
const Right = styled.div`
  margin-left: auto;
  align-self: center;
  > .space-warpper {
    display: flex;
    align-items: center;
    flex-flow: row;
  }
`

const Title = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px rgba(0,0,0,0.5)',
    },
  }),
)(Typography)

const NavBar = () => {
  const { data: user } = useCurrUser()
  const { mutate: signOut } = useSignOut()

  return (
    <Layout>
      <Title>Tom Manager</Title>
      <Right>
        <Space>
          <Title style={{ fontSize: 24 }}>{`Hello: ${user?.name}`}</Title>
          <Title style={{ fontSize: 24 }}>
            {`Your Balance: ${numberWithCommas(user?.balance || 0)}`}
          </Title>
          <Box>
            <Link
              to={paths.signIn()}
              style={{
                textDecoration: 'none',
              }}
              onClick={() => {
                signOut()
              }}
            >
              <Typography
                style={{
                  fontSize: 22,
                  color: 'WindowText',
                  fontWeight: 'bold',
                }}
              >
                Sign Out
              </Typography>
            </Link>
          </Box>
        </Space>
      </Right>
    </Layout>
  )
}
export default NavBar
