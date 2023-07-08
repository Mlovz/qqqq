import React, { useState } from "react";
import "./add-post.scss";
import { Button, Heading, Input, Select } from "components";
import { addArticle } from "redux/actions/articleAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [select, setSelect] = useState("");
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeFiles = (e) => {
    const newFiles = [...e.target.files];

    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveImage = (idx) => {
    const newImages = [...files];
    newImages.splice(idx, 1);

    setFiles(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newData = {
      title: data.title,
      content: data.content,
      category: select,
    };

    const { title, content, category } = newData;

    if ((!title && !content && !category) || files.length === 0) return;

    dispatch(addArticle(newData, files, navigate));
  };

  return (
    <div className="add-post">
      <Heading>Добавить пост</Heading>

      <form onSubmit={onSubmit}>
        <div className="add-post_file">
          <label htmlFor="file">
            <input
              type="file"
              multiple
              id="file"
              onChange={handleChangeFiles}
              hidden
            />

            <div>
              <div></div>
              <span className="fs-14">Выберите файл(ы)</span>
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="file_images">
            {files.map((file, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(file)} alt="photos" />
                <span onClick={() => handleRemoveImage(index)}>&times;</span>
              </div>
            ))}
          </div>
        )}

        <Input
          name="title"
          value={data.title}
          placeholder="Введите название поста"
          required
          onChange={handleChange}
        />

        <Select required select={select} setSelect={setSelect} />

        <Input
          name="content"
          value={data.content}
          placeholder="Введите описание поста"
          textarea
          required
          onChange={handleChange}
        />

        <Button fullWidth type="submit">
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
