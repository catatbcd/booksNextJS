import classes from './button.module.css';
function Button(props) {
    const { color , form, form1} = props;
//colors
/* Colours */
const red = classes.red;
const teal = classes.teal;
const sky = classes.sky;
const black = classes.black;
const gray = classes.gray;
const orange = classes.orange;
const pink = classes.pink;
const green = classes.green;
const blue = classes.blue;
const yellow = classes.yellow;
const purple = classes.purple;
const circular =classes.circular;
const block = classes.block;
let colorClass;
let formClass;
let form1Class;
if(color==="red")colorClass=red;
if(color==="teal")colorClass=teal;
if(color==="sky")colorClass=sky;
if(color==="black")colorClass=black;
if(color==="gray")colorClass=gray; 
if(color==="orange")colorClass=orange;
if(color==="pink")colorClass=pink;
if(color==="green")colorClass=green;
if(color==="blue")colorClass=blue;
if(color==="yellow")colorClass=yellow;
if(color==="purple")colorClass=purple; 
if(form==="circular")formClass=circular;
if(form==="block")formClass=block;
if(form1==="circular")form1Class=circular;
   
  return (
    <button onClick={props.onClick} className={`${classes.btn} ${colorClass} ${formClass} ${form1Class}`} >
      {props.text}
    </button>
  );
}
export default Button;
