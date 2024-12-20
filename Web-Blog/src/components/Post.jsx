import React from 'react';
const baseURL = import.meta.env.VITE_PIC_URL;

const Post = ({ title, author, summary, cover, createdAt, _id }) => {
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <a href={"/post/" + _id} className="href">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
              className="w-full h-64 object-cover"
            />
          </a>
        </figure>
        <div className="p-6 md:1/2 flex flex-col justify-between card-body">
          <a href={"/post/ + _id"} className="href">
            <h2 className="card-title">{title}!</h2>
          </a>
          
          <p>
            {author.username}-{createdAt}
          </p>
          <p>{summary}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;