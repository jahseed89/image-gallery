import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({

  galleryCard: {
    width: "300px",
    height: "200px",
  },
  tag: {
    color: theme.color.grey,
    fontSize: theme.fonts.middleFont,
    padding: '5px'
  },
}));

const ImageCard = ({
  url,
  tag,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragEnd,
  ref,
  className
}) => {
  const classes = useStyles();

  return (
    <div
      className={className}
      draggable
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      ref={ref}
    >
      <img src={url} alt={tag} className={classes.galleryCard} />
      <br />
      <span className={classes.tag}>{tag}</span>
    </div>
  );
};

export default ImageCard;
