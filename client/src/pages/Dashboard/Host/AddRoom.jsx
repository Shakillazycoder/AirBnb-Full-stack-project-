import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import { Helmet } from "react-helmet-async";

const AddRoom = () => {
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')
  const [loading, setLoading] = useState(false)

  const handleImage = image => {
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }

    return (
        <div>
            <Helmet>
                <title>Add Room | Dashboard</title>
            </Helmet>
            <AddRoomForm handleImage={handleImage} imageText={imageText} imagePreview={imagePreview} loading={loading} setLoading={setLoading}></AddRoomForm>
        </div>
    );
};

export default AddRoom;