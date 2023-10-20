/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components/native'

const StyledBody = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  position: relative;
  align-items: center;
  justify-content: flex-start;
`

export const Container = ({ children, styles }) => {
  return (
    <>
      <StyledBody style={styles}>
        {children}
      </StyledBody>
    </>
  )
}
