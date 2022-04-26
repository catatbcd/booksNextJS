import Image from "next/image";
import Button from "../../ui/button";
function UploadImage(props){
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'booksjs')
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dzvqmmme6/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
     
        props.setSrc(file.secure_url)
        props.edit();
      }
      return(
          <div>
        {!props.editImage ? (
            <div>
              <Image src={props.src} alt="Portada" width={200} height={150} />

              <Button
                text="Cambiar Imagen"
                color="gray"
                form="circular"
                onClick={props.edit}
              />
            </div>
          ) : (
            <div>
              {" "}
              <label htmlFor="src">agregar imagen:</label>
              <input  type="file" id="src" name="src"  onChange={uploadImage}/>
            
              <Button text="Cancelar" color="red" onClick={props.edit} />
            </div>
          )}</div>
      )
}

export default UploadImage