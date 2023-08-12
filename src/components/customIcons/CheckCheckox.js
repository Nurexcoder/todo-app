import { SvgIcon } from '@mui/material'
import React from 'react'

const CheckCheckox = ({priority}) => {
    const vairant = priority === 0 || priority === 3 ? 'white' : 'black'

    return (
        <SvgIcon >
            <path d="M0 0H24.834V24.834H0V0Z" fill={vairant} fillOpacity="0.01" />
            <path d="M21.7298 9.31276V20.1776C21.7298 21.0349 21.0349 21.7298 20.1776 21.7298H4.65638C3.79916 21.7298 3.10425 21.0349 3.10425 20.1776V4.65637C3.10425 3.79916 3.79916 3.10425 4.65638 3.10425H16.556" stroke={vairant} strokeWidth="2.0695" strokeLinecap="round" strokeLinejoin="round" />

        </SvgIcon>
    )
}

export default CheckCheckox