import React from 'react';

const FileInput = ({onChange, name, image}) => (
        <>
            <input name={name} onChange={onChange} accept="image/*" type="file" />
            <h4>Image: {image?.name}</h4>
        </>
)

export default FileInput;