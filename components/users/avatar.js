import Image from "next/image";
function Avatar(props) {
  return (
    <label class="avatars">
      <input
        onClick={props.onClick(props.value)}
        type="radio"
        name="avatar"
        value={props.value}
      />
      <Image
        src={props.src}
        alt={props.alt}
        width={50}
        className={props.class}
        height={50}
      />
    </label>
  );
}
export default Avatar;
