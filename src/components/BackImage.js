import { useState, React, useEffect } from 'react'
import styled from 'styled-components'
import UploadButtons from './UploadButton'
const BackImage = ({handleBackImageChange}) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <Wrapper>
      {selectedFile && <img src={preview} />}
      <br />
      <label htmlFor='file'>Image of Back side of Product</label>
      <br />
      <input type='file'  name='back_image'
              onChange={(e) => handleBackImageChange(e)}
              required 
               accept="image/png, image/jpeg"
               onChange={onSelectFile} />
    </Wrapper>
  )
}
const Wrapper = styled.section`
  img {
    width: 200px;
    height: 200px;
    margin: 0rem 0rem 1rem 0rem;
  }
`
export default BackImage
