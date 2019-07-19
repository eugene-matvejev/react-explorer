import styled from 'styled-components';

export const TileHeader = styled.h1`
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
`

export const TileWrapper = styled.section`
  overflow: hidden;
  background: ${props => (props.tileColour === "green" && "#4AD964") || 
                (props.tileColour === "red" && "#EB6161" ) || 
                (props.tileColour === "amber" && '#F2CC66') || 
                "grey"};
  padding: 3em;
  margin: 50px auto 0px;
  width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;

  &:hover {
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
  }
`

export const TileExpander = styled.button`
  
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`