import { Avatar } from "@mui/material"
interface ImageAvatarProps {
  src: string;
}

const ImageAvatar = ( {src } : ImageAvatarProps) =>{
  return(
    <Avatar alt="Remy Sharp" src={src} />
  )
}
export default ImageAvatar