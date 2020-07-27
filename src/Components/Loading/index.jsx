import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Ball = styled(motion.span)`
  display: block;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 10px;
`;

const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.3,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingBallVariants = {
  start: {
    y: "50%"
  },
  end: {
    y: "150%"
  },
};

const loadingBallTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

const Loading = () => {
  return (
    <>
      <LoadingContainer
        initial="start"
        animate="end"
        variants={loadingContainerVariants}
      >
        <Ball
          custom={1}
          variants={loadingBallVariants}
          transition={loadingBallTransition}
        />
        <Ball
          custom={2}
          variants={loadingBallVariants}
          transition={loadingBallTransition}
        />
        <Ball
          custom={3}
          variants={loadingBallVariants}
          transition={loadingBallTransition}
        />
      </LoadingContainer>
    </>
  );
};

export default Loading;
