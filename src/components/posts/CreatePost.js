import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { createPostAction } from "../../redux/slices/posts/postsSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import Dropzone from "react-dropzone";
import { useEffect } from "react";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import { Navigate } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title description is required"),
  description: Yup.string().required("description is required"),
  category: Yup.string().required("category is required"),
  image: Yup.string().required("image is required"),
});

export default function CreatePost() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(createPostAction(values));
    },
    validationSchema: formSchema,
  });

  const post = useSelector((state) => state.post);

  const { loading, serverErr, appErr, isCreated } = post;

  if (isCreated) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <>
      <div
        className="min-h-screen bg-gray-900 flex flex-col justify-center  sm:px-6 lg:px-8"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>
          {serverErr || appErr ? (
            <h2 className="text-red-500 text-center">
              {serverErr} {appErr}
            </h2>
          ) : null}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
                style={{ marginBottom: "-15px" }}
              >
                Categories
              </label>
              <CategoryDropDown
                className="mt-0"
                value={formik.values.category}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                touched={formik.touched.category}
                errors={formik.errors.category}
              />
              <div className="text-red-500">
                {formik.touched.category && formik.errors.category}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mt-5"
                >
                  put image
                </label>
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    formik.setFieldValue("image", acceptedFiles[0])
                  }
                  accept="image/png image/jpeg"
                  onBlur={formik.handleBlur("image")}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="container">
                      <div
                        {...getRootProps({
                          className: "dropzone",
                          onDrop: (event) => event.stopPropagation(),
                        })}
                      >
                        <input {...getInputProps()} name="image" />
                        <p
                          className="cursor-pointer bg-blue-100 mt-2 text-center py-4"
                          style={{ borderRadius: "10px" }}
                        >
                          + Add the image here
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
