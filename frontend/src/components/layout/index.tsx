import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import NavBar from './Navbar'
import SideMenu from './SideMenu'
const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: max-content auto;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: max-content auto;

  main,
  aside {
    height: 100%;
    width: 100%;
  }
  main {
    > div {
      padding: 20px;
    }
  }
  aside {
    width: 300px;
    background-color: rgb(211, 230, 224);
    > div {
      padding: 15px 0;
      > div,
      > a {
        padding: 10px 30px;
      }
    }
  }
`

interface LayoutProps {}
const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const { children } = props
  return (
    <Wrapper>
      <nav>
        <NavBar />
      </nav>
      <Container>
        <aside>
          <SideMenu />
        </aside>
        <main>
          <div>{children}</div>
        </main>
      </Container>
    </Wrapper>
  )
}
export default Layout
