import { api } from "api";
import { ALERT } from "redux/types/alertTypes";
import { ARTICLE_TYPES } from "redux/types/articleTypes";
import { imageUpload } from "utils/imageUpload";

export const addArticle = (data, files, navigate) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    let media = [];

    if (files) media = await imageUpload(files);

    const res = await api.post("/api/article", { ...data, images: media });

    if (res.data) {
      dispatch({ type: ARTICLE_TYPES.ADD_ARTICLE, payload: res.data });
      navigate("/");
    }

    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { loading: false } });
  }
};

export const getArticles = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await api.get("/api/home/articles");

    if (res.data) {
      dispatch({
        type: ARTICLE_TYPES.GET_ARTICLES,
        payload: res.data.articles,
      });
    }

    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { loading: false } });
  }
};

// напишем action для получение одной статьи

export const getArticle = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await api.get(`/api/article/${id}`);

    if (res.data) {
      dispatch({ type: ARTICLE_TYPES.GET_ARTICLE, payload: res.data });
    }

    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {}
};

export const likeArticle =
  ({ auth, post }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: ALERT, payload: { loading: true } });

      const newPost = { ...post, likes: [...post.likes, auth.user._id] };

      dispatch({ type: ARTICLE_TYPES.UPDATE_ARTICLE, payload: newPost });

      const res = await api.patch(`/api/article/${post._id}/like`, {
        headers: {
          Authorization: auth.token,
        },
      });

      console.log(res);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

export const unLikeArticle =
  ({ auth, post }) =>
  async (dispatch) => {
    console.log(post);

    try {
      const newPost = {
        ...post,
        likes: post.likes.filter((item) => item !== auth.user._id),
      };

      dispatch({ type: ARTICLE_TYPES.UPDATE_ARTICLE, payload: newPost });
      const res = await api.patch(`/api/article/${post._id}/unlike`, {
        headers: {
          Authorization: auth.token,
        },
      });

      console.log(res);
    } catch (err) {}
  };
