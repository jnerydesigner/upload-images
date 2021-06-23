import styled from "styled-components";
import Dropzone from 'react-dropzone';



export const Container = styled.div.attrs({
  classNmae: 'propstyle'
})`
.propstyle{
  background: #fff;
}
  width: 600px;
  height: 300px;
  background: #6c5ce7;
  border: 2px dashed #b2bec3;

  
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ::before{
    content: '';
    border: 2px dashed #b2bec3;
    width: 580px;
    height: 280px;
    position: absolute;
    top: 10;    
    left: 50%;
    transform: translateX(-50%);   
    border-radius: 5px; 
  }
`;
export const DropzoneArea = styled(Dropzone)`
  
`;

export const UploadMessage = styled.p`
  color:#b2bec3;
  font-size: 22px;
`;