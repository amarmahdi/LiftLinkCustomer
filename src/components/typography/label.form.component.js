/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components/native'

const FormLabel = styled.Text`
    color: ${(props) => props.theme.colors.text.primary};
    font-size: ${(props) => props.size === 'small' ? props.theme.fontSizes.caption : props.theme.fontSizes.button};
    font-family: ${(props) => props.theme.fonts.title2};
`

export const LabelFormComponent = ({ children, size }) => {
  return (
    <FormLabel size={size}>
      {children}
    </FormLabel>
  )
}
