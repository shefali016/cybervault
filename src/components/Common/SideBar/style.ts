import styled from 'styled-components'
import { Badge } from 'reactstrap';
export const HamburgerIcon = styled.button`
    background: transparent;
    padding: 0;
    margin: 0;
    --size: 40px;
    height: var(--size);
    width: var(--size);
    line-height: var(--size);
    border: none;
    position: absolute;
    top: 8.5px;
    left: 10px;
`

export const SidebarLogo = styled.div`
    padding: 15px;
    text-align: center;
`
export const Logo = styled.img`
    width: 100%;
`

export const StyledBadge = styled(Badge)`
    background-color: var(--colorWhite);
    color: var(--colorDarkBlue);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    display: block;
    border-radius: 25px;
`