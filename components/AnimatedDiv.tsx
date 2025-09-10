'use client';

import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

export default function AnimatedDiv({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}
