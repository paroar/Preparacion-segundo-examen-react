import styled from "styled-components";
import defaultImg from "../images/room-1.jpeg";
const StyledHero = styled.header<{ img: string }>`
  min-height: 60vh;
  /* background: url(${defaultImg}); */
  background: url(${props => (props.img ? props.img : defaultImg)});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default StyledHero;
