import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const frameVariants = {
    hover: { scale: 0.95 },
};

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.56] };

const thumbnailVariants = {
    initial: { scale: 0.3, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
        scale: 0.3,
        opacity: 0,
        transition: { ...transition },
    },
};

export const Animate = ({ children }: any) => {
    return (
        <motion.div className="thumbnail" variants={thumbnailVariants}>
            <motion.div variants={frameVariants} transition={transition}>
                {children}
            </motion.div>
        </motion.div>
    );
};
