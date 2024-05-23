import PropTypes from "prop-types";
import queryString from 'query-string';
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const category = params.get('category')

 const handleClick = () => {
   let CurrentQuery = {category: label}
   const url = queryString.stringifyUrl({
    url: '/',
    query: CurrentQuery,
   })

  //  url output ---> /?category=label
   navigate(url)
 }



  return (
    <div
    onClick={handleClick}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${category === label && "border-b-red-500} text-red-500 hover:text-red-400"}`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
