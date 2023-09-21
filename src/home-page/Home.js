import React, { useRef, useState } from "react";
import { gallery } from "../component/gallery/Gallery";
import ImageCard from "../component/image-card/ImageCard";
import "./home.css";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  cardWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: theme.fonts.larg,
    textAlign: "center",
    marginTop: '2rem'
  },
  inputField: {
    padding: "1rem .5rem ",
    borderRadius: "15px",
    width: "20%",
    backgroundColor: theme.color.lighter,
    border: 'none',
  },
  homeContainer: {
    width: "90%",
    margin: "1rem auto",
  },
  imgContainer: {
    border: "2px solid grey",
    margin: "1rem 0",
  },
  button: {
    background: '#0a0a23',
    color: '#fff',
    boxShadow: '0px 0px 2px 2px rgb(0,0,0)',
    padding: '.8ren .5rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    width: '20%',
    "&:hover": {
        backgroundColor: 'transparent',
        border: '2px solid #000',
        color: '#000'
    }
  },

  "@media (max-width: 1000px)": {
    header:{
        fontSize: theme.fonts.middleFont,
        textAlign: 'start'
    },
    inputWrapper: {
        flexDirection: 'column',
    },
    inputField: {
        marginBottom: '1.5rem',
        padding: '1rem .5rem',
        width: '280px'
    },
    button: {
        width: '300px',
        padding: '1rem .5rem'
    },
    homeContainer: {
        width: '95%',
        margin: '0 auto',
    },
  },
}));

const Home = () => {
  const [gallaryItems, setGalleryItems] = useState(gallery);
  const [searchTheme, setSearchTheme] = useState("");
  const [dragItem, setDragItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [isDragging, setIsDragging] = useState();
  const classes = useStyles();

  const containerRef = useRef(null);

  const handleSearch = (e) => {
    setSearchTheme(e.target.value);
  };

  const handleDragStart = (index) => {
    setDragItem(index);
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (dragItem === null || dragItem === index) {
      return;
    }

    const updatedItems = [...gallaryItems];
    const itemToMove = updatedItems[dragItem];
    updatedItems.splice(dragItem, 1);
    updatedItems.splice(index, 0, itemToMove);

    setGalleryItems(updatedItems);
    setDragItem(null);
    setIsDragging(false);
  };

  const handleDragEnter = (index) => {
    setDragOverItem(index);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDragItem(null);
    setDragOverItem(null);
    setIsDragging(false);
  };

  const filteredItems = gallaryItems.filter((item) =>
    item.tag?.toLowerCase().includes(searchTheme.toLowerCase())
  );

  const reArrange = () => {
    const sortedItems = [...filteredItems].sort((a, b) => a.id - b.id);
    setGalleryItems(sortedItems);
  };


  return (
    <div className={classes.homeContainer}>
      <h1 className={classes.header}>The Best Draggable Image Gallery</h1>
      <div className={classes.inputWrapper}>
        <input
          placeholder="Search by tag name"
          onChange={handleSearch}
          value={searchTheme}
          className={classes.inputField}
        />
        <button onClick={reArrange} className={classes.button}>Re-Arrange</button>
      </div>
      <div className={classes.cardWrapper} ref={containerRef}>
        {filteredItems.map((data, index) => (
          <ImageCard
            key={data.id}
            url={data.url}
            tag={data.tag}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            className={`img-container ${
              isDragging && dragOverItem === index ? "dragging" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;


