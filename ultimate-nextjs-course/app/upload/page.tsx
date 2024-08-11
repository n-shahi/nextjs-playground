'use client';

import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResultInfo {
    public_id: string;
}

const UploadPage = () => {
    const [publicId, set_publicId] = useState('')
    return (
        <>
        {publicId && <CldImage src={publicId} width={200} height={200} alt='An Image'/>}
        <CldUploadWidget
            uploadPreset="eqemjbxp"
            options={{
                multiple: true,
                maxFiles: 2,
                sources: ['local'],
                styles:{
                    palette: {
                        window: "#10173a",
                        sourceBg: "#20304b",
                        windowBorder: "#7171D0",
                        tabIcon: "#79F7FF",
                        inactiveTabIcon: "#8E9FBF",
                        menuIcons: "#CCE8FF",
                        link: "#72F1FF",
                        action: "#5333FF",
                        inProgress: "#00ffcc",
                        complete: "#33ff00",
                        error: "#cc3333",
                        textDark: "#000000",
                        textLight: "#ffffff"
                    },
                }
            }}
            onSuccess={(result, widget) => {
                if (result.event !== 'success') return
                const info = result.info as CloudinaryResultInfo;
                set_publicId(info.public_id)
            }}
        >
            {({ open }) => {
                return (
                    <button onClick={() => open()} className='btn btn-outline'>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
        </>
    )
}

export default UploadPage
