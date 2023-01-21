import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

const CategoryDropDown = (props) => {
  const state = useSelector((state) => state?.category?.categoryList);
  const allCategory = state?.map((category) => {
    return { value: category?._id, label: category?.title };
  });

  const handleChange = (value) => {
    props.onChange("category", value.label);
  };

  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <Select
      onChange={handleChange}
      onBlur={handleBlur}
      options={allCategory}
      value={props.value.label}
      id="category"
    />
  );
};

export default CategoryDropDown;
