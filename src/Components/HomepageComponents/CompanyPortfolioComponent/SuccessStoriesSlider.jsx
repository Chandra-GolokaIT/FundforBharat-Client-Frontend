import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const SuccessStoriesSlider = () => {
  const stories = [
    {
      img: "https://kettocdn.gumlet.io/media/banner/0/95/image/bc5ae443b8da492ff0c97082e2981ada078e385d.jpg?w=auto&dpr=1.3",

      description:
        "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
    },
    {
      img: "https://kettocdn.gumlet.io/media/banner/0/94/image/26fe5c8a80fe779e091bd15f4de3c80224ca7c5b.jpg?w=auto&dpr=1.3",

      description:
        "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
    },
    {
      img: "https://kettocdn.gumlet.io/media/banner/0/79/image/d0ab9b0b9bcc30ced6574c54d6b216ab895f90d5.jpg?w=auto&dpr=1.3",

      description:
        "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
    },
    {
      img: "https://kettocdn.gumlet.io/media/banner/0/97/image/50e08ce31ef3bfa184cadd9ec164b8ecee8bb0f0.jpg?w=auto&dpr=1.3",

      description:
        "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
    },
    {
      img: "https://kettocdn.gumlet.io/media/banner/0/96/image/0717875196afb641172a631c282e1875d76b8930.jpg?w=auto&dpr=1.3",

      description:
        "I express my heartfelt gratitude towards you all for saving my son, Vedant's life! He was suffering from CLD Budd Chiari Syndrome, and a liver transplant was his only hope at survival, but we couldn't afford it. We would've lost him had it not been for your generosity and prayers. Thank you for lighting up our lives. He is doing better than ever post his liver transplant.",
    },
  ];

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={2000}
      autoPlay={true}
      centerMode={false}
      className="success-story-slider"
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 0,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {stories.map((story, index) => (
        <div className="card" key={index} style={{ margin: "0 5px" }}>
          <div className="d-flex flex-column-reverse">
            <img src={story.img} alt={story.title} />
            <div className="card-body">
              <FaQuoteLeft
                size={25}
                style={{ float: "left", color: "grey", marginRight: "30px" }}
              />
              <p>{story.description}</p>
              <FaQuoteRight
                size={25}
                style={{ float: "right", color: "grey" }}
              />
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default SuccessStoriesSlider;
